'use strict';

process.env.NODE_ENV = 'test';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { validateTrekHtml, validateBlogHtml, checkTagBalance } = require('../services/publishValidator');
const { renderCanonicalPackageHtml } = require('../services/trekTemplateRenderer');

const ROOT_DIR = path.resolve(__dirname, '..', '..');

describe('Phase 4 Publishing Engine & AGENTS.md Quality Validator', () => {
  it('renders a canonical trek page that passes all AGENTS.md checks and tag balance', () => {
    const samplePkg = {
      id: 999,
      slug: 'sample-himalayan-trek',
      trekKey: 'sample_himalayan_10',
      type: 'TREK',
      title: 'Sample Himalayan Ridge Trek',
      durationDays: 10,
      maxAltitudeM: 4250,
      startingPriceUsd: 985,
      heroSummary: 'A pristine ten-day Himalayan trek through Sherpa villages and alpine ridgelines.',
      highlightsJson: ['Walk beneath towering 8,000m snow peaks', 'Stay in authentic family-run teahouses'],
      itineraryDays: [
        { dayNumber: 1, title: 'Arrival in Kathmandu', altitudeM: 1400, descriptionHtml: '<p>Airport pickup and briefing.</p>' },
        { dayNumber: 2, title: 'Trek to High Camp', altitudeM: 3500, descriptionHtml: '<p>Scenic forest ascent.</p>' }
      ],
      faqs: [
        { question: 'Is a guide included?', answerHtml: '<p>Yes, a licensed Sherpa guide is included.</p>' }
      ],
      recommendations: [],
      galleries: [],
      seo: {
        metaTitle: 'Sample Himalayan Ridge Trek — 10 Days',
        metaDescription: 'Scenic 10-day Himalayan ridge trek with certified Sherpa guides.',
        canonicalUrl: 'https://www.igloohimalayatreks.com/trek/sample-himalayan-trek'
      }
    };

    const html = renderCanonicalPackageHtml(samplePkg, { whatsappNumber: '9779860843980' });
    const result = validateTrekHtml(html);
    assert.equal(result.valid, true, `Validation errors: ${result.errors.join('; ')}`);
    assert.equal(checkTagBalance(html).length, 0);
  });

  it('catches pre-footer ordering and inline FAQ display:none violations', () => {
    const badHtml = `
      <html><head><link rel="canonical" href="https://example.com"><script type="application/ld+json">{}</script></head>
      <body>
        <div data-trek-details-wrapper data-trek-key="x">
          <div id="section-overview"></div><div id="section-itinerary"></div><div id="section-reviews"></div><div id="section-faqs">
            <div class="faq-category-content" style="display: none;"></div>
          </div>
          <div class="trek-sidebar-col"><div class="sidebar-booking-card"></div></div>
        </div>
        <section class="you-might-like-section"></section>
        <div id="inquiry-modal"></div>
      </body></html>
    `;
    const result = validateTrekHtml(badHtml);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes('Pre-footer ordering violation')));
    assert.ok(result.errors.some((e) => e.includes('Rule 15 violation')));
  });

  it('verifies Gold Standard trek/everest-base-camp-trek/index.html has zero tag mismatches', () => {
    const ebcHtml = fs.readFileSync(path.join(ROOT_DIR, 'trek', 'everest-base-camp-trek', 'index.html'), 'utf8');
    const mismatches = checkTagBalance(ebcHtml);
    assert.equal(mismatches.length, 0);
    assert.equal(validateBlogHtml(fs.readFileSync(path.join(ROOT_DIR, 'blog', 'everest-base-camp-vs-annapurna-circuit', 'index.html'), 'utf8')).valid, true);
  });

  it('syncs all editable sections into existing tour and trek HTML while keeping AGENTS.md valid', () => {
    const { syncExistingPackageDom } = require('../services/publishService');

    const tourPath = path.join(ROOT_DIR, 'tour', 'one-day-kathmandu-city-tour', 'index.html');
    const rawTour = fs.readFileSync(tourPath, 'utf8');
    const syncedTour = syncExistingPackageDom(rawTour, {
      slug: 'one-day-kathmandu-city-tour',
      trekKey: 'one-day-kathmandu-city-tour',
      type: 'TOUR',
      title: 'Updated Kathmandu City Tour',
      durationDays: 1,
      maxAltitudeM: 1480,
      startingPriceUsd: 89,
      heroSummary: 'Updated sightseeing summary across five heritage sites.',
      tripFactsJson: [{ category: 'DURATION', value: '1 Full Day', subtitle: 'Private transport' }],
      highlightsJson: ['Highlight One Verified', 'Highlight Two Verified'],
      inclusionsJson: [{ title: 'Included Transport', text: 'Private AC vehicle all day.' }],
      exclusionsJson: [{ title: 'Lunch', text: 'Personal meals and drinks.' }],
      groupPricingJson: {
        intro: 'Request custom quote for your group size.',
        tiers: [{ label: '2-4 People', price: 'USD 89 / pp', note: 'Best Value' }],
        sidebarTiers: [{ label: '2-4 People', price: 'USD 89 / person' }],
        sidebarBullets: ['Private AC Car & Driver']
      },
      packingListJson: {
        intro: 'Bring light daypack.',
        categories: [{ title: 'Essentials', items: [{ label: 'Sun Hat', desc: 'UV protection', qty: '1 pc' }] }]
      },
      readBeforeBookJson: {
        title: 'Read Before You Book Updated',
        subtitle: 'Updated briefing intro.',
        items: [{ id: 'walk', title: 'Walking Access', contentHtml: '<p>Expect steps at Swayambhunath.</p>' }]
      },
      itineraryDays: [
        {
          dayNumber: 1,
          title: 'Five Heritage Sites Tour',
          subtitle: 'Full Day • 1,400 m',
          altitudeM: 1400,
          routeSummary: 'Durbar Square -> Patan',
          descriptionHtml: '<p>Full sightseeing route.</p>'
        }
      ],
      faqs: [{ category: 'GENERAL', question: 'Are entry fees included?', answerHtml: '<p>Yes, included.</p>' }],
      seo: { metaTitle: 'Updated Kathmandu City Tour — 1 Day', metaDescription: 'Updated SEO description.' }
    });

    const vTour = validateTrekHtml(syncedTour);
    assert.equal(vTour.valid, true, `Tour sync errors: ${vTour.errors.join('; ')}`);
    assert.equal(checkTagBalance(syncedTour).length, 0);
    assert.ok(syncedTour.includes('Updated Kathmandu City Tour'));
    assert.ok(syncedTour.includes('Highlight Two Verified'));
    assert.ok(syncedTour.includes('Included Transport'));
    assert.ok(syncedTour.includes('Private AC Car &amp; Driver') || syncedTour.includes('Private AC Car & Driver'));
    assert.ok(syncedTour.includes('Expect steps at Swayambhunath.'));
    assert.ok(syncedTour.includes('Are entry fees included?'));

    const ebcPath = path.join(ROOT_DIR, 'trek', 'everest-base-camp-trek', 'index.html');
    const rawEbc = fs.readFileSync(ebcPath, 'utf8');
    const syncedEbc = syncExistingPackageDom(rawEbc, {
      slug: 'everest-base-camp-trek',
      trekKey: 'everest_base_camp',
      type: 'TREK',
      title: 'Everest Base Camp Trek',
      durationDays: 14,
      maxAltitudeM: 5545,
      startingPriceUsd: 1499,
      highlightsJson: ['Reach Everest Base Camp at 5,364 m'],
      weatherProfileJson: {
        sectionTitle: 'Weather & Best Time Updated',
        seasonalTable: [{ season: 'Autumn', months: 'Sep-Nov', expect: 'Crisp mountain views' }]
      },
      seo: { metaTitle: 'Everest Base Camp Trek — 14 Days', metaDescription: 'Classic EBC trek.' }
    });
    const vEbc = validateTrekHtml(syncedEbc);
    assert.equal(vEbc.valid, true, `EBC sync errors: ${vEbc.errors.join('; ')}`);
    assert.ok(syncedEbc.includes('Weather &amp; Best Time Updated') || syncedEbc.includes('Weather & Best Time Updated'));
  });
});
