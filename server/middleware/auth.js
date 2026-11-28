'use strict';

const { prisma } = require('../db/prisma');
const { AppError } = require('../utils/http');

/**
 * Loads the authenticated user, role, and permission keys from PostgreSQL
 * on each request so role updates or account deactivation take effect immediately.
 */
async function requireAuth(req, res, next) {
  try {
    const userId = req.session && req.session.userId;
    if (!userId) {
      return next(new AppError(401, 'UNAUTHORIZED', 'Authentication required. Please sign in.'));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        title: true,
        phone: true,
        isActive: true,
        lastLoginAt: true,
        role: {
          select: {
            id: true,
            name: true,
            displayName: true,
            permissions: {
              select: {
                permission: {
                  select: { key: true }
                }
              }
            }
          }
        }
      }
    });

    if (!user || !user.isActive) {
      if (req.session) {
        req.session.destroy(() => {});
      }
      return next(new AppError(401, 'ACCOUNT_INACTIVE', 'Session expired or account deactivated.'));
    }

    const permissionSet = new Set(
      (user.role && user.role.permissions ? user.role.permissions : []).map((rp) => rp.permission.key)
    );

    req.currentUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      title: user.title,
      phone: user.phone,
      lastLoginAt: user.lastLoginAt,
      role: {
        id: user.role.id,
        name: user.role.name,
        displayName: user.role.displayName
      },
      permissions: Array.from(permissionSet),
      hasPermission: (key) => permissionSet.has(key)
    };

    return next();
  } catch (err) {
    return next(err);
  }
}

function requirePermission(permissionKey) {
  return (req, res, next) => {
    if (!req.currentUser) {
      return next(new AppError(401, 'UNAUTHORIZED', 'Authentication required.'));
    }
    if (!req.currentUser.hasPermission(permissionKey)) {
      return next(
        new AppError(403, 'FORBIDDEN', `Missing required permission: ${permissionKey}`)
      );
    }
    return next();
  };
}

function requireAnyPermission(permissionKeys) {
  return (req, res, next) => {
    if (!req.currentUser) {
      return next(new AppError(401, 'UNAUTHORIZED', 'Authentication required.'));
    }
    const allowed = permissionKeys.some((key) => req.currentUser.hasPermission(key));
    if (!allowed) {
      return next(
        new AppError(403, 'FORBIDDEN', `Missing one of required permissions: ${permissionKeys.join(', ')}`)
      );
    }
    return next();
  };
}

module.exports = {
  requireAuth,
  requirePermission,
  requireAnyPermission
};
