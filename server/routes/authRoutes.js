'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const env = require('../config/env');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { ensureCsrfToken, requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.isTest ? 100 : 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many login attempts. Please wait 15 minutes and try again.'
    }
  }
});

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(200)
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6).max(200),
  newPassword: z
    .string()
    .min(10, 'New password must be at least 10 characters.')
    .max(200)
    .regex(/[A-Z]/, 'New password must contain an uppercase letter.')
    .regex(/[a-z]/, 'New password must contain a lowercase letter.')
    .regex(/[0-9]/, 'New password must contain a number.')
});

router.post(
  '/login',
  loginLimiter,
  validate({ body: loginSchema }),
  asyncHandler(async (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true }
            }
          }
        }
      }
    });

    if (!user) {
      return next(new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.'));
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      await recordAuditLog({
        userId: user.id,
        action: 'LOGIN_FAILED',
        entityType: 'User',
        entityId: user.id,
        summary: `Failed login attempt for ${email}`,
        req
      });
      return next(new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.'));
    }

    if (!user.isActive) {
      return next(new AppError(403, 'ACCOUNT_DISABLED', 'Your account has been deactivated. Contact an administrator.'));
    }

    // Regenerate session ID to prevent session fixation
    await new Promise((resolve, reject) => {
      req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });

    req.session.userId = user.id;
    const csrfToken = ensureCsrfToken(req);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    await recordAuditLog({
      userId: user.id,
      action: 'LOGIN_SUCCESS',
      entityType: 'User',
      entityId: user.id,
      summary: `User ${user.email} signed in`,
      req
    });

    const permissions = (user.role.permissions || []).map((rp) => rp.permission.key);

    return sendSuccess(res, {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        title: user.title,
        role: {
          id: user.role.id,
          name: user.role.name,
          displayName: user.role.displayName
        },
        permissions
      },
      csrfToken
    });
  })
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const csrfToken = ensureCsrfToken(req);
    return sendSuccess(res, {
      user: {
        id: req.currentUser.id,
        email: req.currentUser.email,
        fullName: req.currentUser.fullName,
        title: req.currentUser.title,
        phone: req.currentUser.phone,
        lastLoginAt: req.currentUser.lastLoginAt,
        role: req.currentUser.role,
        permissions: req.currentUser.permissions
      },
      csrfToken
    });
  })
);

router.post(
  '/logout',
  requireAuth,
  requireCsrf,
  asyncHandler(async (req, res) => {
    const userId = req.currentUser.id;
    const email = req.currentUser.email;

    await new Promise((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });

    res.clearCookie('iht_cms_sid');

    await recordAuditLog({
      userId,
      action: 'LOGOUT',
      entityType: 'User',
      entityId: userId,
      summary: `User ${email} signed out`,
      req
    });

    return sendSuccess(res, { loggedOut: true });
  })
);

router.post(
  '/change-password',
  requireAuth,
  requireCsrf,
  validate({ body: changePasswordSchema }),
  asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.currentUser.id } });
    if (!user) {
      return next(new AppError(404, 'USER_NOT_FOUND', 'User account not found.'));
    }

    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) {
      return next(new AppError(400, 'INVALID_PASSWORD', 'Current password is incorrect.'));
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash }
    });

    await recordAuditLog({
      userId: user.id,
      action: 'PASSWORD_CHANGED',
      entityType: 'User',
      entityId: user.id,
      summary: `Password changed by ${user.email}`,
      req
    });

    return sendSuccess(res, { passwordUpdated: true });
  })
);

module.exports = router;
