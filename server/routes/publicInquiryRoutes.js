'use strict';

const crypto = require('crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const env = require('../config/env');
const { asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { sendInquiryNotifications } = require('../services/mailService');

const router = express.Router();

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.isTest ? 100 : 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many inquiries submitted from this address. Please contact us directly on WhatsApp.'
    }
  }
});

const publicInquirySchema = z.object({
  name: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(80).optional().default('Not provided'),
  travelersLabel: z.string().trim().max(80).optional(),
  preferredDate: z.string().trim().max(120).optional(),
  subject: z.string().trim().min(3).max(255),
  message: z.string().trim().min(3).max(4000),
  packageSlug: z.string().trim().max(180).optional(),
  packageTitle: z.string().trim().max(255).optional(),
  source: z.enum(['MODAL', 'CONTACT_PAGE', 'CUSTOM_PLAN', 'WHATSAPP_CALLBACK']).optional().default('MODAL'),
  sourceUrl: z.string().trim().max(500).optional(),
  customPlanJson: z.record(z.any()).optional(),
  website: z.string().max(100).optional() // honeypot
});

function generateReferenceCode() {
  const year = new Date().getUTCFullYear();
  const suffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `IHT-${year}-${suffix}`;
}

router.post(
  '/',
  inquiryLimiter,
  validate({ body: publicInquirySchema }),
  asyncHandler(async (req, res) => {
    // Silent spam trap for bots filling hidden honeypot field
    if (req.body.website && req.body.website.trim().length > 0) {
      return sendSuccess(
        res,
        {
          received: true,
          referenceCode: generateReferenceCode()
        },
        201
      );
    }

    let linkedPackage = null;
    if (req.body.packageSlug) {
      linkedPackage = await prisma.package.findUnique({
        where: { slug: req.body.packageSlug },
        select: { id: true, title: true }
      });
    }

    const siteSetting = await prisma.siteSetting.findUnique({
      where: { id: 1 },
      select: { whatsappNumber: true }
    });
    const whatsappDigits = (siteSetting && siteSetting.whatsappNumber) || '9779860843980';

    const referenceCode = generateReferenceCode();
    const ipAddress =
      req.ip ||
      (req.headers['x-forwarded-for'] ? String(req.headers['x-forwarded-for']).split(',')[0].trim() : null);

    const created = await prisma.inquiry.create({
      data: {
        referenceCode,
        source: req.body.source,
        sourceUrl: req.body.sourceUrl || null,
        packageId: linkedPackage ? linkedPackage.id : null,
        packageTitleSnapshot: linkedPackage
          ? linkedPackage.title
          : req.body.packageTitle || req.body.subject.replace(/^Inquiry:\s*/i, '').trim(),
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        phone: req.body.phone && req.body.phone.trim() ? req.body.phone.trim() : 'Not provided',
        travelersLabel: req.body.travelersLabel || null,
        preferredDate: req.body.preferredDate || null,
        subject: req.body.subject,
        message: req.body.message,
        customPlanJson: req.body.customPlanJson || undefined,
        ipAddress
      }
    });

    // Dispatch email asynchronously without blocking response
    if (!env.isTest) {
      sendInquiryNotifications(created).catch(() => {});
    }

    const waText =
      `Namaste Igloo Himalaya Treks! Inquiry Ref: ${created.referenceCode}\n` +
      `Name: ${req.body.name}\n` +
      `Subject: ${req.body.subject}\n` +
      `Phone: ${created.phone}\n` +
      `Message: ${req.body.message}`;

    return sendSuccess(
      res,
      {
        id: created.id,
        referenceCode: created.referenceCode,
        createdAt: created.createdAt,
        whatsappUrl: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(waText)}`
      },
      201
    );
  })
);

module.exports = router;
