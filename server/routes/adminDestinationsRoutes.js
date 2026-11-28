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
const { publishDestinationToStatic } = require('../services/publishService');

const router = express.Router();
router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const destinationSchema = z.object({
  slug: z.string().trim().min(2).max(150).regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(2).max(150),
  regionKey: z.string().trim().min(2).max(64).regex(/^[a-z0-9-]+$/),
  tagline: z.string().trim().max(255).optional().nullable(),
  summary: z.string().optional().nullable(),
  overviewHtml: z.string().optional().nullable(),
  permitInfoJson: z.any().optional().nullable(),
  bestSeasonSummary: z.string().trim().max(255).optional().nullable(),
  faqJson: z.array(z.any()).optional().nullable(),
  heroMediaId: z.number().int().positive().optional().nullable(),
  displayOrder: z.number().int().optional().default(0),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  seo: z.object({
    metaTitle: z.string().trim().max(255).optional(),
    metaDescription: z.string().trim().max(500).optional().nullable(),
    canonicalUrl: z.string().trim().max(500).optional().nullable()
  }).optional()
});

router.get(
  '/',
  requirePermission('destinations:read'),
  asyncHandler(async (_req, res) => {
    const destinations = await prisma.destination.findMany({
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      include: {
        seo: true,
        heroMedia: { select: { id: true, secureUrl: true, altText: true } },
        _count: { select: { packages: true, reviews: true } }
      }
    });
    return sendSuccess(res, { destinations });
  })
);

router.get(
  '/:id',
  requirePermission('destinations:read'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const destination = await prisma.destination.findUnique({
      where: { id: req.params.id },
      include: { seo: true, heroMedia: true }
    });
    if (!destination) {
      return next(new AppError(404, 'DESTINATION_NOT_FOUND', 'Destination not found.'));
    }
    return sendSuccess(res, { destination });
  })
);

router.post(
  '/',
  requireCsrf,
  requirePermission('destinations:write'),
  validate({ body: destinationSchema }),
  asyncHandler(async (req, res) => {
    const { seo, ...fields } = req.body;
    if (fields.overviewHtml) fields.overviewHtml = sanitizeRichHtml(fields.overviewHtml);

    const created = await prisma.$transaction(async (tx) => {
      let seoId = null;
      if (seo && seo.metaTitle) {
        const s = await tx.seoMeta.create({
          data: {
            entityType: 'Destination',
            metaTitle: seo.metaTitle,
            metaDescription: seo.metaDescription || null,
            canonicalUrl: seo.canonicalUrl || null,
            schemaType: 'CollectionPage'
          }
        });
        seoId = s.id;
      }
      return tx.destination.create({
        data: {
          ...fields,
          seoId,
          publishedAt: fields.status === 'PUBLISHED' ? new Date() : null
        }
      });
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'Destination',
      entityId: created.id,
      summary: `Created destination ${created.name}`,
      req
    });

    return sendSuccess(res, { destination: created }, 201);
  })
);

router.patch(
  '/:id',
  requireCsrf,
  requirePermission('destinations:write'),
  validate({ params: idParamSchema, body: destinationSchema.partial() }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.destination.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'DESTINATION_NOT_FOUND', 'Destination not found.'));
    }
    if (req.body.status === 'PUBLISHED' && !req.currentUser.hasPermission('destinations:publish')) {
      return next(new AppError(403, 'FORBIDDEN', 'Missing required permission: destinations:publish'));
    }

    const { seo, ...fields } = req.body;
    if (fields.overviewHtml !== undefined && fields.overviewHtml !== null) {
      fields.overviewHtml = sanitizeRichHtml(fields.overviewHtml);
    }

    const updated = await prisma.$transaction(async (tx) => {
      let seoId = existing.seoId;
      if (seo) {
        if (seoId) {
          await tx.seoMeta.update({ where: { id: seoId }, data: seo });
        } else if (seo.metaTitle) {
          const s = await tx.seoMeta.create({
            data: {
              entityType: 'Destination',
              metaTitle: seo.metaTitle,
              metaDescription: seo.metaDescription || null,
              canonicalUrl: seo.canonicalUrl || null,
              schemaType: 'CollectionPage'
            }
          });
          seoId = s.id;
        }
      }
      return tx.destination.update({
        where: { id: existing.id },
        data: {
          ...fields,
          seoId,
          ...(fields.status === 'PUBLISHED' && !existing.publishedAt ? { publishedAt: new Date() } : {})
        }
      });
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'Destination',
      entityId: updated.id,
      summary: `Updated destination ${updated.name}`,
      req
    });

    let publishedRoute = null;
    if (updated.status === 'PUBLISHED') {
      const pub = await publishDestinationToStatic(updated.id).catch(() => null);
      if (pub) publishedRoute = pub.route;
    }

    return sendSuccess(res, { destination: updated, publishedRoute });
  })
);

router.delete(
  '/:id',
  requireCsrf,
  requirePermission('destinations:delete'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.destination.findUnique({
      where: { id: req.params.id },
      include: { _count: { select: { packages: true } } }
    });
    if (!existing) {
      return next(new AppError(404, 'DESTINATION_NOT_FOUND', 'Destination not found.'));
    }
    if (existing._count.packages > 0) {
      return next(
        new AppError(409, 'DESTINATION_HAS_PACKAGES', 'Reassign linked packages before deleting this destination.')
      );
    }
    await prisma.destination.delete({ where: { id: existing.id } });
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'DELETE',
      entityType: 'Destination',
      entityId: existing.id,
      summary: `Deleted destination ${existing.name}`,
      req
    });
    return sendSuccess(res, { deletedId: existing.id });
  })
);

module.exports = router;
