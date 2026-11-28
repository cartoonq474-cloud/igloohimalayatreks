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
const { publishPageToStatic } = require('../services/publishService');

const router = express.Router();
router.use(requireAuth);

const slugParamSchema = z.object({
  slug: z.string().trim().min(1).max(150).regex(/^[a-z0-9-]+$/)
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const pagePayloadSchema = z.object({
  slug: z.string().trim().min(1).max(150).regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(2).max(255),
  templateKey: z.string().trim().min(2).max(80).default('standard'),
  sectionsJson: z.any(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional().default('PUBLISHED'),
  seo: z.object({
    metaTitle: z.string().trim().max(255).optional(),
    metaDescription: z.string().trim().max(500).optional().nullable(),
    canonicalUrl: z.string().trim().max(500).optional().nullable()
  }).optional()
});

const teamMemberSchema = z.object({
  slug: z.string().trim().min(2).max(150).regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(2).max(150),
  role: z.string().trim().min(2).max(150),
  countryBadge: z.string().trim().max(60).optional().default('NEPAL'),
  phone: z.string().trim().max(50).optional().nullable(),
  whatsappUrl: z.string().trim().max(500).optional().nullable(),
  bioHtml: z.string().optional().nullable(),
  avatarMediaId: z.number().int().positive().optional().nullable(),
  isFooterRep: z.boolean().optional().default(false),
  sortOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true)
});

// Pages
router.get(
  '/',
  requirePermission('pages:read'),
  asyncHandler(async (_req, res) => {
    const pages = await prisma.page.findMany({
      orderBy: { slug: 'asc' },
      include: {
        seo: true,
        updatedBy: { select: { id: true, fullName: true } }
      }
    });
    return sendSuccess(res, { pages });
  })
);

router.get(
  '/team',
  requirePermission('pages:read'),
  asyncHandler(async (_req, res) => {
    const members = await prisma.teamMember.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: { avatarMedia: { select: { id: true, secureUrl: true } } }
    });
    return sendSuccess(res, { members });
  })
);

router.post(
  '/team',
  requireCsrf,
  requirePermission('pages:write'),
  validate({ body: teamMemberSchema }),
  asyncHandler(async (req, res) => {
    const data = {
      ...req.body,
      bioHtml: req.body.bioHtml ? sanitizeRichHtml(req.body.bioHtml) : null
    };
    const member = await prisma.teamMember.create({ data });
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'TeamMember',
      entityId: member.id,
      summary: `Created team profile ${member.name}`,
      req
    });
    return sendSuccess(res, { member }, 201);
  })
);

router.patch(
  '/team/:id',
  requireCsrf,
  requirePermission('pages:write'),
  validate({ params: idParamSchema, body: teamMemberSchema.partial() }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.teamMember.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'TEAM_MEMBER_NOT_FOUND', 'Team member not found.'));
    }
    const data = { ...req.body };
    if (data.bioHtml !== undefined && data.bioHtml !== null) {
      data.bioHtml = sanitizeRichHtml(data.bioHtml);
    }
    const member = await prisma.teamMember.update({ where: { id: existing.id }, data });
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'TeamMember',
      entityId: member.id,
      summary: `Updated team profile ${member.name}`,
      req
    });
    return sendSuccess(res, { member });
  })
);

router.delete(
  '/team/:id',
  requireCsrf,
  requirePermission('pages:write'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.teamMember.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'TEAM_MEMBER_NOT_FOUND', 'Team member not found.'));
    }
    await prisma.teamMember.delete({ where: { id: existing.id } });
    return sendSuccess(res, { deletedId: existing.id });
  })
);

router.post(
  '/',
  requireCsrf,
  requirePermission('pages:write'),
  validate({ body: pagePayloadSchema }),
  asyncHandler(async (req, res) => {
    const { seo, ...fields } = req.body;
    const created = await prisma.$transaction(async (tx) => {
      let seoId = null;
      if (seo && seo.metaTitle) {
        const s = await tx.seoMeta.create({
          data: {
            entityType: 'Page',
            metaTitle: seo.metaTitle,
            metaDescription: seo.metaDescription || null,
            canonicalUrl: seo.canonicalUrl || null,
            schemaType: 'WebPage'
          }
        });
        seoId = s.id;
      }
      return tx.page.create({
        data: {
          ...fields,
          seoId,
          updatedById: req.currentUser.id,
          publishedAt: fields.status === 'PUBLISHED' ? new Date() : null
        }
      });
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'Page',
      entityId: created.slug,
      summary: `Created page ${created.slug}`,
      req
    });

    return sendSuccess(res, { page: created }, 201);
  })
);

router.get(
  '/:slug',
  requirePermission('pages:read'),
  validate({ params: slugParamSchema }),
  asyncHandler(async (req, res, next) => {
    const page = await prisma.page.findUnique({
      where: { slug: req.params.slug },
      include: { seo: true }
    });
    if (!page) {
      return next(new AppError(404, 'PAGE_NOT_FOUND', 'Page not found.'));
    }
    return sendSuccess(res, { page });
  })
);

router.patch(
  '/:slug',
  requireCsrf,
  requirePermission('pages:write'),
  validate({ params: slugParamSchema, body: pagePayloadSchema.partial() }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.page.findUnique({ where: { slug: req.params.slug } });
    if (!existing) {
      return next(new AppError(404, 'PAGE_NOT_FOUND', 'Page not found.'));
    }
    if (req.body.status === 'PUBLISHED' && !req.currentUser.hasPermission('pages:publish')) {
      return next(new AppError(403, 'FORBIDDEN', 'Missing required permission: pages:publish'));
    }

    const { seo, ...fields } = req.body;
    const updated = await prisma.$transaction(async (tx) => {
      let seoId = existing.seoId;
      if (seo) {
        if (seoId) {
          await tx.seoMeta.update({ where: { id: seoId }, data: seo });
        } else if (seo.metaTitle) {
          const s = await tx.seoMeta.create({
            data: {
              entityType: 'Page',
              metaTitle: seo.metaTitle,
              metaDescription: seo.metaDescription || null,
              canonicalUrl: seo.canonicalUrl || null,
              schemaType: 'WebPage'
            }
          });
          seoId = s.id;
        }
      }
      return tx.page.update({
        where: { slug: existing.slug },
        data: {
          ...fields,
          seoId,
          updatedById: req.currentUser.id,
          ...(fields.status === 'PUBLISHED' ? { publishedAt: new Date() } : {})
        }
      });
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'Page',
      entityId: updated.slug,
      summary: `Updated page ${updated.slug}`,
      req
    });

    let publishedRoute = null;
    if (updated.status === 'PUBLISHED') {
      const pub = await publishPageToStatic(updated.slug).catch(() => null);
      if (pub) publishedRoute = pub.route;
    }

    return sendSuccess(res, { page: updated, publishedRoute });
  })
);

module.exports = router;
