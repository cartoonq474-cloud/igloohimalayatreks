'use strict';

const { AppError } = require('../utils/http');

function validate({ body, query, params } = {}) {
  return (req, res, next) => {
    try {
      if (params) {
        const parsedParams = params.safeParse(req.params);
        if (!parsedParams.success) {
          return next(new AppError(400, 'VALIDATION_ERROR', 'Invalid route parameters.', parsedParams.error.flatten()));
        }
        req.params = parsedParams.data;
      }
      if (query) {
        const parsedQuery = query.safeParse(req.query);
        if (!parsedQuery.success) {
          return next(new AppError(400, 'VALIDATION_ERROR', 'Invalid query parameters.', parsedQuery.error.flatten()));
        }
        // Express 5 defines req.query as a getter; redefine cleanly so parsed defaults apply
        Object.defineProperty(req, 'query', {
          value: parsedQuery.data,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
      if (body) {
        const parsedBody = body.safeParse(req.body);
        if (!parsedBody.success) {
          return next(new AppError(400, 'VALIDATION_ERROR', 'Invalid request payload.', parsedBody.error.flatten()));
        }
        req.body = parsedBody.data;
      }
      return next();
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = {
  validate
};
