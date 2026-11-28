'use strict';

if (!process.env.VERCEL) {
  require('dotenv').config({ override: true });
}

function parseOrigins(raw) {
  const defaults = [
    'http://localhost:3000',
    'http://localhost:4000',
    'https://www.igloohimalayatreks.com',
    'https://igloohimalayatreks.com'
  ];
  if (process.env.VERCEL_URL) defaults.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_BRANCH_URL) defaults.push(`https://${process.env.VERCEL_BRANCH_URL}`);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    defaults.push(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (!raw) {
    return Array.from(new Set(defaults));
  }
  const configured = raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return Array.from(new Set([...defaults, ...configured]));
}

const NODE_ENV = process.env.NODE_ENV || 'development';
const isVercel = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_URL);
const isProd = NODE_ENV === 'production';

const sessionSecret = process.env.SESSION_SECRET || (isProd ? '' : 'dev-insecure-session-secret-change-in-env-32chars');
let configError = null;
if (isProd && (!sessionSecret || sessionSecret.length < 32)) {
  const msg = 'SESSION_SECRET must be set to at least 32 characters in production.';
  if (isVercel) {
    configError = msg;
  } else {
    throw new Error(msg);
  }
}

module.exports = {
  nodeEnv: NODE_ENV,
  isProd,
  isVercel,
  isTest: NODE_ENV === 'test',
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  sessionSecret,
  configError,
  sessionMaxAgeMs: parseInt(process.env.SESSION_MAX_AGE_MS || String(7 * 24 * 60 * 60 * 1000), 10),
  cookieSecure: process.env.COOKIE_SECURE === 'true' || isProd,
  corsOrigins: parseOrigins(process.env.CORS_ORIGINS)
};
