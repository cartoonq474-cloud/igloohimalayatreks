'use strict';

require('dotenv').config({ override: true });

function parseOrigins(raw) {
  if (!raw) {
    return ['http://localhost:3000', 'http://localhost:4000'];
  }
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

const sessionSecret = process.env.SESSION_SECRET || (isProd ? '' : 'dev-insecure-session-secret-change-in-env-32chars');
if (isProd && (!sessionSecret || sessionSecret.length < 32)) {
  throw new Error('SESSION_SECRET must be set to at least 32 characters in production.');
}

module.exports = {
  nodeEnv: NODE_ENV,
  isProd,
  isTest: NODE_ENV === 'test',
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  sessionSecret,
  sessionMaxAgeMs: parseInt(process.env.SESSION_MAX_AGE_MS || String(7 * 24 * 60 * 60 * 1000), 10),
  cookieSecure: process.env.COOKIE_SECURE === 'true' || isProd,
  corsOrigins: parseOrigins(process.env.CORS_ORIGINS)
};
