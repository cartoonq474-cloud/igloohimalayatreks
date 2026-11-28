'use strict';

const express = require('express');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');
const { invalidateRedirectCache } = require('../middleware/redirectMiddleware');
const {
  publishPackageToStatic,
  publishDestinationToStatic,
  publishBlogPostToStatic,
  publishPageToStatic
} = require('../services/publishService');

const router = express.Router();
router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const updateSeoSchema = z.object({
  metaTitle: z.string().trim().min(2).max(255).optional(),
  metaDescription: z.string().trim().max(500).optional().nullable(),
  keywords: z.string().trim().max(500).optional().nullable(),
  canonicalUrl: z.string().trim().max(500).optional().nullable(),
  robotsDirective: z.string().trim().max(64).optional(),
  ogTitle: z.string().trim().max(255).optional().nullable(),
  ogDescription: z.string().trim().max(500).optional().nullable(),
  ogImageMediaId: z.number().int().positive().optional().nullable(),
  twitterCard: z.string().trim().max(64).optional(),
  schemaType: z.string().trim().max(64).optional().nullable(),
  schemaOverrideJson: z.any().optional().nullable()
});

const redirectSchema = z.object({
  fromPath: z.string().trim().min(1).max(500),
  toPath: z.string().trim().min(1).max(500),
  statusCode: z.number().int().refine((v) => v === 301 || v === 302, 'Must be 301 or 302').optional().default(301),
  isActive: z.boolean().optional().default(true),
  note: z.string().trim().max(255).optional().nullable()
});

router.get(
  '/',
  requirePermission('seo:read'),
  asyncHandler(async (req, res) => {
    const entityType = req.query.entityType ? String(req.query.entityType) : undefined;
    const q = req.query.q ? String(req.query.q).trim() : undefined;
    const where = {};
    if (entityType) where.entityType = entityType;
    if (q) {
      where.OR = [
        { metaTitle: { contains: q, mode: 'insensitive' } },
        { canonicalUrl: { contains: q, mode: 'insensitive' } }
      ];
    }

    const records = await prisma.seoMeta.findMany({
      where,
      take: 100,
      orderBy: { updatedAt: 'desc' },
      include: {
        ogImageMedia: { select: { id: true, secureUrl: true } },
        packages: { select: { id: true, slug: true, title: true } },
        destinations: { select: { id: true, slug: true, name: true } },
        blogPosts: { select: { id: true, slug: true, title: true } },
        pages: { select: { id: true, slug: true, title: true } }
      }
    });

    return sendSuccess(res, { records });
  })
);

router.get(
  '/audit',
  requirePermission('seo:read'),
  asyncHandler(async (_req, res) => {
    const allSeo = await prisma.seoMeta.findMany();
    const titleCounts = new Map();
    for (const row of allSeo) {
      const t = (row.metaTitle || '').trim().toLowerCase();
      if (t) titleCounts.set(t, (titleCounts.get(t) || 0) + 1);
    }

    const issues = [];
    for (const row of allSeo) {
      const rowIssues = [];
      if (!row.metaDescription || row.metaDescription.trim().length < 50) {
        rowIssues.push('Missing or short meta description (<50 chars)');
      }
      if (row.metaTitle && row.metaTitle.length > 65) {
        rowIssues.push(`Meta title length ${row.metaTitle.length} chars (>65)`);
      }
      if (!row.canonicalUrl) {
        rowIssues.push('Missing canonical URL');
      }
      if (row.metaTitle && titleCounts.get(row.metaTitle.trim().toLowerCase()) > 1) {
        rowIssues.push('Duplicate meta title');
      }
      if (rowIssues.length > 0) {
        issues.push({
          id: row.id,
          entityType: row.entityType,
          metaTitle: row.metaTitle,
          canonicalUrl: row.canonicalUrl,
          problems: rowIssues
        });
      }
    }

    return sendSuccess(res, {
      totalRecords: allSeo.length,
      issueCount: issues.length,
      issues: issues.slice(0, 100)
    });
  })
);

router.patch(
  '/:id',
  requireCsrf,
  requirePermission('seo:write'),
  validate({ params: idParamSchema, body: updateSeoSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.seoMeta.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'SEO_NOT_FOUND', 'SEO metadata record not found.'));
    }

    const updated = await prisma.seoMeta.update({
      where: { id: existing.id },
      data: req.body,
      include: {
        packages: { select: { id: true, status: true } },
        destinations: { select: { id: true, status: true } },
        blogPosts: { select: { id: true, status: true } },
        pages: { select: { slug: true, status: true } }
      }
    });

    for (const p of updated.packages) {
      if (p.status === 'PUBLISHED') await publishPackageToStatic(p.id).catch(() => {});
    }
    for (const d of updated.destinations) {
      if (d.status === 'PUBLISHED') await publishDestinationToStatic(d.id).catch(() => {});
    }
    for (const b of updated.blogPosts) {
      if (b.status === 'PUBLISHED') await publishBlogPostToStatic(b.id).catch(() => {});
    }
    for (const pg of updated.pages) {
      if (pg.status === 'PUBLISHED') await publishPageToStatic(pg.slug).catch(() => {});
    }

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'SeoMeta',
      entityId: updated.id,
      summary: `Updated SEO metadata #${updated.id} (${updated.entityType})`,
      req
    });

    return sendSuccess(res, { seo: updated });
  })
);

// Redirects
router.get(
  '/redirects',
  requirePermission('seo:read'),
  asyncHandler(async (_req, res) => {
    const redirects = await prisma.redirectRule.findMany({
      orderBy: { id: 'desc' },
      take: 250
    });
    return sendSuccess(res, { redirects });
  })
);

router.post(
  '/redirects',
  requireCsrf,
  requirePermission('seo:write'),
  validate({ body: redirectSchema }),
  asyncHandler(async (req, res) => {
    const rule = await prisma.redirectRule.create({ data: req.body });
    invalidateRedirectCache();
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'RedirectRule',
      entityId: rule.id,
      summary: `Added ${rule.statusCode} redirect ${rule.fromPath} -> ${rule.toPath}`,
      req
    });
    return sendSuccess(res, { redirect: rule }, 201);
  })
);

router.delete(
  '/redirects/:id',
  requireCsrf,
  requirePermission('seo:write'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.redirectRule.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'REDIRECT_NOT_FOUND', 'Redirect rule not found.'));
    }
    await prisma.redirectRule.delete({ where: { id: existing.id } });
    invalidateRedirectCache();
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'DELETE',
      entityType: 'RedirectRule',
      entityId: existing.id,
      summary: `Deleted redirect ${existing.fromPath}`,
      req
    });
    return sendSuccess(res, { deletedId: existing.id });
  })
);

module.exports = router;
