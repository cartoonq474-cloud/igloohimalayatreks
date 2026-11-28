'use strict';

class AppError extends Error {
  constructor(statusCode, code, message, details = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function sendSuccess(res, data, statusCode = 200, meta = undefined) {
  const payload = { success: true, data };
  if (meta !== undefined) {
    payload.meta = meta;
  }
  return res.status(statusCode).json(payload);
}

function sendError(res, statusCode, code, message, details = undefined) {
  const error = { code, message };
  if (details !== undefined) {
    error.details = details;
  }
  return res.status(statusCode).json({ success: false, error });
}

module.exports = {
  AppError,
  asyncHandler,
  sendSuccess,
  sendError
};
