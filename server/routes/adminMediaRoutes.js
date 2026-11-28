'use strict';

const express = require('express');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');
const {
  isCloudinaryConfigured,
  createSignedUploadParams,
  deleteCloudinaryAsset
} = require('../services/cloudinaryService');

const router = express.Router();
router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const listMediaQuerySchema = z.object({
  folder: z.string().trim().max(120).optional(),
  resourceType: z.enum(['IMAGE', 'VIDEO']).optional(),
  q: z.string().trim().max(150).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(30)
});

const signatureSchema = z.object({
  folder: z.string().trim().max(120).optional().default('igloo-cms/general'),
  resourceType: z.enum(['image', 'video']).optional().default('image'),
  publicId: z.string().trim().max(200).optional()
});

const registerMediaSchema = z.object({
  cloudinaryPublicId: z.string().trim().min(2).max(255),
  resourceType: z.enum(['IMAGE', 'VIDEO']).optional().default('IMAGE'),
  secureUrl: z.string().trim().min(5).max(1000),
  legacyLocalPath: z.string().trim().max(255).optional().nullable(),
  format: z.string().trim().max(32).optional().nullable(),
  width: z.number().int().nonnegative().optional().nullable(),
  height: z.number().int().nonnegative().optional().nullable(),
  bytes: z.number().int().nonnegative().optional().nullable(),
  folder: z.string().trim().max(120).optional().default('general'),
  title: z.string().trim().max(200).optional().nullable(),
  altText: z.string().trim().max(255).optional().nullable(),
  caption: z.string().trim().max(2000).optional().nullable(),
  tagsJson: z.array(z.string().trim().max(50)).optional().nullable()
});

const updateMediaSchema = z.object({
  folder: z.string().trim().max(120).optional(),
  title: z.string().trim().max(200).optional().nullable(),
  altText: z.string().trim().max(255).optional().nullable(),
  caption: z.string().trim().max(2000).optional().nullable(),
  tagsJson: z.array(z.string().trim().max(50)).optional().nullable(),
  secureUrl: z.string().trim().min(5).max(1000).optional(),
  cloudinaryPublicId: z.string().trim().min(2).max(255).optional(),
  format: z.string().trim().max(32).optional().nullable(),
  width: z.number().int().nonnegative().optional().nullable(),
  height: z.number().int().nonnegative().optional().nullable(),
  bytes: z.number().int().nonnegative().optional().nullable()
});

router.get(
  '/status',
  requirePermission('media:read'),
  asyncHandler(async (_req, res) => {
    const folders = await prisma.mediaAsset.groupBy({
      by: ['folder'],
      _count: { _all: true },
      orderBy: { folder: 'asc' }
    });

    return sendSuccess(res, {
      cloudinaryConfigured: isCloudinaryConfigured(),
      folders: folders.map((f) => ({ folder: f.folder, count: f._count._all }))
    });
  })
);

router.get(
  '/',
  requirePermission('media:read'),
  validate({ query: listMediaQuerySchema }),
  asyncHandler(async (req, res) => {
    const where = {};
    if (req.query.folder) where.folder = req.query.folder;
    if (req.query.resourceType) where.resourceType = req.query.resourceType;
    if (req.query.q) {
      where.OR = [
        { title: { contains: req.query.q, mode: 'insensitive' } },
        { altText: { contains: req.query.q, mode: 'insensitive' } },
        { cloudinaryPublicId: { contains: req.query.q, mode: 'insensitive' } },
        { legacyLocalPath: { contains: req.query.q, mode: 'insensitive' } }
      ];
    }

    const skip = (req.query.page - 1) * req.query.limit;
    const [assets, total] = await Promise.all([
      prisma.mediaAsset.findMany({
        where,
        skip,
        take: req.query.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          uploadedBy: { select: { id: true, fullName: true } }
        }
      }),
      prisma.mediaAsset.count({ where })
    ]);

    return sendSuccess(
      res,
      { assets },
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
  '/signature',
  requireCsrf,
  requirePermission('media:write'),
  validate({ body: signatureSchema }),
  asyncHandler(async (req, res, next) => {
    const signed = createSignedUploadParams(req.body);
    if (!signed) {
      return next(
        new AppError(
          503,
          'CLOUDINARY_NOT_CONFIGURED',
          'Cloudinary credentials are not configured in .env (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).'
        )
      );
    }
    return sendSuccess(res, signed);
  })
);

router.post(
  '/',
  requireCsrf,
  requirePermission('media:write'),
  validate({ body: registerMediaSchema }),
  asyncHandler(async (req, res) => {
    const asset = await prisma.mediaAsset.create({
      data: {
        cloudinaryPublicId: req.body.cloudinaryPublicId,
        resourceType: req.body.resourceType,
        secureUrl: req.body.secureUrl,
        legacyLocalPath: req.body.legacyLocalPath || null,
        format: req.body.format || null,
        width: req.body.width ?? null,
        height: req.body.height ?? null,
        bytes: req.body.bytes ?? null,
        folder: req.body.folder,
        title: req.body.title || req.body.cloudinaryPublicId.split('/').pop(),
        altText: req.body.altText || null,
        caption: req.body.caption || null,
        tagsJson: req.body.tagsJson || undefined,
        uploadedById: req.currentUser.id
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'CREATE',
      entityType: 'MediaAsset',
      entityId: asset.id,
      summary: `Registered media asset ${asset.cloudinaryPublicId}`,
      req
    });

    return sendSuccess(res, { asset }, 201);
  })
);

router.patch(
  '/:id',
  requireCsrf,
  requirePermission('media:write'),
  validate({ params: idParamSchema, body: updateMediaSchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.mediaAsset.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'MEDIA_NOT_FOUND', 'Media asset not found.'));
    }

    const updated = await prisma.mediaAsset.update({
      where: { id: req.params.id },
      data: {
        ...(req.body.folder !== undefined ? { folder: req.body.folder } : {}),
        ...(req.body.title !== undefined ? { title: req.body.title } : {}),
        ...(req.body.altText !== undefined ? { altText: req.body.altText } : {}),
        ...(req.body.caption !== undefined ? { caption: req.body.caption } : {}),
        ...(req.body.tagsJson !== undefined ? { tagsJson: req.body.tagsJson } : {}),
        ...(req.body.secureUrl !== undefined ? { secureUrl: req.body.secureUrl } : {}),
        ...(req.body.cloudinaryPublicId !== undefined ? { cloudinaryPublicId: req.body.cloudinaryPublicId } : {}),
        ...(req.body.format !== undefined ? { format: req.body.format } : {}),
        ...(req.body.width !== undefined ? { width: req.body.width } : {}),
        ...(req.body.height !== undefined ? { height: req.body.height } : {}),
        ...(req.body.bytes !== undefined ? { bytes: req.body.bytes } : {})
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'MediaAsset',
      entityId: updated.id,
      summary: `Updated media asset ${updated.cloudinaryPublicId}`,
      req
    });

    return sendSuccess(res, { asset: updated });
  })
);

router.delete(
  '/:id',
  requireCsrf,
  requirePermission('media:delete'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const asset = await prisma.mediaAsset.findUnique({
      where: { id: req.params.id },
      include: {
        _count: {
          select: {
            packageGalleries: true,
            packageRouteMaps: true,
            packageDayMedia: true,
            destinationHeroes: true,
            blogHeroes: true,
            authorAvatars: true,
            teamAvatars: true,
            seoOgImages: true
          }
        }
      }
    });

    if (!asset) {
      return next(new AppError(404, 'MEDIA_NOT_FOUND', 'Media asset not found.'));
    }

    const totalRefs = Object.values(asset._count).reduce((sum, n) => sum + n, 0);
    if (totalRefs > 0) {
      return next(
        new AppError(
          409,
          'MEDIA_IN_USE',
          `Asset is currently referenced ${totalRefs} time(s) across content. Replace or unlink it first.`,
          asset._count
        )
      );
    }

    await deleteCloudinaryAsset(asset.cloudinaryPublicId, asset.resourceType).catch((err) => {
      console.warn('[Cloudinary] Delete notice:', err.message);
    });

    await prisma.mediaAsset.delete({ where: { id: asset.id } });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'DELETE',
      entityType: 'MediaAsset',
      entityId: asset.id,
      summary: `Deleted media asset ${asset.cloudinaryPublicId}`,
      req
    });

    return sendSuccess(res, { deletedId: asset.id });
  })
);

module.exports = router;
