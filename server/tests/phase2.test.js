'use strict';

process.env.NODE_ENV = 'test';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const { createApp } = require('../app');
const { prisma, pgPool } = require('../db/prisma');

const app = createApp();

describe('Phase 2 Modules: Inquiries CRM, Media Library & Website Settings', () => {
  let adminAgent;
  let adminCsrf;
  let createdInquiryId;
  let createdMediaId;
  const uniquePublicId = `test-media/ebc-${Date.now()}`;

  before(async () => {
    adminAgent = request.agent(app);
    const loginRes = await adminAgent
      .post('/api/v1/admin/auth/login')
      .send({
        email: process.env.SEED_ADMIN_EMAIL || 'admin@igloohimalayatreks.com',
        password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026'
      });
    assert.equal(loginRes.statusCode, 200);
    adminCsrf = loginRes.body.data.csrfToken;
  });

  after(async () => {
    if (createdInquiryId) {
      await prisma.inquiry.deleteMany({ where: { id: createdInquiryId } });
    }
    if (createdMediaId) {
      await prisma.mediaAsset.deleteMany({ where: { id: createdMediaId } });
    }
    await prisma.$disconnect();
    await pgPool.end();
  });

  it('creates an inquiry via public API and manages status, notes, and CSV export in admin API', async () => {
    const pubRes = await request(app)
      .post('/api/v1/public/inquiries')
      .send({
        name: 'Phase Two Trekker',
        email: 'phase2-trekker@example.com',
        phone: '+9779800001122',
        travelersLabel: '3 Persons',
        subject: 'Inquiry: Manaslu Circuit Trek — 14 Days',
        message: 'Interested in autumn group departure.',
        source: 'CONTACT_PAGE'
      });
    assert.equal(pubRes.statusCode, 201);
    createdInquiryId = pubRes.body.data.id;

    const listRes = await adminAgent.get('/api/v1/admin/inquiries?q=Phase+Two+Trekker');
    assert.equal(listRes.statusCode, 200);
    assert.ok(listRes.body.data.inquiries.some((i) => i.id === createdInquiryId));

    const patchRes = await adminAgent
      .patch(`/api/v1/admin/inquiries/${createdInquiryId}`)
      .set('X-CSRF-Token', adminCsrf)
      .send({ status: 'QUOTED', priority: 'HIGH' });
    assert.equal(patchRes.statusCode, 200);
    assert.equal(patchRes.body.data.inquiry.status, 'QUOTED');

    const noteRes = await adminAgent
      .post(`/api/v1/admin/inquiries/${createdInquiryId}/notes`)
      .set('X-CSRF-Token', adminCsrf)
      .send({ noteText: 'Sent customized Manaslu itinerary PDF.' });
    assert.equal(noteRes.statusCode, 201);

    const csvRes = await adminAgent.get('/api/v1/admin/inquiries/export.csv');
    assert.equal(csvRes.statusCode, 200);
    assert.match(csvRes.headers['content-type'], /text\/csv/);
    assert.ok(csvRes.text.includes('Phase Two Trekker'));
  });

  it('registers, updates, lists, and deletes a MediaAsset record', async () => {
    const createRes = await adminAgent
      .post('/api/v1/admin/media')
      .set('X-CSRF-Token', adminCsrf)
      .send({
        cloudinaryPublicId: uniquePublicId,
        resourceType: 'IMAGE',
        secureUrl: '/images/hero-himalayas.webp',
        folder: 'test-media',
        title: 'Test Hero Himalayas',
        altText: 'Panoramic Himalayan peaks'
      });
    assert.equal(createRes.statusCode, 201);
    createdMediaId = createRes.body.data.asset.id;

    const patchRes = await adminAgent
      .patch(`/api/v1/admin/media/${createdMediaId}`)
      .set('X-CSRF-Token', adminCsrf)
      .send({ altText: 'Updated Himalayan panorama alt text' });
    assert.equal(patchRes.statusCode, 200);
    assert.equal(patchRes.body.data.asset.altText, 'Updated Himalayan panorama alt text');

    const delRes = await adminAgent
      .delete(`/api/v1/admin/media/${createdMediaId}`)
      .set('X-CSRF-Token', adminCsrf);
    assert.equal(delRes.statusCode, 200);
    createdMediaId = null;
  });

  it('reads and updates Website Settings and Navigation Menus', async () => {
    const getRes = await adminAgent.get('/api/v1/admin/settings');
    assert.equal(getRes.statusCode, 200);
    assert.equal(getRes.body.data.settings.id, 1);

    const originalHours = getRes.body.data.settings.officeHours;
    const patchRes = await adminAgent
      .patch('/api/v1/admin/settings')
      .set('X-CSRF-Token', adminCsrf)
      .send({ officeHours: 'Sun - Fri: 09:00 AM - 07:00 PM (NPT)' });
    assert.equal(patchRes.statusCode, 200);

    // Restore original value
    await adminAgent
      .patch('/api/v1/admin/settings')
      .set('X-CSRF-Token', adminCsrf)
      .send({ officeHours: originalHours });

    const pubSettings = await request(app).get('/api/v1/public/settings');
    assert.equal(pubSettings.statusCode, 200);
    assert.ok(pubSettings.body.data.settings.phonePrimary);
  });
});
