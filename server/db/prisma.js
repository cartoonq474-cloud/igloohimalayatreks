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

function buildPoolConfig(rawUrl) {
  let isLocal = true;
  let cleanedUrl = rawUrl;
  try {
    const parsed = new URL(rawUrl);
    isLocal = ['localhost', '127.0.0.1', '::1'].includes(parsed.hostname.toLowerCase());
    if (!isLocal && parsed.searchParams.has('sslmode') && !parsed.searchParams.has('uselibpqcompat')) {
      parsed.searchParams.set('uselibpqcompat', 'true');
      cleanedUrl = parsed.toString();
    }
  } catch (_err) {
    isLocal = true;
  }
  return {
    connectionString: cleanedUrl,
    ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } })
  };
}

const pgPool =
  globalForDb.__iglooPgPool ||
  new Pool(buildPoolConfig(env.databaseUrl));

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
