'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');

const router = express.Router();

router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const createUserSchema = z.object({
  email: z.string().trim().email().max(255),
  fullName: z.string().trim().min(2).max(150),
  title: z.string().trim().max(120).optional().nullable(),
  phone: z.string().trim().max(50).optional().nullable(),
  password: z.string().min(10).max(200),
  roleId: z.number().int().positive(),
  isActive: z.boolean().optional().default(true)
});

const updateUserSchema = z.object({
  fullName: z.string().trim().min(2).max(150).optional(),
  title: z.string().trim().max(120).optional().nullable(),
  phone: z.string().trim().max(50).optional().nullable(),
  roleId: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(10).max(200).optional()
});

const updateRolePermissionsSchema = z.object({
  permissionKeys: z.array(z.string().min(1).max(100))
});

// List users
router.get(
  '/users',
  requirePermission('users:read'),
  asyncHandler(async (_req, res) => {
    const users = await prisma.user.findMany({
      orderBy: [{ createdAt: 'asc' }],
      select: {
        id: true,
        email: true,
        fullName: true,
        title: true,
        phone: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        role: {
          select: { id: true, name: true, displayName: true }
        }
      }
    });
    return sendSuccess(res, { users });
  })
);

// Create user
router.post(
  '/users',
  requireCsrf,
  requirePermission('users:write'),
  validate({ body: createUserSchema }),
  asyncHandler(async (req, res, next) => {
    const { email, fullName, title, phone, password, roleId, isActive } = req.body;
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      return next(new AppError(400, 'INVALID_ROLE', 'Selected role does not exist.'));
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const created = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        fullName,
        title: title || null,
        phone: phone || null,
        passwordHash,
        roleId,
        isActive
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        title: true,
        phone: true,
        isActive: true,
        role: { select: { id: true, name: true, displayName: true } }
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'User',
      entityId: created.id,
      summary: `Created staff account ${created.email} (${role.name})`,
      req
    });

    return sendSuccess(res, { user: created }, 201);
  })
);

// Update user
router.patch(
  '/users/:id',
  requireCsrf,
  requirePermission('users:write'),
  validate({ params: idParamSchema, body: updateUserSchema }),
  asyncHandler(async (req, res, next) => {
    const targetId = req.params.id;
    if (targetId === req.currentUser.id && req.body.isActive === false) {
      return next(new AppError(400, 'SELF_DEACTIVATION_FORBIDDEN', 'You cannot deactivate your own active account.'));
    }

    const existing = await prisma.user.findUnique({ where: { id: targetId } });
    if (!existing) {
      return next(new AppError(404, 'USER_NOT_FOUND', 'User not found.'));
    }

    const updateData = {};
    if (req.body.fullName !== undefined) updateData.fullName = req.body.fullName;
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
    if (req.body.roleId !== undefined) {
      const role = await prisma.role.findUnique({ where: { id: req.body.roleId } });
      if (!role) return next(new AppError(400, 'INVALID_ROLE', 'Selected role does not exist.'));
      updateData.roleId = req.body.roleId;
    }
    if (req.body.password) {
      updateData.passwordHash = await bcrypt.hash(req.body.password, 12);
    }

    const updated = await prisma.user.update({
      where: { id: targetId },
      data: updateData,
      select: {
        id: true,
        email: true,
        fullName: true,
        title: true,
        phone: true,
        isActive: true,
        role: { select: { id: true, name: true, displayName: true } }
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'User',
      entityId: targetId,
      summary: `Updated staff account ${updated.email}`,
      req
    });

    return sendSuccess(res, { user: updated });
  })
);

// List roles & permissions
router.get(
  '/roles',
  requirePermission('users:read'),
  asyncHandler(async (_req, res) => {
    const [roles, permissions] = await Promise.all([
      prisma.role.findMany({
        orderBy: { id: 'asc' },
        include: {
          _count: { select: { users: true } },
          permissions: {
            include: { permission: true }
          }
        }
      }),
      prisma.permission.findMany({
        orderBy: [{ module: 'asc' }, { key: 'asc' }]
      })
    ]);

    return sendSuccess(res, {
      roles: roles.map((r) => ({
        id: r.id,
        name: r.name,
        displayName: r.displayName,
        description: r.description,
        isSystem: r.isSystem,
        userCount: r._count.users,
        permissionKeys: r.permissions.map((p) => p.permission.key)
      })),
      permissions
    });
  })
);

// Update role permission matrix
router.patch(
  '/roles/:id/permissions',
  requireCsrf,
  requirePermission('users:manage_roles'),
  validate({ params: idParamSchema, body: updateRolePermissionsSchema }),
  asyncHandler(async (req, res, next) => {
    const roleId = req.params.id;
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      return next(new AppError(404, 'ROLE_NOT_FOUND', 'Role not found.'));
    }
    if (role.name === 'SUPER_ADMIN') {
      return next(new AppError(400, 'SYSTEM_ROLE_LOCKED', 'SUPER_ADMIN permissions cannot be restricted.'));
    }

    const perms = await prisma.permission.findMany({
      where: { key: { in: req.body.permissionKeys } }
    });

    await prisma.$transaction([
      prisma.rolePermission.deleteMany({ where: { roleId } }),
      prisma.rolePermission.createMany({
        data: perms.map((p) => ({ roleId, permissionId: p.id })),
        skipDuplicates: true
      })
    ]);

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE_PERMISSIONS',
      entityType: 'Role',
      entityId: roleId,
      summary: `Updated permissions for role ${role.name}`,
      diffJson: { permissionKeys: perms.map((p) => p.key) },
      req
    });

    return sendSuccess(res, {
      roleId,
      permissionKeys: perms.map((p) => p.key)
    });
  })
);

// Audit logs
router.get(
  '/audit-logs',
  requirePermission('audit:read'),
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit || '50', 10) || 50, 200);
    const logs = await prisma.auditLog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, fullName: true, email: true }
        }
      }
    });
    return sendSuccess(res, { logs });
  })
);

module.exports = router;
