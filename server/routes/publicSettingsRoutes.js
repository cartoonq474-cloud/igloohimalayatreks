'use strict';

const express = require('express');
const { prisma } = require('../db/prisma');
const { asyncHandler, sendSuccess } = require('../utils/http');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const [settings, menus] = await Promise.all([
      prisma.siteSetting.findUnique({
        where: { id: 1 },
        select: {
          companyName: true,
          legalName: true,
          tagline: true,
          phonePrimary: true,
          whatsappNumber: true,
          emailPrimary: true,
          emailSecondary: true,
          officeAddress: true,
          officeHours: true,
          geoLat: true,
          geoLng: true,
          socialLinksJson: true,
          tripadvisorAwardJson: true,
          copyrightText: true
        }
      }),
      prisma.navigationMenu.findMany({
        orderBy: { id: 'asc' },
        select: {
          location: true,
          title: true,
          itemsJson: true
        }
      })
    ]);

    return sendSuccess(res, { settings, menus });
  })
);

module.exports = router;
