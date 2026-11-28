'use strict';

process.env.NODE_ENV = 'test';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const { createApp } = require('../app');
const { prisma, pgPool } = require('../db/prisma');

const app = createApp();

describe('Phase 3 CMS Content Modules: Packages, Destinations, Blogs, Pages, Reviews & SEO', () => {
  let adminAgent;
  let adminCsrf;
  const suffix = Date.now();
  let createdPackageId;
  let createdBlogId;
  let createdReviewId;
  let createdRedirectId;

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
    if (createdReviewId) await prisma.review.deleteMany({ where: { id: createdReviewId } });
    if (createdPackageId) await prisma.package.deleteMany({ where: { id: createdPackageId } });
    if (createdBlogId) await prisma.blogPost.deleteMany({ where: { id: createdBlogId } });
    if (createdRedirectId) await prisma.redirectRule.deleteMany({ where: { id: createdRedirectId } });
    await prisma.$disconnect();
    await pgPool.end();
  });

  it('creates, updates, publishes, and queries a Package with itinerary & SEO', async () => {
    const createRes = await adminAgent
      .post('/api/v1/admin/packages')
      .set('X-CSRF-Token', adminCsrf)
      .send({
        slug: `test-trek-${suffix}`,
        trekKey: `test_trek_${suffix}`,
        type: 'TREK',
        title: `Test Everest Ridge Trek ${suffix}`,
        durationDays: 10,
        maxAltitudeM: 4500,
        startingPriceUsd: 950,
        highlightsJson: ['Panoramic Himalayan sunrise', 'Authentic Sherpa villages'],
        itineraryDays: [
          { dayNumber: 1, title: 'Arrival in Kathmandu', altitudeM: 1400, descriptionHtml: '<p>Welcome to Nepal.</p>' }
        ],
        seo: { metaTitle: `Test Everest Ridge Trek ${suffix}`, metaDescription: 'A test trek description exceeding fifty characters for SEO audit verification.' }
      });

    assert.equal(createRes.statusCode, 201);
    createdPackageId = createRes.body.data.package.id;

    const patchRes = await adminAgent
      .patch(`/api/v1/admin/packages/${createdPackageId}`)
      .set('X-CSRF-Token', adminCsrf)
      .send({
        tripFactsJson: [{ category: 'DURATION', value: '10 Days', subtitle: 'Tea house trek' }],
        inclusionsJson: [{ title: 'Airport Transfers', text: 'Private car pickup and drop-off.' }],
        exclusionsJson: [{ title: 'International Flights', text: 'Flights to/from Nepal.' }],
        groupPricingJson: {
          intro: 'Group tier pricing.',
          tiers: [{ label: '2-4 People', price: 'USD 920', note: 'Small Group' }],
          sidebarTiers: [{ label: '2-4 People', price: 'USD 920 / person' }],
          sidebarBullets: ['Licensed Sherpa Guide']
        },
        packingListJson: {
          intro: 'Pack warm layers.',
          categories: [{ title: 'Clothing', items: [{ label: 'Down Jacket', desc: 'Warm parka', qty: '1 pc' }] }]
        },
        readBeforeBookJson: {
          title: 'Read Before You Book',
          items: [{ id: 'permits', title: 'Permits', contentHtml: '<p>TIMS and National Park permits required.</p>' }]
        },
        faqs: [{ category: 'GENERAL', question: 'Do I need a guide?', answerHtml: '<p>Yes, included.</p>', sortOrder: 0 }]
      });
    assert.equal(patchRes.statusCode, 200);
    assert.equal(patchRes.body.data.package.inclusionsJson.length, 1);

    const getRes = await adminAgent.get(`/api/v1/admin/packages/${createdPackageId}`);
    assert.equal(getRes.statusCode, 200);
    assert.equal(getRes.body.data.package.faqs.length, 1);
    assert.equal(getRes.body.data.package.packingListJson.categories.length, 1);

    const pubRes = await adminAgent
      .post(`/api/v1/admin/packages/${createdPackageId}/publish`)
      .set('X-CSRF-Token', adminCsrf);
    assert.equal(pubRes.statusCode, 200);
    assert.equal(pubRes.body.data.package.status, 'PUBLISHED');

    const catalogRes = await request(app).get('/api/v1/public/packages');
    assert.equal(catalogRes.statusCode, 200);
    assert.ok(catalogRes.body.data.packages.some((p) => p.id === createdPackageId));
  });

  it('creates and publishes a BlogPost with sanitized sections and word stats', async () => {
    const createRes = await adminAgent
      .post('/api/v1/admin/blogs')
      .set('X-CSRF-Token', adminCsrf)
      .send({
        slug: `test-blog-${suffix}`,
        title: `Test Trekking Guide ${suffix}`,
        h1: `Test Trekking Guide ${suffix}`,
        lead: 'Practical high altitude preparation guide.',
        sectionsJson: [
          { id: 'intro', h2: 'Introduction', content: '<p>Safe ascent matters.</p><script>alert(1)</script>' }
        ]
      });

    assert.equal(createRes.statusCode, 201);
    createdBlogId = createRes.body.data.post.id;
    const savedSec = createRes.body.data.post.sectionsJson[0].content;
    assert.ok(!savedSec.includes('<script>'));

    const pubRes = await adminAgent
      .post(`/api/v1/admin/blogs/${createdBlogId}/publish`)
      .set('X-CSRF-Token', adminCsrf);
    assert.equal(pubRes.statusCode, 200);
    assert.equal(pubRes.body.data.post.status, 'PUBLISHED');
  });

  it('moderates Reviews and audits SEO + Redirects', async () => {
    const revRes = await request(app)
      .post('/api/v1/public/reviews')
      .send({
        authorName: 'Mark Trekker',
        authorCountry: 'UK',
        rating: 5,
        body: 'Outstanding logistics and caring Sherpa guides throughout the journey!'
      });
    assert.equal(revRes.statusCode, 201);
    createdReviewId = revRes.body.data.review.id;

    const approveRes = await adminAgent
      .patch(`/api/v1/admin/reviews/${createdReviewId}`)
      .set('X-CSRF-Token', adminCsrf)
      .send({ status: 'APPROVED', isFeaturedHome: true });
    assert.equal(approveRes.statusCode, 200);

    const redirRes = await adminAgent
      .post('/api/v1/admin/seo/redirects')
      .set('X-CSRF-Token', adminCsrf)
      .send({
        fromPath: `/legacy-${suffix}`,
        toPath: `/trek/test-trek-${suffix}/`,
        statusCode: 301
      });
    assert.equal(redirRes.statusCode, 201);
    createdRedirectId = redirRes.body.data.redirect.id;

    const auditRes = await adminAgent.get('/api/v1/admin/seo/audit');
    assert.equal(auditRes.statusCode, 200);
    assert.ok(typeof auditRes.body.data.totalRecords === 'number');
  });
});
