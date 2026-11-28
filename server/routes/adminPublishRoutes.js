'use strict';

const express = require('express');
const { z } = require('zod');

const { asyncHandler, sendSuccess } = require('../utils/http');
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

router.post(
  '/package/:id',
  requireCsrf,
  requirePermission('packages:publish'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res) => {
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
  })
);

router.post(
  '/blog/:id',
  requireCsrf,
  requirePermission('blogs:publish'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res) => {
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
  })
);

router.post(
  '/sitemap',
  requireCsrf,
  requirePermission('seo:publish'),
  asyncHandler(async (req, res) => {
    const result = await rebuildSitemapXml();
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'PUBLISH_SITEMAP',
      entityType: 'SeoMeta',
      summary: `Rebuilt sitemap.xml (${result.count} URLs)`,
      req
    });
    return sendSuccess(res, result);
  })
);

router.post(
  '/redirects',
  requireCsrf,
  requirePermission('seo:publish'),
  asyncHandler(async (req, res) => {
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
  })
);

module.exports = router;
