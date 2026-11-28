'use strict';

const express = require('express');
const { z } = require('zod');

const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');
const {
  publishBlogPostToStatic,
  publishPackageToStatic,
  rebuildSitemapXml,
  syncRedirectsFile
} = require('../services/publishService');
const { invalidateRedirectCache } = require('../middleware/redirectMiddleware');

const router = express.Router();
router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

function wrapPublishFsError(err) {
  if (err && (err.code === 'EROFS' || err.code === 'EACCES' || err.code === 'EPERM')) {
    return new AppError(
      409,
      'READ_ONLY_FS',
      'Database changes are saved, but static HTML files cannot be written in a read-only serverless environment. Run "npm run cms:start" locally to sync & commit static HTML.'
    );
  }
  return err;
}

router.post(
  '/package/:id',
  requireCsrf,
  requirePermission('packages:publish'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    try {
      const result = await publishPackageToStatic(req.params.id);
      await recordAuditLog({
        userId: req.currentUser.id,
        action: 'PUBLISH_HTML',
        entityType: 'Package',
        entityId: req.params.id,
        summary: `Published static HTML to ${result.route}`,
        req
      });
      return sendSuccess(res, result);
    } catch (err) {
      return next(wrapPublishFsError(err));
    }
  })
);

router.post(
  '/blog/:id',
  requireCsrf,
  requirePermission('blogs:publish'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    try {
      const result = await publishBlogPostToStatic(req.params.id);
      await recordAuditLog({
        userId: req.currentUser.id,
        action: 'PUBLISH_HTML',
        entityType: 'BlogPost',
        entityId: req.params.id,
        summary: `Published blog HTML to ${result.route}`,
        req
      });
      return sendSuccess(res, result);
    } catch (err) {
      return next(wrapPublishFsError(err));
    }
  })
);

router.post(
  '/sitemap',
  requireCsrf,
  requirePermission('seo:publish'),
  asyncHandler(async (req, res, next) => {
    try {
      const result = await rebuildSitemapXml();
      await recordAuditLog({
        userId: req.currentUser.id,
        action: 'PUBLISH_SITEMAP',
        entityType: 'SeoMeta',
        summary: `Rebuilt sitemap.xml (${result.count} URLs)`,
        req
      });
      return sendSuccess(res, result);
    } catch (err) {
      return next(wrapPublishFsError(err));
    }
  })
);

router.post(
  '/redirects',
  requireCsrf,
  requirePermission('seo:publish'),
  asyncHandler(async (req, res, next) => {
    try {
      const result = await syncRedirectsFile();
      invalidateRedirectCache();
      await recordAuditLog({
        userId: req.currentUser.id,
        action: 'SYNC_REDIRECTS',
        entityType: 'RedirectRule',
        summary: `Synced _redirects (${result.count} rules)`,
        req
      });
      return sendSuccess(res, result);
    } catch (err) {
      return next(wrapPublishFsError(err));
    }
  })
);

module.exports = router;
