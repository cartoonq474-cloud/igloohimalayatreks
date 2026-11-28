'use strict';

const { prisma } = require('../db/prisma');

/**
 * Persist an immutable audit entry for CMS actions.
 * Failures are logged rather than breaking the primary user action.
 */
async function recordAuditLog({
  userId = null,
  action,
  entityType,
  entityId = null,
  summary = null,
  diffJson = null,
  req = null
}) {
  try {
    const ipAddress = req
      ? req.ip || (req.headers['x-forwarded-for'] ? String(req.headers['x-forwarded-for']).split(',')[0].trim() : null)
      : null;
    const userAgent = req && req.headers['user-agent']
      ? String(req.headers['user-agent']).slice(0, 255)
      : null;

    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entityType,
        entityId: entityId !== null && entityId !== undefined ? String(entityId) : null,
        summary,
        diffJson: diffJson || undefined,
        ipAddress,
        userAgent
      }
    });
  } catch (err) {
    console.error('[AuditLog] Failed to record entry:', err.message);
  }
}

module.exports = {
  recordAuditLog
};
