'use strict';

const crypto = require('crypto');
const { AppError } = require('../utils/http');

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function ensureCsrfToken(req) {
  if (!req.session) {
    throw new AppError(500, 'SESSION_UNAVAILABLE', 'Session middleware is not initialized.');
  }
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }
  return req.session.csrfToken;
}

/**
 * Verifies X-CSRF-Token header against the session-bound CSRF token
 * on state-changing requests to authenticated admin routes.
 */
function requireCsrf(req, res, next) {
  if (SAFE_METHODS.has(req.method)) {
    return next();
  }

  const sessionToken = req.session && req.session.csrfToken;
  const headerToken = req.get('x-csrf-token');

  if (!sessionToken || !headerToken) {
    return next(new AppError(403, 'CSRF_INVALID', 'Missing CSRF verification token.'));
  }

  const expectedBuf = Buffer.from(String(sessionToken), 'utf8');
  const providedBuf = Buffer.from(String(headerToken), 'utf8');

  if (expectedBuf.length !== providedBuf.length || !crypto.timingSafeEqual(expectedBuf, providedBuf)) {
    return next(new AppError(403, 'CSRF_INVALID', 'Invalid CSRF verification token.'));
  }

  return next();
}

module.exports = {
  ensureCsrfToken,
  requireCsrf
};
