'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const connectPgSimple = require('connect-pg-simple');
const helmet = require('helmet');
const cors = require('cors');

const env = require('./config/env');
const { pgPool } = require('./db/prisma');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const { redirectMiddleware } = require('./middleware/redirectMiddleware');
const { sendPublicHtmlFile } = require('./services/liveHtmlService');

const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const adminUsersRoutes = require('./routes/adminUsersRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
const adminInquiriesRoutes = require('./routes/adminInquiriesRoutes');
const adminMediaRoutes = require('./routes/adminMediaRoutes');
const adminSettingsRoutes = require('./routes/adminSettingsRoutes');
const adminPackagesRoutes = require('./routes/adminPackagesRoutes');
const adminDestinationsRoutes = require('./routes/adminDestinationsRoutes');
const adminBlogsRoutes = require('./routes/adminBlogsRoutes');
const adminPagesRoutes = require('./routes/adminPagesRoutes');
const adminReviewsRoutes = require('./routes/adminReviewsRoutes');
const adminSeoRoutes = require('./routes/adminSeoRoutes');
const adminPublishRoutes = require('./routes/adminPublishRoutes');
const publicInquiryRoutes = require('./routes/publicInquiryRoutes');
const publicSettingsRoutes = require('./routes/publicSettingsRoutes');
const publicCatalogRoutes = require('./routes/publicCatalogRoutes');

const ROOT_DIR = path.resolve(__dirname, '..');
const ADMIN_DIR = path.join(ROOT_DIR, 'admin');

function createApp() {
  const app = express();

  if (env.isProd || env.isVercel) {
    app.set('trust proxy', 1);
  }

  // Security headers (disable HTTPS-only HSTS and upgrade-insecure-requests in local HTTP dev)
  app.use(
    helmet({
      hsts: env.isProd,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://www.igloohimalayatreks.com'],
          connectSrc: env.isProd
            ? ["'self'", 'https://api.cloudinary.com']
            : ["'self'", 'http://localhost:*', 'http://127.0.0.1:*', 'https://api.cloudinary.com'],
          frameAncestors: ["'none'"],
          upgradeInsecureRequests: env.isProd ? [] : null
        }
      }
    })
  );

  // Strict CORS allowlist
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (env.corsOrigins.includes(origin)) return callback(null, true);
        return callback(null, false);
      },
      credentials: true
    })
  );

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: false, limit: '15mb' }));

  // PostgreSQL-backed session store
  const PgStore = connectPgSimple(session);
  app.use(
    session({
      name: 'iht_cms_sid',
      store: new PgStore({
        pool: pgPool,
        tableName: 'session',
        createTableIfMissing: env.isVercel || env.isProd
      }),
      secret: env.sessionSecret,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: env.cookieSecure,
        sameSite: 'lax',
        maxAge: env.sessionMaxAgeMs
      }
    })
  );

  // REST API v1
  app.use('/api/v1/health', healthRoutes);
  app.use('/api/v1/public/inquiries', publicInquiryRoutes);
  app.use('/api/v1/public/settings', publicSettingsRoutes);
  app.use('/api/v1/public', publicCatalogRoutes);
  app.use('/api/v1/admin/auth', authRoutes);
  app.use('/api/v1/admin/dashboard', adminDashboardRoutes);
  app.use('/api/v1/admin/inquiries', adminInquiriesRoutes);
  app.use('/api/v1/admin/media', adminMediaRoutes);
  app.use('/api/v1/admin/settings', adminSettingsRoutes);
  app.use('/api/v1/admin/packages', adminPackagesRoutes);
  app.use('/api/v1/admin/destinations', adminDestinationsRoutes);
  app.use('/api/v1/admin/blogs', adminBlogsRoutes);
  app.use('/api/v1/admin/pages', adminPagesRoutes);
  app.use('/api/v1/admin/reviews', adminReviewsRoutes);
  app.use('/api/v1/admin/seo', adminSeoRoutes);
  app.use('/api/v1/admin/publish', adminPublishRoutes);
  app.use('/api/v1/admin', adminUsersRoutes);

  // Serve Admin Dashboard static UI
  app.use('/admin', express.static(ADMIN_DIR, { index: 'index.html' }));
  app.get('/admin/{*splat}', (_req, res) => {
    res.sendFile(path.join(ADMIN_DIR, 'index.html'));
  });

  // Dynamic 301/302 redirects managed in PostgreSQL
  app.use(redirectMiddleware);

  // Serve Public Static Site (with cleanUrls parity to vercel.json + live CMS settings)
  app.use(async (req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/admin')) {
      return next();
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    try {
      const decodedPath = decodeURI(req.path);
      const normalized = path.normalize(path.join(ROOT_DIR, decodedPath));
      if (!normalized.startsWith(ROOT_DIR)) {
        return res.status(403).send('Forbidden');
      }

      // Never expose internal backend/config folders as public static assets
      const rel = path.relative(ROOT_DIR, normalized).replace(/\\/g, '/');
      if (
        rel.startsWith('server/') ||
        rel.startsWith('prisma/') ||
        rel.startsWith('.env') ||
        rel === 'server' ||
        rel === 'prisma'
      ) {
        return res.status(404).send('Not Found');
      }

      if (fs.existsSync(normalized) && fs.statSync(normalized).isFile()) {
        if (normalized.endsWith('.html')) {
          return await sendPublicHtmlFile(res, normalized);
        }
        return res.sendFile(normalized);
      }

      if (fs.existsSync(normalized) && fs.statSync(normalized).isDirectory()) {
        const idx = path.join(normalized, 'index.html');
        if (fs.existsSync(idx)) return await sendPublicHtmlFile(res, idx);
      }

      const cleanHtml = normalized.replace(/[/\\]+$/, '') + '.html';
      if (fs.existsSync(cleanHtml) && fs.statSync(cleanHtml).isFile()) {
        return await sendPublicHtmlFile(res, cleanHtml);
      }

      return next();
    } catch (err) {
      return next(err);
    }
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp
};
