'use strict';

process.env.NODE_ENV = 'test';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const { createApp } = require('../app');
const { prisma, pgPool } = require('../db/prisma');

const app = createApp();
const TEST_STAFF_EMAIL = `test-sales-${Date.now()}@igloohimalayatreks.com`;
const TEST_STAFF_PASSWORD = 'SalesStaff!2026';
const TEST_INQUIRY_EMAIL = `test-trekker-${Date.now()}@example.com`;

describe('Phase 1 Backend Foundation: Health, Auth, CSRF, RBAC & Public Inquiry', () => {
  let adminAgent;
  let adminCsrf;
  let salesRoleId;
  let createdUserId;
  let createdInquiryId;

  before(async () => {
    adminAgent = request.agent(app);
  });

  after(async () => {
    if (createdInquiryId) {
      await prisma.inquiry.deleteMany({ where: { id: createdInquiryId } });
    }
    if (createdUserId) {
      await prisma.auditLog.deleteMany({ where: { userId: createdUserId } });
      await prisma.user.deleteMany({ where: { id: createdUserId } });
    }
    await prisma.$disconnect();
    await pgPool.end();
  });

  it('GET /api/v1/health reports database connected', async () => {
    const res = await request(app).get('/api/v1/health');
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.database, 'connected');
  });

  it('rejects unauthenticated access to /api/v1/admin/auth/me and /api/v1/admin/users', async () => {
    const meRes = await request(app).get('/api/v1/admin/auth/me');
    assert.equal(meRes.statusCode, 401);

    const usersRes = await request(app).get('/api/v1/admin/users');
    assert.equal(usersRes.statusCode, 401);
  });

  it('rejects invalid login credentials with 401', async () => {
    const res = await request(app)
      .post('/api/v1/admin/auth/login')
      .send({
        email: process.env.SEED_ADMIN_EMAIL || 'admin@igloohimalayatreks.com',
        password: 'WrongPassword123!'
      });
    assert.equal(res.statusCode, 401);
    assert.equal(res.body.success, false);
  });

  it('logs in seeded Super Admin, sets session cookie, and returns CSRF token', async () => {
    const res = await adminAgent
      .post('/api/v1/admin/auth/login')
      .send({
        email: process.env.SEED_ADMIN_EMAIL || 'admin@igloohimalayatreks.com',
        password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026'
      });

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.csrfToken);
    assert.equal(res.body.data.user.role.name, 'SUPER_ADMIN');
    adminCsrf = res.body.data.csrfToken;

    const setCookies = res.headers['set-cookie'] || [];
    assert.ok(setCookies.some((c) => c.startsWith('iht_cms_sid=') && c.includes('HttpOnly')));
  });

  it('GET /api/v1/admin/dashboard/summary returns live seeded metrics', async () => {
    const res = await adminAgent.get('/api/v1/admin/dashboard/summary');
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.data.metrics.destinations.total >= 10, true);
    assert.equal(res.body.data.metrics.staff.active >= 1, true);
  });

  it('blocks state-changing admin requests without X-CSRF-Token', async () => {
    const rolesRes = await adminAgent.get('/api/v1/admin/roles');
    assert.equal(rolesRes.statusCode, 200);
    const salesRole = rolesRes.body.data.roles.find((r) => r.name === 'SALES_STAFF');
    assert.ok(salesRole);
    salesRoleId = salesRole.id;

    const res = await adminAgent
      .post('/api/v1/admin/users')
      .send({
        email: TEST_STAFF_EMAIL,
        fullName: 'Test Sales Staff',
        password: TEST_STAFF_PASSWORD,
        roleId: salesRoleId
      });

    assert.equal(res.statusCode, 403);
    assert.equal(res.body.error.code, 'CSRF_INVALID');
  });

  it('creates a SALES_STAFF user with valid CSRF and enforces RBAC on user management', async () => {
    const createRes = await adminAgent
      .post('/api/v1/admin/users')
      .set('X-CSRF-Token', adminCsrf)
      .send({
        email: TEST_STAFF_EMAIL,
        fullName: 'Test Sales Staff',
        title: 'Travel Consultant',
        password: TEST_STAFF_PASSWORD,
        roleId: salesRoleId
      });

    assert.equal(createRes.statusCode, 201);
    createdUserId = createRes.body.data.user.id;

    // Sign in as SALES_STAFF in a separate cookie jar
    const salesAgent = request.agent(app);
    const loginRes = await salesAgent
      .post('/api/v1/admin/auth/login')
      .send({ email: TEST_STAFF_EMAIL, password: TEST_STAFF_PASSWORD });
    assert.equal(loginRes.statusCode, 200);
    assert.equal(loginRes.body.data.user.role.name, 'SALES_STAFF');

    // SALES_STAFF does not have users:read -> 403 FORBIDDEN
    const forbiddenRes = await salesAgent.get('/api/v1/admin/users');
    assert.equal(forbiddenRes.statusCode, 403);
    assert.equal(forbiddenRes.body.error.code, 'FORBIDDEN');
  });

  it('POST /api/v1/public/inquiries validates and persists inquiries to PostgreSQL', async () => {
    const res = await request(app)
      .post('/api/v1/public/inquiries')
      .send({
        name: 'Jane Explorer',
        email: TEST_INQUIRY_EMAIL,
        phone: '+1 555 234 5678',
        travelersLabel: '2 Persons',
        subject: 'Inquiry: Everest Base Camp Trek — 14 Days',
        message: 'Looking for October 2026 private departure details.',
        source: 'MODAL'
      });

    assert.equal(res.statusCode, 201);
    assert.equal(res.body.success, true);
    assert.match(res.body.data.referenceCode, /^IHT-\d{4}-[A-F0-9]{6}$/);
    assert.ok(res.body.data.whatsappUrl.includes('wa.me/'));
    createdInquiryId = res.body.data.id;
  });

  it('POST /api/v1/admin/auth/logout destroys session', async () => {
    const logoutRes = await adminAgent
      .post('/api/v1/admin/auth/logout')
      .set('X-CSRF-Token', adminCsrf);
    assert.equal(logoutRes.statusCode, 200);

    const meAfter = await adminAgent.get('/api/v1/admin/auth/me');
    assert.equal(meAfter.statusCode, 401);
  });
});
