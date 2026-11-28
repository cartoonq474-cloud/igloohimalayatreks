'use strict';

const express = require('express');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const env = require('../config/env');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');

const router = express.Router();

const reviewSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: env.isTest ? 50 : 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many review submissions. Please wait an hour and try again.'
    }
  }
});

router.get(
  '/packages',
  asyncHandler(async (req, res) => {
    const where = { status: 'PUBLISHED' };
    if (req.query.region) {
      where.destination = { regionKey: String(req.query.region) };
    }
    if (req.query.type) {
      where.type = String(req.query.type).toUpperCase();
    }
    if (req.query.q) {
      where.OR = [
        { title: { contains: String(req.query.q), mode: 'insensitive' } },
        { heroSummary: { contains: String(req.query.q), mode: 'insensitive' } }
      ];
    }

    const packages = await prisma.package.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { title: 'asc' }],
      select: {
        id: true,
        slug: true,
        trekKey: true,
        type: true,
        title: true,
        durationDays: true,
        maxAltitudeM: true,
        difficulty: true,
        startingPriceUsd: true,
        bestSeasonsJson: true,
        tagsJson: true,
        heroSummary: true,
        destination: { select: { slug: true, name: true, regionKey: true } },
        galleries: {
          where: { slot: 'HERO_MAIN' },
          take: 1,
          select: { media: { select: { secureUrl: true, altText: true } } }
        }
      }
    });

    return sendSuccess(res, { packages });
  })
);

router.get(
  '/packages/:slug/visualizer',
  asyncHandler(async (req, res, next) => {
    const pkg = await prisma.package.findUnique({
      where: { slug: String(req.params.slug) },
      select: {
        slug: true,
        trekKey: true,
        title: true,
        altitudeProfileJson: true,
        weatherProfileJson: true
      }
    });
    if (!pkg) {
      return next(new AppError(404, 'PACKAGE_NOT_FOUND', 'Package not found.'));
    }
    return sendSuccess(res, pkg);
  })
);

router.get(
  '/reviews',
  asyncHandler(async (req, res) => {
    const where = { status: 'APPROVED' };
    if (req.query.packageSlug) {
      where.package = { slug: String(req.query.packageSlug) };
    }
    if (req.query.region) {
      where.destination = { regionKey: String(req.query.region) };
    }
    if (req.query.platform) {
      where.platform = String(req.query.platform).toUpperCase();
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: [{ isFeaturedHome: 'desc' }, { createdAt: 'desc' }],
      take: 60,
      select: {
        id: true,
        reviewType: true,
        platform: true,
        authorName: true,
        authorCountry: true,
        rating: true,
        title: true,
        body: true,
        travelDateLabel: true,
        guideName: true,
        videoUrl: true,
        helpfulCount: true,
        isVerified: true,
        package: { select: { slug: true, title: true } }
      }
    });
    return sendSuccess(res, { reviews });
  })
);

router.post(
  '/reviews',
  reviewSubmitLimiter,
  validate({
    body: z.object({
      packageSlug: z.string().trim().max(180).optional(),
      authorName: z.string().trim().min(2).max(150),
      authorCountry: z.string().trim().max(80).optional(),
      rating: z.number().int().min(1).max(5).default(5),
      title: z.string().trim().max(255).optional(),
      body: z.string().trim().min(10).max(3000),
      travelDateLabel: z.string().trim().max(80).optional()
    })
  }),
  asyncHandler(async (req, res) => {
    let packageId = null;
    if (req.body.packageSlug) {
      const pkg = await prisma.package.findUnique({ where: { slug: req.body.packageSlug } });
      if (pkg) packageId = pkg.id;
    }

    const created = await prisma.review.create({
      data: {
        packageId,
        authorName: req.body.authorName,
        authorCountry: req.body.authorCountry || null,
        rating: req.body.rating,
        title: req.body.title || null,
        body: req.body.body,
        travelDateLabel: req.body.travelDateLabel || null,
        status: 'PENDING',
        isVerified: false
      },
      select: { id: true, status: true }
    });

    return sendSuccess(res, { review: created }, 201);
  })
);

router.post(
  '/reviews/:id/helpful',
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return next(new AppError(400, 'INVALID_ID', 'Invalid review id.'));
    }
    const updated = await prisma.review.update({
      where: { id },
      data: { helpfulCount: { increment: 1 } },
      select: { id: true, helpfulCount: true }
    });
    return sendSuccess(res, updated);
  })
);

module.exports = router;
