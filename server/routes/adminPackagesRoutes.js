'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const { z } = require('zod');

const ROOT_DIR = path.resolve(__dirname, '..', '..');

const { prisma } = require('../db/prisma');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');
const { sanitizeRichHtml } = require('../utils/sanitize');
const { publishPackageToStatic, rebuildSitemapXml } = require('../services/publishService');

const router = express.Router();
router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const listQuerySchema = z.object({
  type: z.enum(['TREK', 'TOUR', 'PEAK_CLIMB']).optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional(),
  destinationId: z.coerce.number().int().positive().optional(),
  q: z.string().trim().max(150).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(25)
});

const itineraryDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  title: z.string().trim().min(2).max(255),
  subtitle: z.string().trim().max(255).optional().nullable(),
  altitudeM: z.number().int().min(0).max(9000).optional().nullable(),
  locationName: z.string().trim().max(150).optional().nullable(),
  durationHours: z.string().trim().max(80).optional().nullable(),
  distanceKm: z.string().trim().max(80).optional().nullable(),
  accommodation: z.string().trim().max(180).optional().nullable(),
  meals: z.string().trim().max(180).optional().nullable(),
  activityType: z.string().trim().max(180).optional().nullable(),
  routeSummary: z.string().trim().max(255).optional().nullable(),
  descriptionHtml: z.string().optional().nullable(),
  mediaId: z.number().int().positive().optional().nullable()
});

const faqItemSchema = z.object({
  category: z.enum(['GENERAL', 'GEAR', 'HEALTH', 'BOOKING']).optional().default('GENERAL'),
  question: z.string().trim().min(2),
  answerHtml: z.string().trim().min(1),
  sortOrder: z.number().int().nonnegative().optional().default(0)
});

const galleryItemSchema = z.object({
  slot: z.enum(['HERO_MAIN', 'HERO_TILE_1', 'HERO_TILE_2', 'HERO_TILE_3', 'HERO_TILE_4', 'GALLERY']).optional().default('GALLERY'),
  mediaId: z.number().int().positive().optional().nullable(),
  imageUrl: z.string().trim().max(500).optional().nullable(),
  altText: z.string().trim().max(255).optional().nullable(),
  caption: z.string().trim().max(255).optional().nullable(),
  sortOrder: z.number().int().nonnegative().optional().default(0)
});

const packagePayloadSchema = z.object({
  slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9-]+$/),
  trekKey: z.string().trim().min(2).max(120).regex(/^[a-z0-9_-]+$/),
  type: z.enum(['TREK', 'TOUR', 'PEAK_CLIMB']).optional().default('TREK'),
  title: z.string().trim().min(2).max(255),
  subtitle: z.string().trim().max(255).optional().nullable(),
  durationDays: z.number().int().min(1).max(120),
  maxAltitudeM: z.number().int().min(0).max(9000).optional().nullable(),
  maxAltitudeFt: z.number().int().min(0).max(30000).optional().nullable(),
  difficulty: z.enum(['EASY', 'MODERATE', 'CHALLENGING', 'STRENUOUS']).optional().default('MODERATE'),
  startingPriceUsd: z.number().nonnegative(),
  discountPriceUsd: z.number().nonnegative().optional().nullable(),
  bestSeasonsJson: z.array(z.string()).optional().nullable(),
  tagsJson: z.any().optional().nullable(),
  heroSummary: z.string().optional().nullable(),
  overviewHtml: z.string().optional().nullable(),
  highlightsJson: z.array(z.string()).optional().nullable(),
  tripFactsJson: z.array(z.any()).optional().nullable(),
  inclusionsJson: z.array(z.any()).optional().nullable(),
  exclusionsJson: z.array(z.any()).optional().nullable(),
  groupPricingJson: z.any().optional().nullable(),
  departureDatesJson: z.any().optional().nullable(),
  packingListJson: z.any().optional().nullable(),
  readBeforeBookJson: z.any().optional().nullable(),
  altitudeProfileJson: z.any().optional().nullable(),
  weatherProfileJson: z.any().optional().nullable(),
  destinationId: z.number().int().positive().optional().nullable(),
  categoryId: z.number().int().positive().optional().nullable(),
  routeMapMediaId: z.number().int().positive().optional().nullable(),
  routeMapUrl: z.string().trim().max(500).optional().nullable(),
  isFeatured: z.boolean().optional().default(false),
  sortOrder: z.number().int().optional().default(0),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  seo: z.object({
    metaTitle: z.string().trim().max(255).optional(),
    metaDescription: z.string().trim().max(500).optional().nullable(),
    canonicalUrl: z.string().trim().max(500).optional().nullable(),
    keywords: z.string().trim().max(500).optional().nullable()
  }).optional(),
  itineraryDays: z.array(itineraryDaySchema).optional(),
  faqs: z.array(faqItemSchema).optional(),
  galleries: z.array(galleryItemSchema).optional(),
  recommendedPackageIds: z.array(z.number().int().positive()).optional()
});

const updatePackageSchema = packagePayloadSchema.partial();

async function resolveMediaId(tx, rawUrl, altText) {
  const cleanUrl = String(rawUrl || '').trim().replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
  if (!cleanUrl) return null;
  const noLeadingSlash = cleanUrl.replace(/^\/+/, '');
  const existing = await tx.mediaAsset.findFirst({
    where: {
      OR: [
        { secureUrl: cleanUrl },
        { secureUrl: `/${noLeadingSlash}` },
        { legacyLocalPath: noLeadingSlash }
      ]
    }
  });
  if (existing) {
    if (altText && altText !== existing.altText) {
      await tx.mediaAsset.update({ where: { id: existing.id }, data: { altText } });
    }
    return existing.id;
  }
  const publicId = `cms/${noLeadingSlash.replace(/[^a-z0-9/_-]+/gi, '-')}-${Date.now()}`.slice(0, 250);
  const created = await tx.mediaAsset.create({
    data: {
      cloudinaryPublicId: publicId,
      resourceType: 'IMAGE',
      secureUrl: cleanUrl.startsWith('http') ? cleanUrl : `/${noLeadingSlash}`,
      legacyLocalPath: cleanUrl.startsWith('http') ? null : noLeadingSlash,
      folder: 'packages',
      title: noLeadingSlash.split('/').pop(),
      altText: altText || null
    }
  });
  return created.id;
}

router.get(
  '/options',
  requirePermission('packages:read'),
  asyncHandler(async (_req, res) => {
    const [destinations, categories, allPackages] = await Promise.all([
      prisma.destination.findMany({ orderBy: { displayOrder: 'asc' }, select: { id: true, name: true, slug: true } }),
      prisma.packageCategory.findMany({ orderBy: { sortOrder: 'asc' }, select: { id: true, name: true, slug: true } }),
      prisma.package.findMany({ orderBy: { title: 'asc' }, select: { id: true, title: true, slug: true, durationDays: true } })
    ]);
    return sendSuccess(res, { destinations, categories, packages: allPackages });
  })
);

router.get(
  '/',
  requirePermission('packages:read'),
  validate({ query: listQuerySchema }),
  asyncHandler(async (req, res) => {
    const where = {};
    if (req.query.type) where.type = req.query.type;
    if (req.query.status) where.status = req.query.status;
    if (req.query.destinationId) where.destinationId = req.query.destinationId;
    if (req.query.q) {
      where.OR = [
        { title: { contains: req.query.q, mode: 'insensitive' } },
        { slug: { contains: req.query.q, mode: 'insensitive' } },
        { trekKey: { contains: req.query.q, mode: 'insensitive' } }
      ];
    }

    const skip = (req.query.page - 1) * req.query.limit;
    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        where,
        skip,
        take: req.query.limit,
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
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
          status: true,
          isFeatured: true,
          updatedAt: true,
          destination: { select: { id: true, name: true } },
          category: { select: { id: true, name: true } },
          _count: { select: { itineraryDays: true, faqs: true, reviews: true } }
        }
      }),
      prisma.package.count({ where })
    ]);

    return sendSuccess(
      res,
      { packages },
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
  requirePermission('packages:read'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const pkg = await prisma.package.findUnique({
      where: { id: req.params.id },
      include: {
        destination: true,
        category: true,
        seo: true,
        routeMapMedia: true,
        itineraryDays: { orderBy: { dayNumber: 'asc' }, include: { media: true } },
        galleries: { orderBy: { sortOrder: 'asc' }, include: { media: true } },
        faqs: { orderBy: { sortOrder: 'asc' } },
        recommendations: {
          orderBy: { sortOrder: 'asc' },
          include: { recommendedPackage: { select: { id: true, slug: true, title: true, durationDays: true } } }
        }
      }
    });

    if (!pkg) {
      return next(new AppError(404, 'PACKAGE_NOT_FOUND', 'Package not found.'));
    }

    return sendSuccess(res, { package: pkg });
  })
);

router.post(
  '/',
  requireCsrf,
  requirePermission('packages:write'),
  validate({ body: packagePayloadSchema }),
  asyncHandler(async (req, res) => {
    const { seo, itineraryDays, faqs, galleries, recommendedPackageIds, routeMapUrl, ...fields } = req.body;
    if (fields.overviewHtml) fields.overviewHtml = sanitizeRichHtml(fields.overviewHtml);

    const created = await prisma.$transaction(async (tx) => {
      let seoId = null;
      if (seo && seo.metaTitle) {
        const seoRow = await tx.seoMeta.create({
          data: {
            entityType: 'Package',
            metaTitle: seo.metaTitle,
            metaDescription: seo.metaDescription || null,
            canonicalUrl: seo.canonicalUrl || null,
            keywords: seo.keywords || null,
            schemaType: 'TouristTrip'
          }
        });
        seoId = seoRow.id;
      }

      if (routeMapUrl !== undefined && !fields.routeMapMediaId) {
        fields.routeMapMediaId = routeMapUrl ? await resolveMediaId(tx, routeMapUrl, `${fields.title} Route Map`) : null;
      }

      const pkg = await tx.package.create({
        data: {
          ...fields,
          seoId,
          publishedAt: fields.status === 'PUBLISHED' ? new Date() : null
        }
      });

      if (Array.isArray(itineraryDays) && itineraryDays.length > 0) {
        await tx.packageItineraryDay.createMany({
          data: itineraryDays.map((d) => ({
            ...d,
            descriptionHtml: d.descriptionHtml ? sanitizeRichHtml(d.descriptionHtml) : null,
            packageId: pkg.id
          }))
        });
      }

      if (Array.isArray(faqs) && faqs.length > 0) {
        await tx.packageFaq.createMany({
          data: faqs.map((f, idx) => ({
            ...f,
            answerHtml: sanitizeRichHtml(f.answerHtml),
            sortOrder: f.sortOrder ?? idx,
            packageId: pkg.id
          }))
        });
      }

      if (Array.isArray(galleries) && galleries.length > 0) {
        for (let idx = 0; idx < galleries.length; idx++) {
          const g = galleries[idx];
          const resolvedId = g.mediaId || (g.imageUrl ? await resolveMediaId(tx, g.imageUrl, g.altText || g.caption || fields.title) : null);
          if (resolvedId) {
            await tx.packageGallery.create({
              data: {
                packageId: pkg.id,
                mediaId: resolvedId,
                slot: g.slot || 'GALLERY',
                sortOrder: g.sortOrder ?? idx,
                caption: g.caption || g.altText || null
              }
            });
          }
        }
      }

      if (Array.isArray(recommendedPackageIds) && recommendedPackageIds.length > 0) {
        await tx.packageRecommendation.createMany({
          data: recommendedPackageIds
            .filter((rid) => rid !== pkg.id)
            .slice(0, 4)
            .map((rid, idx) => ({
              packageId: pkg.id,
              recommendedPackageId: rid,
              sortOrder: idx
            })),
          skipDuplicates: true
        });
      }

      return pkg;
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'Package',
      entityId: created.id,
      summary: `Created package ${created.title} (${created.slug})`,
      req
    });

    let publishedRoute = null;
    let publishWarning = null;
    if (created.status === 'PUBLISHED' && req.currentUser.hasPermission('packages:publish')) {
      try {
        const pub = await publishPackageToStatic(created.id);
        publishedRoute = pub.route;
        await rebuildSitemapXml().catch(() => {});
      } catch (err) {
        publishWarning = err.message;
      }
    }

    return sendSuccess(res, { package: created, publishedRoute, publishWarning }, 201);
  })
);

router.patch(
  '/:id',
  requireCsrf,
  requirePermission('packages:write'),
  validate({ params: idParamSchema, body: updatePackageSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.package.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'PACKAGE_NOT_FOUND', 'Package not found.'));
    }

    if (req.body.status === 'PUBLISHED' && !req.currentUser.hasPermission('packages:publish')) {
      return next(new AppError(403, 'FORBIDDEN', 'Missing required permission: packages:publish'));
    }

    const { seo, itineraryDays, faqs, galleries, recommendedPackageIds, routeMapUrl, ...fields } = req.body;
    if (fields.overviewHtml !== undefined && fields.overviewHtml !== null) {
      fields.overviewHtml = sanitizeRichHtml(fields.overviewHtml);
    }

    const updated = await prisma.$transaction(async (tx) => {
      let seoId = existing.seoId;
      if (seo) {
        if (seoId) {
          await tx.seoMeta.update({
            where: { id: seoId },
            data: {
              ...(seo.metaTitle !== undefined ? { metaTitle: seo.metaTitle } : {}),
              ...(seo.metaDescription !== undefined ? { metaDescription: seo.metaDescription } : {}),
              ...(seo.canonicalUrl !== undefined ? { canonicalUrl: seo.canonicalUrl } : {}),
              ...(seo.keywords !== undefined ? { keywords: seo.keywords } : {})
            }
          });
        } else if (seo.metaTitle) {
          const createdSeo = await tx.seoMeta.create({
            data: {
              entityType: 'Package',
              metaTitle: seo.metaTitle,
              metaDescription: seo.metaDescription || null,
              canonicalUrl: seo.canonicalUrl || null,
              keywords: seo.keywords || null,
              schemaType: 'TouristTrip'
            }
          });
          seoId = createdSeo.id;
        }
      }

      if (routeMapUrl !== undefined && !fields.routeMapMediaId) {
        fields.routeMapMediaId = routeMapUrl ? await resolveMediaId(tx, routeMapUrl, `${fields.title || existing.title} Route Map`) : null;
      }

      const pkg = await tx.package.update({
        where: { id: existing.id },
        data: {
          ...fields,
          seoId,
          ...(fields.status === 'PUBLISHED' && !existing.publishedAt ? { publishedAt: new Date() } : {})
        }
      });

      if (Array.isArray(itineraryDays)) {
        await tx.packageItineraryDay.deleteMany({ where: { packageId: pkg.id } });
        if (itineraryDays.length > 0) {
          await tx.packageItineraryDay.createMany({
            data: itineraryDays.map((d) => ({
              ...d,
              descriptionHtml: d.descriptionHtml ? sanitizeRichHtml(d.descriptionHtml) : null,
              packageId: pkg.id
            }))
          });
        }
      }

      if (Array.isArray(faqs)) {
        await tx.packageFaq.deleteMany({ where: { packageId: pkg.id } });
        if (faqs.length > 0) {
          await tx.packageFaq.createMany({
            data: faqs.map((f, idx) => ({
              ...f,
              answerHtml: sanitizeRichHtml(f.answerHtml),
              sortOrder: f.sortOrder ?? idx,
              packageId: pkg.id
            }))
          });
        }
      }

      if (Array.isArray(galleries)) {
        await tx.packageGallery.deleteMany({ where: { packageId: pkg.id } });
        for (let idx = 0; idx < galleries.length; idx++) {
          const g = galleries[idx];
          const resolvedId = g.mediaId || (g.imageUrl ? await resolveMediaId(tx, g.imageUrl, g.altText || g.caption || pkg.title) : null);
          if (resolvedId) {
            await tx.packageGallery.create({
              data: {
                packageId: pkg.id,
                mediaId: resolvedId,
                slot: g.slot || 'GALLERY',
                sortOrder: g.sortOrder ?? idx,
                caption: g.caption || g.altText || null
              }
            });
          }
        }
      }

      if (Array.isArray(recommendedPackageIds)) {
        await tx.packageRecommendation.deleteMany({ where: { packageId: pkg.id } });
        if (recommendedPackageIds.length > 0) {
          await tx.packageRecommendation.createMany({
            data: recommendedPackageIds
              .filter((rid) => rid !== pkg.id)
              .slice(0, 4)
              .map((rid, idx) => ({
                packageId: pkg.id,
                recommendedPackageId: rid,
                sortOrder: idx
              })),
            skipDuplicates: true
          });
        }
      }

      return pkg;
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'Package',
      entityId: updated.id,
      summary: `Updated package ${updated.title}`,
      req
    });

    let publishedRoute = null;
    let publishWarning = null;
    if (updated.status === 'PUBLISHED' && req.currentUser.hasPermission('packages:publish')) {
      try {
        const pub = await publishPackageToStatic(updated.id);
        publishedRoute = pub.route;
      } catch (err) {
        publishWarning = err.message;
      }
    }

    return sendSuccess(res, { package: updated, publishedRoute, publishWarning });
  })
);

router.post(
  '/:id/publish',
  requireCsrf,
  requirePermission('packages:publish'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.package.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'PACKAGE_NOT_FOUND', 'Package not found.'));
    }

    const nextStatus = existing.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = await prisma.package.update({
      where: { id: existing.id },
      data: {
        status: nextStatus,
        publishedAt: nextStatus === 'PUBLISHED' ? new Date() : existing.publishedAt
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: nextStatus === 'PUBLISHED' ? 'PUBLISH' : 'UNPUBLISH',
      entityType: 'Package',
      entityId: updated.id,
      summary: `${nextStatus === 'PUBLISHED' ? 'Published' : 'Unpublished'} package ${updated.title}`,
      req
    });

    let publishedRoute = null;
    if (nextStatus === 'PUBLISHED') {
      const pub = await publishPackageToStatic(updated.id).catch(() => null);
      if (pub) publishedRoute = pub.route;
      await rebuildSitemapXml().catch(() => {});
    }

    return sendSuccess(res, { package: updated, publishedRoute });
  })
);

router.delete(
  '/:id',
  requireCsrf,
  requirePermission('packages:delete'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.package.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'PACKAGE_NOT_FOUND', 'Package not found.'));
    }

    await prisma.package.delete({ where: { id: existing.id } });

    const folder = existing.type === 'TOUR' ? 'tour' : 'trek';
    const targetDir = path.join(ROOT_DIR, folder, existing.slug);
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    await rebuildSitemapXml().catch(() => {});

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'DELETE',
      entityType: 'Package',
      entityId: existing.id,
      summary: `Deleted package ${existing.title} (${existing.slug})`,
      req
    });

    return sendSuccess(res, { deletedId: existing.id });
  })
);

module.exports = router;
