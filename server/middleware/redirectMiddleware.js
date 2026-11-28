'use strict';

const { prisma } = require('../db/prisma');

let cachedRedirects = null;
let cacheExpiresAt = 0;

function invalidateRedirectCache() {
  cachedRedirects = null;
  cacheExpiresAt = 0;
}

async function loadRedirectMap() {
  const now = Date.now();
  if (cachedRedirects && now < cacheExpiresAt) {
    return cachedRedirects;
  }

  try {
    const rules = await prisma.redirectRule.findMany({
      where: { isActive: true },
      select: { fromPath: true, toPath: true, statusCode: true }
    });
    const map = new Map();
    for (const r of rules) {
      map.set(r.fromPath, { toPath: r.toPath, statusCode: r.statusCode || 301 });
    }
    cachedRedirects = map;
    cacheExpiresAt = now + 60 * 1000;
    return map;
  } catch (_err) {
    return new Map();
  }
}

async function redirectMiddleware(req, res, next) {
  if (req.path.startsWith('/api/') || req.path.startsWith('/admin')) {
    return next();
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }

  const map = await loadRedirectMap();
  const match = map.get(req.path) || map.get(req.path.replace(/\/$/, ''));
  if (match) {
    return res.redirect(match.statusCode, match.toPath);
  }
  return next();
}

module.exports = {
  redirectMiddleware,
  invalidateRedirectCache
};
