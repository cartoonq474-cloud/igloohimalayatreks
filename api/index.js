'use strict';

const env = require('../server/config/env');
const { createApp } = require('../server/app');

let cachedApp = null;

function isLoopbackDatabaseUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return ['localhost', '127.0.0.1', '::1'].includes(parsed.hostname.toLowerCase());
  } catch (_err) {
    return false;
  }
}

function getVercelConfigError() {
  if (!env.databaseUrl) {
    return {
      code: 'DATABASE_NOT_CONFIGURED',
      message:
        'Live PostgreSQL database is not configured. Set a hosted DATABASE_URL (e.g. Neon or Supabase Postgres) and SESSION_SECRET in Vercel Project Settings -> Environment Variables.'
    };
  }
  if (env.isVercel && isLoopbackDatabaseUrl(env.databaseUrl)) {
    return {
      code: 'DATABASE_LOCALHOST_UNREACHABLE',
      message:
        'DATABASE_URL points to localhost, which is unreachable from Vercel Serverless. Configure a cloud PostgreSQL DATABASE_URL in Vercel Environment Variables.'
    };
  }
  if (env.configError) {
    return {
      code: 'CONFIG_ERROR',
      message: env.configError
    };
  }
  return null;
}

function getApp() {
  if (!cachedApp) {
    cachedApp = createApp();
  }
  return cachedApp;
}

module.exports = function vercelHandler(req, res) {
  const cfgError = getVercelConfigError();
  if (cfgError) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        success: false,
        error: cfgError
      })
    );
    return;
  }

  return getApp()(req, res);
};
