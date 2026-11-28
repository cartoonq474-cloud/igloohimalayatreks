'use strict';

const express = require('express');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const { asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');
const { invalidateSettingsCache } = require('../services/liveHtmlService');

const router = express.Router();
router.use(requireAuth);

const MENU_LOCATIONS = [
  'HEADER_MEGA_MENU',
  'HEADER_MOBILE',
  'FOOTER_COL_1',
  'FOOTER_COL_2',
  'FOOTER_COL_3',
  'FOOTER_COL_4',
  'FOOTER_LEGAL'
];

const menuLocationParamSchema = z.object({
  location: z.enum(MENU_LOCATIONS)
});

const updateSettingsSchema = z.object({
  companyName: z.string().trim().min(2).max(200).optional(),
  legalName: z.string().trim().min(2).max(200).optional(),
  tagline: z.string().trim().max(255).optional().nullable(),
  phonePrimary: z.string().trim().min(5).max(50).optional(),
  whatsappNumber: z.string().trim().min(5).max(50).optional(),
  emailPrimary: z.string().trim().email().max(255).optional(),
  emailSecondary: z.string().trim().email().max(255).optional().nullable().or(z.literal('')),
  officeAddress: z.string().trim().min(5).max(500).optional(),
  officeHours: z.string().trim().max(255).optional().nullable(),
  geoLat: z.number().min(-90).max(90).optional().nullable(),
  geoLng: z.number().min(-180).max(180).optional().nullable(),
  socialLinksJson: z.record(z.string().max(500)).optional(),
  tripadvisorAwardJson: z.record(z.any()).optional().nullable(),
  copyrightText: z.string().trim().min(3).max(255).optional(),
  googleSiteVerification: z.string().trim().max(255).optional().nullable(),
  analyticsId: z.string().trim().max(100).optional().nullable()
});

const updateMenuSchema = z.object({
  title: z.string().trim().min(1).max(120),
  itemsJson: z.array(z.any())
});

router.get(
  '/',
  requirePermission('settings:read'),
  asyncHandler(async (_req, res) => {
    const [settings, menus] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { id: 1 } }),
      prisma.navigationMenu.findMany({ orderBy: { id: 'asc' } })
    ]);
    return sendSuccess(res, { settings, menus, availableMenuLocations: MENU_LOCATIONS });
  })
);

router.patch(
  '/',
  requireCsrf,
  requirePermission('settings:write'),
  validate({ body: updateSettingsSchema }),
  asyncHandler(async (req, res) => {
    const data = { ...req.body };
    if (data.emailSecondary === '') data.emailSecondary = null;

    const settings = await prisma.siteSetting.update({
      where: { id: 1 },
      data
    });

    invalidateSettingsCache();

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE',
      entityType: 'SiteSetting',
      entityId: 1,
      summary: 'Updated global website settings',
      diffJson: Object.keys(data),
      req
    });

    return sendSuccess(res, { settings });
  })
);

router.put(
  '/menus/:location',
  requireCsrf,
  requirePermission('settings:write'),
  validate({ params: menuLocationParamSchema, body: updateMenuSchema }),
  asyncHandler(async (req, res) => {
    const menu = await prisma.navigationMenu.upsert({
      where: { location: req.params.location },
      update: {
        title: req.body.title,
        itemsJson: req.body.itemsJson
      },
      create: {
        location: req.params.location,
        title: req.body.title,
        itemsJson: req.body.itemsJson
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'UPDATE_MENU',
      entityType: 'NavigationMenu',
      entityId: menu.location,
      summary: `Updated navigation menu ${menu.location}`,
      req
    });

    return sendSuccess(res, { menu });
  })
);

module.exports = router;
