'use strict';

const fs = require('fs');
const { prisma } = require('../db/prisma');

let cachedSettings = null;
let cacheExpiresAt = 0;

function invalidateSettingsCache() {
  cachedSettings = null;
  cacheExpiresAt = 0;
}

async function getLiveSettings() {
  const now = Date.now();
  if (cachedSettings && now < cacheExpiresAt) {
    return cachedSettings;
  }
  try {
    const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });
    cachedSettings = s;
    cacheExpiresAt = now + 30 * 1000;
    return s;
  } catch (_err) {
    return null;
  }
}

/**
 * Applies live Website Settings (phone, WhatsApp, emails, office address, copyright)
 * onto served public HTML so Admin Website Settings changes take effect immediately.
 */
async function sendPublicHtmlFile(res, filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const s = await getLiveSettings();

  if (s) {
    if (s.phonePrimary) {
      const telDigits = s.phonePrimary.replace(/[^\d+]/g, '');
      html = html
        .replace(/href="tel:\+9779860843980"/g, `href="tel:${telDigits}"`)
        .replace(/\+977\s*9860843980/g, s.phonePrimary);
    }
    if (s.whatsappNumber) {
      const waDigits = s.whatsappNumber.replace(/\D/g, '');
      html = html.replace(/https:\/\/wa\.me\/9779860843980/g, `https://wa.me/${waDigits}`);
    }
    if (s.emailPrimary) {
      html = html.replace(/info@igloohimalayatreks\.com/g, s.emailPrimary);
    }
    if (s.emailSecondary) {
      html = html.replace(/igloohimalayatreks@gmail\.com/g, s.emailSecondary);
    }
    if (s.officeAddress) {
      html = html.replace(/Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu, Nepal/g, s.officeAddress);
    }
    if (s.copyrightText) {
      html = html.replace(/©\s*2026\s*Igloo Himalaya Treks\.\s*All rights reserved\./g, s.copyrightText);
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  return res.status(200).send(html);
}

module.exports = {
  invalidateSettingsCache,
  sendPublicHtmlFile
};
