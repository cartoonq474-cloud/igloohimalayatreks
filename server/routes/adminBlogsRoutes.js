'use strict';

const express = require('express');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');
const { sanitizeRichHtml } = require('../utils/sanitize');
const { publishBlogPostToStatic, rebuildSitemapXml } = require('../services/publishService');

const router = express.Router();
router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const listBlogsQuerySchema = z.object({
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  q: z.string().trim().max(150).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(25)
});

const blogPayloadSchema = z.object({
  slug: z.string().trim().min(2).max(200).regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(2).max(255),
  h1: z.string().trim().min(2).max(255),
  breadcrumbTitle: z.string().trim().max(150).optional().nullable(),
  subCategory: z.string().trim().max(120).optional().nullable(),
  excerpt: z.string().optional().nullable(),
  lead: z.string().optional().nullable(),
  quickAnswerJson: z.any().optional().nullable(),
  tocJson: z.array(z.any()).optional().nullable(),
  sectionsJson: z.array(z.any()).optional().nullable(),
  comparisonTableJson: z.array(z.any()).optional().nullable(),
  faqJson: z.array(z.any()).optional().nullable(),
  readingMinutes: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional().nullable(),
  authorId: z.number().int().positive().optional().nullable(),
  heroMediaId: z.number().int().positive().optional().nullable(),
  heroCaption: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().default(false),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  seo: z.object({
    metaTitle: z.string().trim().max(255).optional(),
    metaDescription: z.string().trim().max(500).optional().nullable(),
    canonicalUrl: z.string().trim().max(500).optional().nullable()
  }).optional()
});

function computeWordStats(sectionsJson, lead) {
  const parts = [lead || ''];
  if (Array.isArray(sectionsJson)) {
    for (const sec of sectionsJson) {
      parts.push(sec.h2 || '');
      parts.push(String(sec.content || '').replace(/<[^>]+>/g, ' '));
    }
  }
  const words = parts.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return {
    wordCount: words,
    readingMinutes: Math.max(1, Math.ceil(words / 220))
  };
}

function sanitizeBlogSections(sectionsJson) {
  if (!Array.isArray(sectionsJson)) return sectionsJson;
  return sectionsJson.map((sec) => ({
    ...sec,
    content: sec.content ? sanitizeRichHtml(sec.content) : ''
  }));
}

router.get(
  '/options',
  requirePermission('blogs:read'),
  asyncHandler(async (_req, res) => {
    const [categories, authors] = await Promise.all([
      prisma.blogCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.authorProfile.findMany({ orderBy: { name: 'asc' } })
    ]);
    return sendSuccess(res, { categories, authors });
  })
);

router.post(
  '/categories',
  requireCsrf,
  requirePermission('blogs:write'),
  validate({
    body: z.object({
      slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/),
      name: z.string().trim().min(2).max(150)
    })
  }),
  asyncHandler(async (req, res) => {
    const category = await prisma.blogCategory.create({ data: req.body });
    return sendSuccess(res, { category }, 201);
  })
);

router.get(
  '/',
  requirePermission('blogs:read'),
  validate({ query: listBlogsQuerySchema }),
  asyncHandler(async (req, res) => {
    const where = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.categoryId) where.categoryId = req.query.categoryId;
    if (req.query.q) {
      where.OR = [
        { title: { contains: req.query.q, mode: 'insensitive' } },
        { h1: { contains: req.query.q, mode: 'insensitive' } },
        { slug: { contains: req.query.q, mode: 'insensitive' } }
      ];
    }

    const skip = (req.query.page - 1) * req.query.limit;
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: req.query.limit,
        orderBy: [{ updatedAt: 'desc' }],
        select: {
          id: true,
          slug: true,
          title: true,
          h1: true,
          readingMinutes: true,
          wordCount: true,
          status: true,
          isFeatured: true,
          publishedAt: true,
          updatedAt: true,
          category: { select: { id: true, name: true } },
          author: { select: { id: true, name: true } }
        }
      }),
      prisma.blogPost.count({ where })
    ]);

    return sendSuccess(
      res,
      { posts },
      200,
      {
        page: req.query.page,
        limit: req.query.limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / req.query.limit))
      }
    );
  })
);

router.get(
  '/:id',
  requirePermission('blogs:read'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
      include: { category: true, author: true, heroMedia: true, seo: true }
    });
    if (!post) {
      return next(new AppError(404, 'BLOG_NOT_FOUND', 'Blog post not found.'));
    }
    return sendSuccess(res, { post });
  })
);

router.post(
  '/',
  requireCsrf,
  requirePermission('blogs:write'),
  validate({ body: blogPayloadSchema }),
  asyncHandler(async (req, res) => {
    const { seo, ...fields } = req.body;
    const cleanSections = sanitizeBlogSections(fields.sectionsJson);
    const stats = computeWordStats(cleanSections, fields.lead);

    const created = await prisma.$transaction(async (tx) => {
      let seoId = null;
      if (seo && seo.metaTitle) {
        const s = await tx.seoMeta.create({
          data: {
            entityType: 'BlogPost',
            metaTitle: seo.metaTitle,
            metaDescription: seo.metaDescription || null,
            canonicalUrl: seo.canonicalUrl || null,
            schemaType: 'Article'
          }
        });
        seoId = s.id;
      }
      return tx.blogPost.create({
        data: {
          ...fields,
          sectionsJson: cleanSections || undefined,
          wordCount: stats.wordCount,
          readingMinutes: fields.readingMinutes || stats.readingMinutes,
          seoId,
          publishedAt: fields.status === 'PUBLISHED' ? new Date() : null
        }
      });
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'BlogPost',
      entityId: created.id,
      summary: `Created blog post ${created.slug}`,
      req
    });

    return sendSuccess(res, { post: created }, 201);
  })
);

router.patch(
  '/:id',
  requireCsrf,
  requirePermission('blogs:write'),
  validate({ params: idParamSchema, body: blogPayloadSchema.partial() }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'BLOG_NOT_FOUND', 'Blog post not found.'));
    }
    if (req.body.status === 'PUBLISHED' && !req.currentUser.hasPermission('blogs:publish')) {
      return next(new AppError(403, 'FORBIDDEN', 'Missing required permission: blogs:publish'));
    }

    const { seo, ...fields } = req.body;
    const nextSections = fields.sectionsJson !== undefined ? sanitizeBlogSections(fields.sectionsJson) : existing.sectionsJson;
    const nextLead = fields.lead !== undefined ? fields.lead : existing.lead;
    const stats = computeWordStats(nextSections, nextLead);

    const updated = await prisma.$transaction(async (tx) => {
      let seoId = existing.seoId;
      if (seo) {
        if (seoId) {
          await tx.seoMeta.update({ where: { id: seoId }, data: seo });
        } else if (seo.metaTitle) {
          const s = await tx.seoMeta.create({
            data: {
              entityType: 'BlogPost',
              metaTitle: seo.metaTitle,
              metaDescription: seo.metaDescription || null,
              canonicalUrl: seo.canonicalUrl || null,
              schemaType: 'Article'
            }
          });
          seoId = s.id;
        }
      }

      return tx.blogPost.update({
        where: { id: existing.id },
        data: {
          ...fields,
          ...(fields.sectionsJson !== undefined ? { sectionsJson: nextSections } : {}),
          wordCount: stats.wordCount,
          readingMinutes: fields.readingMinutes || stats.readingMinutes,
          seoId,
          ...(fields.status === 'PUBLISHED' && !existing.publishedAt ? { publishedAt: new Date() } : {})
        }
      });
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'BlogPost',
      entityId: updated.id,
      summary: `Updated blog post ${updated.slug}`,
      req
    });

    let publishedRoute = null;
    if (updated.status === 'PUBLISHED' && req.currentUser.hasPermission('blogs:publish')) {
      const pub = await publishBlogPostToStatic(updated.id).catch(() => null);
      if (pub) publishedRoute = pub.route;
    }

    return sendSuccess(res, { post: updated, publishedRoute });
  })
);

router.post(
  '/:id/publish',
  requireCsrf,
  requirePermission('blogs:publish'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'BLOG_NOT_FOUND', 'Blog post not found.'));
    }
    const nextStatus = existing.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = await prisma.blogPost.update({
      where: { id: existing.id },
      data: {
        status: nextStatus,
        publishedAt: nextStatus === 'PUBLISHED' ? new Date() : existing.publishedAt
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: nextStatus === 'PUBLISHED' ? 'PUBLISH' : 'UNPUBLISH',
      entityType: 'BlogPost',
      entityId: updated.id,
      summary: `${nextStatus === 'PUBLISHED' ? 'Published' : 'Unpublished'} blog post ${updated.slug}`,
      req
    });

    let publishedRoute = null;
    if (nextStatus === 'PUBLISHED') {
      const pub = await publishBlogPostToStatic(updated.id).catch(() => null);
      if (pub) publishedRoute = pub.route;
      await rebuildSitemapXml().catch(() => {});
    }

    return sendSuccess(res, { post: updated, publishedRoute });
  })
);

router.delete(
  '/:id',
  requireCsrf,
  requirePermission('blogs:delete'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'BLOG_NOT_FOUND', 'Blog post not found.'));
    }
    await prisma.blogPost.delete({ where: { id: existing.id } });
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'DELETE',
      entityType: 'BlogPost',
      entityId: existing.id,
      summary: `Deleted blog post ${existing.slug}`,
      req
    });
    return sendSuccess(res, { deletedId: existing.id });
  })
);

module.exports = router;
