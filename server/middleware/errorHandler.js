'use strict';

const { AppError, sendError } = require('../utils/http');
const env = require('../config/env');

function notFoundHandler(req, res, next) {
  if (req.path.startsWith('/api/')) {
    return sendError(res, 404, 'NOT_FOUND', `API endpoint not found: ${req.method} ${req.originalUrl}`);
  }
  return next();
}

function errorHandler(err, req, res, _next) {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.code, err.message, err.details);
  }

  // Prisma known request errors
  if (err && err.code === 'P2002') {
    const target = err.meta && err.meta.target ? err.meta.target : undefined;
    return sendError(res, 409, 'CONFLICT', 'A record with that unique value already exists.', { target });
  }
  if (err && err.code === 'P2025') {
    return sendError(res, 404, 'NOT_FOUND', 'Requested record was not found.');
  }

  if (err && err.type === 'entity.parse.failed') {
    return sendError(res, 400, 'INVALID_JSON', 'Malformed JSON request body.');
  }

  if (!env.isTest) {
    console.error('[ServerError]', err);
  }

  return sendError(
    res,
    500,
    'INTERNAL_SERVER_ERROR',
    env.isProd ? 'An unexpected server error occurred.' : (err.message || 'Internal Server Error')
  );
}

module.exports = {
  notFoundHandler,
  errorHandler
};
