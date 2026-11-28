'use strict';

const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const env = require('../config/env');

const globalForDb = global;

const prisma =
  globalForDb.__iglooPrisma ||
  new PrismaClient({
    log: env.nodeEnv === 'development' ? ['warn', 'error'] : ['error']
  });

const pgPool =
  globalForDb.__iglooPgPool ||
  new Pool({
    connectionString: env.databaseUrl
  });

if (!globalForDb.__iglooPgPoolErrorBound) {
  pgPool.on('error', (err) => {
    console.error('[PgPoolError]', err.message);
  });
  globalForDb.__iglooPgPoolErrorBound = true;
}

if (!env.isProd) {
  globalForDb.__iglooPrisma = prisma;
  globalForDb.__iglooPgPool = pgPool;
}

module.exports = {
  prisma,
  pgPool
};
