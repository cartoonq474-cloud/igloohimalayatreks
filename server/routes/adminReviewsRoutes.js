'use strict';

const express = require('express');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');

const router = express.Router();
router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const listReviewsQuerySchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  reviewType: z.enum(['CUSTOMER', 'VIDEO', 'PLATFORM']).optional(),
  platform: z.enum(['INTERNAL', 'TRIPADVISOR', 'GOOGLE', 'TRUSTPILOT', 'FACEBOOK']).optional(),
  q: z.string().trim().max(150).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(25)
});

const reviewSchema = z.object({
  packageId: z.number().int().positive().optional().nullable(),
  destinationId: z.number().int().positive().optional().nullable(),
  reviewType: z.enum(['CUSTOMER', 'VIDEO', 'PLATFORM']).optional().default('CUSTOMER'),
  platform: z.enum(['INTERNAL', 'TRIPADVISOR', 'GOOGLE', 'TRUSTPILOT', 'FACEBOOK']).optional().default('INTERNAL'),
  authorName: z.string().trim().min(2).max(150),
  authorCountry: z.string().trim().max(80).optional().nullable(),
  rating: z.number().int().min(1).max(5).optional().default(5),
  title: z.string().trim().max(255).optional().nullable(),
  body: z.string().trim().min(5).max(5000),
  travelDateLabel: z.string().trim().max(80).optional().nullable(),
  guideName: z.string().trim().max(120).optional().nullable(),
  videoUrl: z.string().trim().max(500).optional().nullable(),
  thumbnailMediaId: z.number().int().positive().optional().nullable(),
  isVerified: z.boolean().optional().default(true),
  isFeaturedHome: z.boolean().optional().default(false),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional().default('APPROVED')
});

router.get(
  '/',
  requirePermission('reviews:read'),
  validate({ query: listReviewsQuerySchema }),
  asyncHandler(async (req, res) => {
    const where = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.reviewType) where.reviewType = req.query.reviewType;
    if (req.query.platform) where.platform = req.query.platform;
    if (req.query.q) {
      where.OR = [
        { authorName: { contains: req.query.q, mode: 'insensitive' } },
        { title: { contains: req.query.q, mode: 'insensitive' } },
        { body: { contains: req.query.q, mode: 'insensitive' } }
      ];
    }

    const skip = (req.query.page - 1) * req.query.limit;
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: req.query.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          package: { select: { id: true, title: true, slug: true } },
          destination: { select: { id: true, name: true } }
        }
      }),
      prisma.review.count({ where })
    ]);

    return sendSuccess(
      res,
      { reviews },
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

router.post(
  '/',
  requireCsrf,
  requirePermission('reviews:write'),
  validate({ body: reviewSchema }),
  asyncHandler(async (req, res) => {
    const review = await prisma.review.create({ data: req.body });
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'Review',
      entityId: review.id,
      summary: `Created review by ${review.authorName} (${review.platform})`,
      req
    });
    return sendSuccess(res, { review }, 201);
  })
);

router.patch(
  '/:id',
  requireCsrf,
  requirePermission('reviews:write'),
  validate({ params: idParamSchema, body: reviewSchema.partial() }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.review.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'REVIEW_NOT_FOUND', 'Review not found.'));
    }

    const changingModeration =
      (req.body.status !== undefined && req.body.status !== existing.status) ||
      (req.body.isFeaturedHome !== undefined && req.body.isFeaturedHome !== existing.isFeaturedHome);
    if (changingModeration && !req.currentUser.hasPermission('reviews:moderate')) {
      return next(new AppError(403, 'FORBIDDEN', 'Missing required permission: reviews:moderate'));
    }

    const review = await prisma.review.update({
      where: { id: existing.id },
      data: req.body
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: changingModeration ? 'MODERATE' : 'UPDATE',
      entityType: 'Review',
      entityId: review.id,
      summary: `Updated review #${review.id} (${review.status})`,
      req
    });

    return sendSuccess(res, { review });
  })
);

router.delete(
  '/:id',
  requireCsrf,
  requirePermission('reviews:delete'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.review.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'REVIEW_NOT_FOUND', 'Review not found.'));
    }
    await prisma.review.delete({ where: { id: existing.id } });
    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'DELETE',
      entityType: 'Review',
      entityId: existing.id,
      summary: `Deleted review by ${existing.authorName}`,
      req
    });
    return sendSuccess(res, { deletedId: existing.id });
  })
);

module.exports = router;
