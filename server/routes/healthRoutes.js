'use strict';

const express = require('express');
const { prisma } = require('../db/prisma');
const { asyncHandler, sendSuccess, sendError } = require('../utils/http');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return sendSuccess(res, {
        status: 'ok',
        service: 'igloo-himalaya-treks-cms',
        database: 'connected',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      return sendError(res, 503, 'DATABASE_UNAVAILABLE', 'Database health check failed.', {
        reason: err.message
      });
    }
  })
);

module.exports = router;
