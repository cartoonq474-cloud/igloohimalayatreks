'use strict';

const fs = require('fs');
const path = require('path');
const { generateMobileAccordion, generateMegaMenu, generateTourDropdown } = require('../../scripts/menu_generators');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const FAQ_CAT_DEFAULTS = [
  { enumKey: 'GENERAL', domKey: 'general', label: 'General & Route' },
  { enumKey: 'GEAR', domKey: 'gear', label: 'Gear & Porters' },
  { enumKey: 'HEALTH', domKey: 'health', label: 'Health & Altitude' },
  { enumKey: 'BOOKING', domKey: 'booking', label: 'Booking & Solo Trekkers' }
];

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripTags(str) {
  return String(str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toRelMedia(raw, prefix = '../../') {
  if (!raw) return `${prefix}images/hero-himalayas.webp`;
  const s = String(raw).trim();
  if (/^https?:\/\//i.test(s) || s.startsWith('data:')) return s;
  return `${prefix}${s.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '').replace(/^\/+/, '')}`;
}

function cleanDayTitle(rawTitle) {
  return String(rawTitle || '')
    .replace(/^Day\s+\d+\s*[:–—-]*\s*/i, '')
    .replace(/^[:–—-]+\s*/, '')
    .trim() || String(rawTitle || '').trim();
}

function getFooterMarkup(prefix = '../../') {
  try {
    const refHtml = fs.readFileSync(path.join(ROOT_DIR, 'trek', 'everest-base-camp-trek', 'index.html'), 'utf8');
    const footerMatch = refHtml.match(/<footer class="himalayan-ref-footer"[\s\S]*?<\/footer>/);
    if (footerMatch) {
      return prefix === '../../' ? footerMatch[0] : footerMatch[0].replace(/\.\.\//g, prefix);
    }
  } catch (_err) {
    // fallback minimal footer
  }
  return '<footer class="himalayan-ref-footer" role="contentinfo"><div class="container"><p>&copy; 2026 Igloo Himalaya Treks. All rights reserved.</p></div></footer>';
}

const STAR_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
const GOLD_STAR_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
const CHECK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const X_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

function buildTripFactIcon(category) {
  const c = String(category || '').toLowerCase();
  if (c.includes('alt') || c.includes('elev')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>';
  }
  if (c.includes('diff') || c.includes('grade') || c.includes('fit')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>';
  }
  if (c.includes('accomm') || c.includes('stay') || c.includes('lodge') || c.includes('hotel')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  }
  if (c.includes('meal') || c.includes('food')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>';
  }
  if (c.includes('season') || c.includes('time') || c.includes('month')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  }
  if (c.includes('start') || c.includes('end') || c.includes('region') || c.includes('route')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
  }
  return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
}

function buildMetaItemHtml(badgeBg, badgeColor, svgInner, label, value) {
  if (!value) return '';
  return `
    <div class="itinerary-meta-box-item">
      <div class="itinerary-meta-box-badge" style="background: ${badgeBg}; color: ${badgeColor};">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${svgInner}</svg>
      </div>
      <div style="display: flex; flex-direction: column; min-width: 0;">
        <span style="font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748B; font-weight: 700; line-height: 1.2; margin-bottom: 3px;">${escapeHtml(label)}</span>
        <span style="font-size: 0.93rem; color: #0E3458; font-weight: 600; line-height: 1.4;">${escapeHtml(value)}</span>
      </div>
    </div>`;
}

function buildAltitudeRuntimeData(pkg, itineraryDays) {
  const altObj = (pkg.altitudeProfileJson && typeof pkg.altitudeProfileJson === 'object') ? pkg.altitudeProfileJson : {};
  let points = Array.isArray(altObj.points) ? altObj.points.filter((p) => p && Number.isFinite(Number(p.altitudeM))) : [];
  if (points.length === 0 && itineraryDays.length > 0) {
    points = itineraryDays.map((d) => ({
      day: `Day ${d.dayNumber}`,
      spot: cleanDayTitle(d.title).slice(0, 28),
      altitudeM: d.altitudeM || 1400,
      altitudeFt: Math.round((d.altitudeM || 1400) * 3.28084)
    }));
  }
  if (points.length === 0) {
    const maxM = pkg.maxAltitudeM || 2500;
    points = [
      { day: 'Start', spot: 'Kathmandu', altitudeM: 1400, altitudeFt: 4593 },
      { day: 'High Point', spot: pkg.title.slice(0, 24), altitudeM: maxM, altitudeFt: Math.round(maxM * 3.28084) },
      { day: 'Return', spot: 'Kathmandu', altitudeM: 1400, altitudeFt: 4593 }
    ];
  }
  return {
    name: `${pkg.title} (${pkg.durationDays} ${pkg.durationDays === 1 ? 'Day' : 'Days'})`,
    points
  };
}

function buildWeatherRuntimeData(pkg, itineraryDays) {
  const wObj = (pkg.weatherProfileJson && typeof pkg.weatherProfileJson === 'object') ? pkg.weatherProfileJson : {};
  if (Array.isArray(wObj.baseDailyData) && wObj.baseDailyData.length > 0 && wObj.monthData) {
    return wObj;
  }
  const days = itineraryDays.length > 0
    ? itineraryDays
    : Array.from({ length: Math.min(pkg.durationDays || 5, 14) }, (_, idx) => ({
        dayNumber: idx + 1,
        altitudeM: pkg.maxAltitudeM && idx === Math.floor((pkg.durationDays || 5) / 2) ? pkg.maxAltitudeM : 1400
      }));
  const baseDailyData = days.map((d) => {
    const alt = d.altitudeM || 1400;
    const cooling = Math.round(Math.max(0, alt - 1400) / 1000 * 6);
    const min = Math.max(-14, 10 - cooling);
    const max = Math.max(-2, 23 - cooling);
    return {
      label: `Day ${d.dayNumber} (${alt.toLocaleString()} m)`,
      min,
      max
    };
  });
  return {
    regionTitle: (pkg.destination && pkg.destination.name) || `${pkg.title} Route`,
    baseDailyData,
    monthData: [
      { month: 'Jan', min: -2, max: 14 },
      { month: 'Feb', min: 0, max: 16 },
      { month: 'Mar', min: 4, max: 20 },
      { month: 'Apr', min: 8, max: 23 },
      { month: 'May', min: 11, max: 25 },
      { month: 'Jun', min: 14, max: 26 },
      { month: 'Jul', min: 15, max: 25 },
      { month: 'Aug', min: 15, max: 25 },
      { month: 'Sep', min: 13, max: 24 },
      { month: 'Oct', min: 8, max: 22 },
      { month: 'Nov', min: 3, max: 18 },
      { month: 'Dec', min: -1, max: 15 }
    ]
  };
}

/**
 * Renders a complete Gold-Standard Trek/Tour HTML page from a Prisma Package record
 * obeying all 19 AGENTS.md structural, SEO, JS-hook, and CSS-class rules.
 */
function renderCanonicalPackageHtml(pkg, siteSetting) {
  const prefix = '../../';
  const routeFolder = pkg.type === 'TOUR' ? 'tour' : 'trek';
  const dayLabel = `${pkg.durationDays} ${pkg.durationDays === 1 ? 'Day' : 'Days'}`;
  const fullDisplayTitle = `${pkg.title} — ${dayLabel}`;
  const rawCanonical = pkg.seo && pkg.seo.canonicalUrl ? String(pkg.seo.canonicalUrl).trim() : '';
  const canonicalUrl = /^https?:\/\/.+/i.test(rawCanonical)
    ? rawCanonical
    : `https://www.igloohimalayatreks.com/${routeFolder}/${pkg.slug}/`;
  const metaTitle = (pkg.seo && pkg.seo.metaTitle) || `${pkg.title} — ${dayLabel} — Igloo Himalaya Treks`;
  const metaDesc = (pkg.seo && pkg.seo.metaDescription) || pkg.heroSummary || `${pkg.title} (${dayLabel}) with Igloo Himalaya Treks.`;
  const priceNum = Number(pkg.startingPriceUsd || 995);
  const whatsappDigits = (siteSetting && siteSetting.whatsappNumber) || '9779860843980';
  const waPrefill = encodeURIComponent(`Hello Igloo Himalaya Treks, I would like to inquire about ${fullDisplayTitle}.`);

  const galleries = Array.isArray(pkg.galleries) ? pkg.galleries : [];
  const findGal = (slot, fallbackIdx) => galleries.find((g) => g.slot === slot) || galleries[fallbackIdx] || null;
  const resolveGalImg = (gal) => {
    const raw = gal && gal.media ? (gal.media.legacyLocalPath || gal.media.secureUrl) : '';
    return raw ? toRelMedia(raw, prefix) : `${prefix}images/hero-himalayas.webp`;
  };
  const mainGal = findGal('HERO_MAIN', 0);
  const heroImgs = [
    { src: resolveGalImg(mainGal), alt: (mainGal && (mainGal.caption || mainGal.media?.altText)) || `${pkg.title} Panoramic View` },
    ...(['HERO_TILE_1', 'HERO_TILE_2', 'HERO_TILE_3', 'HERO_TILE_4'].map((slot, i) => {
      const g = findGal(slot, i + 1);
      return {
        src: resolveGalImg(g),
        alt: (g && (g.caption || g.media?.altText)) || `${pkg.title} Trail Highlight ${i + 1}`
      };
    }))
  ];

  const mainRawImg = mainGal && mainGal.media ? (mainGal.media.legacyLocalPath || mainGal.media.secureUrl) : 'images/hero-himalayas.webp';
  const ogImage = mainRawImg.startsWith('http')
    ? mainRawImg
    : `https://www.igloohimalayatreks.com/${mainRawImg.replace(/^\/+/, '')}`;

  const tagsMeta = pkg.tagsJson && typeof pkg.tagsJson === 'object' && !Array.isArray(pkg.tagsJson) ? pkg.tagsJson : {};
  const itineraryDays = Array.isArray(pkg.itineraryDays) ? pkg.itineraryDays : [];
  const highlights = Array.isArray(pkg.highlightsJson) && pkg.highlightsJson.length > 0
    ? pkg.highlightsJson
    : [`Guided ${pkg.durationDays}-day Himalayan journey led by certified Sherpa professionals.`];

  const tripFacts = Array.isArray(pkg.tripFactsJson) && pkg.tripFactsJson.length > 0
    ? pkg.tripFactsJson
    : [
        { category: 'DURATION', value: dayLabel, subtitle: 'Full itinerary schedule' },
        { category: 'DIFFICULTY', value: pkg.difficulty || 'MODERATE', subtitle: 'Mountain trail grade' },
        ...(pkg.maxAltitudeM ? [{ category: 'MAX ALTITUDE', value: `${pkg.maxAltitudeM.toLocaleString()} m / ${Math.round(pkg.maxAltitudeM * 3.28084).toLocaleString()} ft`, subtitle: 'Highest route elevation', altitudeM: pkg.maxAltitudeM }] : []),
        { category: 'TRIP TYPE', value: pkg.type === 'TOUR' ? 'Guided Tour' : 'Himalayan Trek', subtitle: 'Private & group options' },
        { category: 'ACCOMMODATION', value: 'Hotel & Mountain Lodge', subtitle: 'Selected comfortable stays' },
        { category: 'BEST SEASON', value: 'Spring & Autumn', subtitle: 'Mar–May & Sep–Nov' }
      ];

  const inclusions = Array.isArray(pkg.inclusionsJson) ? pkg.inclusionsJson : [];
  const exclusions = Array.isArray(pkg.exclusionsJson) ? pkg.exclusionsJson : [];
  const pricing = (pkg.groupPricingJson && !Array.isArray(pkg.groupPricingJson)) ? pkg.groupPricingJson : {};
  const sidebarTiers = Array.isArray(pricing.sidebarTiers) && pricing.sidebarTiers.length > 0
    ? pricing.sidebarTiers
    : [
        { label: '1 Person (Solo)', price: `USD ${Math.round(priceNum * 1.1).toLocaleString()} / person` },
        { label: '2–4 People', price: `USD ${priceNum.toLocaleString()} / person` },
        { label: '5+ People', price: `USD ${Math.round(priceNum * 0.92).toLocaleString()} / person` }
      ];
  const sidebarBullets = Array.isArray(pricing.sidebarBullets) && pricing.sidebarBullets.length > 0
    ? pricing.sidebarBullets
    : [
        'Licensed Local Sherpa Guide & Safety Support',
        'Hassle-Free & Instant Confirmation',
        'Transparent Pricing — No Hidden Costs',
        'All Required National Park & Trail Permits',
        'Customizable Schedule for Private Groups'
      ];
  const priceTiers = Array.isArray(pricing.tiers) ? pricing.tiers : [];
  const priceTableRows = Array.isArray(pricing.tableRows) ? pricing.tableRows : [];
  const departures = Array.isArray(pkg.departureDatesJson) ? pkg.departureDatesJson : [];

  const packing = (pkg.packingListJson && typeof pkg.packingListJson === 'object' && !Array.isArray(pkg.packingListJson))
    ? pkg.packingListJson
    : { intro: '', bannerTitle: '', bannerDesc: '', concludingNote: '', categories: [] };
  const packingCats = Array.isArray(packing.categories) ? packing.categories : [];
  const totalPackingItems = packingCats.reduce((acc, c) => acc + (Array.isArray(c.items) ? c.items.length : 0), 0);

  const readBefore = (pkg.readBeforeBookJson && typeof pkg.readBeforeBookJson === 'object' && !Array.isArray(pkg.readBeforeBookJson))
    ? pkg.readBeforeBookJson
    : { title: `Read Before You Book — ${pkg.title}`, subtitle: 'Essential logistical, acclimatisation, permit, and booking guidelines for your journey.', secondarySubtitle: '', items: Array.isArray(pkg.readBeforeBookJson) ? pkg.readBeforeBookJson : [] };
  const detailTopics = Array.isArray(readBefore.items) ? readBefore.items : [];

  const altObj = (pkg.altitudeProfileJson && typeof pkg.altitudeProfileJson === 'object') ? pkg.altitudeProfileJson : {};
  const overnightTable = Array.isArray(altObj.overnightTable) && altObj.overnightTable.length > 0
    ? altObj.overnightTable
    : itineraryDays.map((d) => ({ day: `Day ${d.dayNumber}`, stop: cleanDayTitle(d.title), altitude: d.altitudeM ? `${d.altitudeM.toLocaleString()} m` : '1,400 m' }));
  const higherPlaces = Array.isArray(altObj.higherPlaces) ? altObj.higherPlaces : [];

  const weatherObj = (pkg.weatherProfileJson && typeof pkg.weatherProfileJson === 'object') ? pkg.weatherProfileJson : {};
  const seasonCards = Array.isArray(weatherObj.seasonCards) && weatherObj.seasonCards.length > 0
    ? weatherObj.seasonCards
    : [
        { tag: 'Peak Visibility', season: 'Autumn (Sep–Nov)', rangeDesc: 'Crisp blue skies & festive trails' },
        { tag: 'Wildflowers', season: 'Spring (Mar–May)', rangeDesc: 'Rhododendrons & pleasant days' },
        { tag: 'Peaceful Trails', season: 'Winter (Dec–Feb)', rangeDesc: 'Quiet lodges & golden sunsets' },
        { tag: 'Lush Valleys', season: 'Monsoon (Jun–Aug)', rangeDesc: 'Green hills & rainshadow options' }
      ];
  const seasonalTable = Array.isArray(weatherObj.seasonalTable) ? weatherObj.seasonalTable : [];

  const routeMapUrl = (pkg.routeMapMedia && (pkg.routeMapMedia.legacyLocalPath || pkg.routeMapMedia.secureUrl))
    || (tagsMeta.routeMap && tagsMeta.routeMap.imageUrl) || '';

  const whyBookCards = Array.isArray(tagsMeta.whyBookCards) ? tagsMeta.whyBookCards : [];
  const bookingBanner = tagsMeta.bookingBanner || {};
  const bottomCta = tagsMeta.bottomCta || {};

  const faqs = Array.isArray(pkg.faqs) ? pkg.faqs : [];
  const faqCatMeta = Array.isArray(tagsMeta.faqCategories) && tagsMeta.faqCategories.length > 0 ? tagsMeta.faqCategories : FAQ_CAT_DEFAULTS;
  const recommendations = Array.isArray(pkg.recommendations) ? pkg.recommendations : [];

  const altRuntime = buildAltitudeRuntimeData(pkg, itineraryDays);
  const weatherRuntime = buildWeatherRuntimeData(pkg, itineraryDays);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        '@id': `${canonicalUrl}#trip`,
        name: fullDisplayTitle,
        description: metaDesc,
        touristType: ['Hikers', 'Trekking Enthusiasts'],
        subTrip: itineraryDays.map((d) => ({
          '@type': 'TouristTrip',
          name: `Day ${d.dayNumber}: ${cleanDayTitle(d.title)}`
        })),
        offers: {
          '@type': 'Offer',
          price: String(priceNum),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: canonicalUrl
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.igloohimalayatreks.com/' },
          { '@type': 'ListItem', position: 2, name: pkg.title, item: canonicalUrl }
        ]
      }
    ]
  };

  if (faqs.length > 0) {
    jsonLd['@graph'].push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: stripTags(f.answerHtml)
        }
      }))
    });
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metaTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
  <link rel="icon" type="image/png" href="${prefix}images/favicon.png?v=3">
  <link rel="apple-touch-icon" href="${prefix}images/apple-touch-icon.png?v=3">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:title" content="${escapeHtml(metaTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${escapeHtml(ogImage)}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap">
  <link rel="stylesheet" href="${prefix}index.css?v=40">
</head>
<body>
  <header class="main-header header-solid">
    <div class="container flex-between">
      <a href="${prefix}index.html" class="logo-brand" aria-label="Igloo Himalaya Treks">
        <img src="${prefix}images/logo.png" alt="Igloo Himalaya Treks" width="85" height="70" style="height: 70px; width: auto; object-fit: contain;" loading="eager">
      </a>
      <nav>
        <ul class="nav-menu">
          <li class="nav-item-dropdown mega-nav-item">
            <div class="nav-link-row">
              <a href="${prefix}nepal-trekking-packages/" class="nav-link">All Treks <span class="nav-link-arrow-desktop">&#9662;</span></a>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle All Treks submenu">&#9662;</button>
            </div>
            ${generateMobileAccordion(prefix)}
            ${generateMegaMenu(prefix)}
          </li>
          <li class="nav-item-dropdown">
            <div class="nav-link-row">
              <a href="${prefix}nepal-tour-packages/" class="nav-link">Tours <span class="nav-link-arrow-desktop">&#9662;</span></a>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle Tours submenu">&#9662;</button>
            </div>
            ${generateTourDropdown(prefix)}
          </li>
          <li class="nav-item-dropdown">
            <div class="nav-link-row">
              <a href="${prefix}nepal-travel-guide/" class="nav-link">Travel Guide <span class="nav-link-arrow-desktop">&#9662;</span></a>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle Travel Guide submenu">&#9662;</button>
            </div>
            <div class="nav-dropdown-menu">
              <a href="${prefix}nepal-travel-guide/" class="nav-dropdown-link">Nepal Travel Guide</a>
              <a href="${prefix}nepal-visa/" class="nav-dropdown-link">Nepal Visa</a>
              <a href="${prefix}equipment-checklist/" class="nav-dropdown-link">Equipment Checklist</a>
              <a href="${prefix}travel-insurance/" class="nav-dropdown-link">Travel Insurance</a>
              <a href="${prefix}recommended-medical-kit/" class="nav-dropdown-link">Recommended Medical Kit</a>
            </div>
          </li>
          <li class="nav-item-dropdown">
            <div class="nav-link-row">
              <span class="nav-link">Company Info <span class="nav-link-arrow-desktop">&#9662;</span></span>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle Company Info submenu">&#9662;</button>
            </div>
            <div class="nav-dropdown-menu">
              <a href="${prefix}about-us/" class="nav-dropdown-link">About Us</a>
              <a href="${prefix}team.html" class="nav-dropdown-link">Meet Our Team</a>
              <a href="${prefix}legal-documents.html" class="nav-dropdown-link">Legal Documents &amp; Licenses</a>
              <a href="${prefix}reviews.html" class="nav-dropdown-link">Reviews &amp; Testimonials</a>
              <a href="${prefix}custom-plan.html" class="nav-dropdown-link">Tailor-Made Trip Planner</a>
            </div>
          </li>
          <li><a href="${prefix}blog/" class="nav-link">Blog</a></li>
          <li><a href="${prefix}contact-us/" class="nav-link">Contact</a></li>
          <li class="mobile-nav-drawer-actions">
            <button type="button" class="btn btn-primary open-inquiry-btn mobile-drawer-cta">Plan Custom Trip</button>
          </li>
        </ul>
      </nav>
      <div class="header-cta-desktop">
        <button type="button" class="btn btn-primary open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}">Book Custom Trip</button>
      </div>
      <div class="mobile-header-actions">
        <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener" class="mobile-quick-whatsapp" aria-label="Chat on WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
        </a>
        <button type="button" class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </div>
    </div>
  </header>

  <main>
    <article itemscope itemtype="https://schema.org/TouristTrip">
      <!-- Hero Title & Badges -->
      <section style="padding: 30px 0 12px 0; background: var(--color-neutral-50);">
        <div class="container">
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 12px;">
            <span class="pill pill-copper" style="margin-bottom: 0;">${escapeHtml(pkg.destination ? pkg.destination.name : 'Nepal Himalayas')} &bull; ${escapeHtml(pkg.difficulty || 'MODERATE')}</span>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 100px; padding: 4px 12px; font-size: 0.85rem; color: #475569; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; background: #00af87; border-radius: 50%;">
                <svg viewBox="0 0 24 24" fill="#ffffff" width="11" height="11"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </span>
              <span style="font-weight: 700; color: #0E3458;">5.0</span>
              <span>reviews on <strong style="color: #0E3458;">TripAdvisor</strong></span>
            </div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 100px; padding: 4px 12px; font-size: 0.85rem; color: #475569; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <span style="font-weight: 700; color: #0E3458;">5.0</span>
              <span style="display: inline-flex; gap: 1px;">${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}</span>
              <span><strong style="color: #0E3458;">169</strong> Google reviews</span>
            </div>
          </div>

          <h1 class="trek-hero-title" itemprop="name" style="font-size: clamp(1.85rem, 3.8vw, 2.8rem); margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">${escapeHtml(pkg.title)} &mdash; ${escapeHtml(dayLabel)}</h1>
          <p itemprop="description" style="font-size: 1.12rem; color: var(--color-neutral-600); line-height: 1.7; margin-top: 12px; margin-bottom: 0; max-width: 960px;">${escapeHtml(pkg.heroSummary || metaDesc)}</p>
        </div>
      </section>

      <!-- Multi-Image Hero Bento Gallery -->
      <div class="container" style="margin-bottom: 24px;">
        <div class="trek-gallery-collage">
          <div class="trek-gallery-main">
            <img src="${escapeHtml(heroImgs[0].src)}" alt="${escapeHtml(heroImgs[0].alt)}" loading="eager" fetchpriority="high">
            <div class="trek-gallery-badge">
              <div class="trek-gallery-badge-icon" style="background: #00af87; display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <div class="trek-gallery-badge-text">
                <span>Travelers' Choice</span>
                <span>Best of the Best 2026</span>
              </div>
            </div>
            <button class="trek-gallery-see-all-mobile-btn" type="button" aria-label="See all photos">
              <span>See all photos</span>
            </button>
          </div>
          ${heroImgs.slice(1, 5).map((img, i) => `
            <div class="trek-gallery-sub ${i === 1 ? 'trek-gallery-sub-top-right' : (i === 3 ? 'trek-gallery-sub-bottom-right' : '')}">
              <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy">
              ${i === 1 ? `<button class="trek-gallery-see-all-btn" type="button" aria-label="See all photos"><span>See all photos</span></button>` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Key Trip Facts Grid -->
      <div class="container" style="margin-bottom: 30px;">
        <div style="background: #ffffff; border: 1px solid var(--color-neutral-100, #E2E8F0); border-radius: var(--radius-md, 14px); box-shadow: var(--shadow-sm); padding: 24px 30px;">
          <h3 style="font-size: 1.3rem; margin-bottom: 24px; color: var(--color-primary-navy, #0E3458); display: flex; align-items: center; gap: 8px; font-weight: 700;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
            Key Trip Facts
          </h3>
          <div class="trek-facts-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 22px 20px;">
            ${tripFacts.map((fact) => `
              <div class="trip-fact-item" style="display: flex; align-items: center; gap: 14px;">
                <div style="width: 42px; height: 42px; background: #F2F4F6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  ${buildTripFactIcon(fact.category)}
                </div>
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-500, #64748B); font-weight: 700;">${escapeHtml(fact.category)}</span>
                  <span ${fact.altitudeM ? `data-altitude-m="${fact.altitudeM}"` : ''} style="font-size: 0.98rem; color: var(--color-neutral-800, #0E3458); font-weight: 700;">${escapeHtml(fact.value)}</span>
                  ${fact.subtitle ? `<span style="font-size: 0.8rem; color: #64748B; margin-top: 2px; line-height: 1.35;">${escapeHtml(fact.subtitle)}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Sticky Scroll-Spy Sub-Navigation -->
      <div class="trek-sub-nav">
        <div class="container">
          <div class="trek-sub-nav-list">
            <button type="button" class="trek-sub-nav-btn active" data-tab="overview">Overview</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="itinerary">Itinerary</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="includes">Includes &amp; Excludes</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="dates">Dates &amp; Prices</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="packing">Packing List</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="details">Read Before Book</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="altitude-profile">Elevation</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="weather">Weather</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="reviews">Reviews</button>
            <button type="button" class="trek-sub-nav-btn" data-tab="faqs">FAQs</button>
          </div>
        </div>
      </div>

      <!-- Main 2-Column Content & Sticky Sidebar -->
      <section class="section-padding" style="padding-top: 18px;" data-trek-details-wrapper data-trek-key="${escapeHtml(pkg.trekKey)}">
        <div class="container trek-detail-layout" style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 40px; align-items: stretch; position: relative;">
          <div style="min-width: 0;">

            <!-- Section 1: Overview & Highlights -->
            <section id="section-overview" class="trek-detail-section">
              <div class="rte-overview-content" data-rte-overview>${pkg.overviewHtml || `<p>${escapeHtml(metaDesc)}</p>`}</div>

              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 26px 0 30px;">
                <h2 style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; color: #0E3458;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F6851F" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>${escapeHtml(pkg.title)} Highlights</span>
                </h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px;">
                  ${highlights.map((h) => `
                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                      <span style="width: 24px; height: 24px; border-radius: 50%; background: #ECFDF5; border: 1px solid #10B981; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">${CHECK_SVG}</span>
                      <span style="font-size: 0.98rem; color: #334155; line-height: 1.55; font-weight: 500;">${escapeHtml(h)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              ${whyBookCards.length > 0 ? `
                <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #E2E8F0;">
                  <div style="border-left: 4px solid #F6851F; padding-left: 14px; margin-bottom: 16px;">
                    <h3 style="font-size: 1.4rem; margin: 0; color: #0E3458; font-weight: 700;">${escapeHtml(tagsMeta.whyBookTitle || `Why Book ${pkg.title} with Igloo Himalaya Treks?`)}</h3>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px;">
                    ${whyBookCards.map((c) => `
                      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 20px; box-shadow: 0 2px 8px rgba(15,23,42,0.03);">
                        <h4 style="font-size: 1.04rem; font-weight: 700; color: #0E3458; margin: 0 0 8px 0;">${escapeHtml(c.title)}</h4>
                        <p style="font-size: 0.92rem; color: #64748B; margin: 0; line-height: 1.55;">${escapeHtml(c.desc)}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </section>

            <!-- Section 2: Day-by-Day Itinerary -->
            <section id="section-itinerary" class="trek-detail-section">
              <div class="itinerary-header-bar">
                <div>
                  <h2 class="trek-section-title" style="margin-bottom: 6px;">${escapeHtml(pkg.title)} Itinerary — Day by Day</h2>
                  <div style="width: 48px; height: 4px; background: var(--color-copper-orange, #F6851F); border-radius: 2px; margin-top: 8px;"></div>
                </div>
                <div class="itinerary-actions-wrapper">
                  <button id="toggle-all-itinerary" class="itinerary-toggle-all-btn" type="button">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    <span>Expand All Days</span>
                  </button>
                  <button id="itinerary-download-pdf-btn" class="itinerary-header-action-btn itinerary-pdf-trigger" type="button" onclick="window.handleItineraryPDFAction && window.handleItineraryPDFAction(this, event);">Download PDF</button>
                </div>
              </div>
              <div class="itinerary-timeline" style="border-left: 2px solid #E2E8F0; padding-left: 20px;">
                ${itineraryDays.map((d, idx) => {
                  const titleText = cleanDayTitle(d.title);
                  const subParts = [d.subtitle, d.altitudeM ? `${d.altitudeM.toLocaleString()} m` : '', d.durationHours].filter(Boolean);
                  return `
                    <div class="itinerary-card ${idx === 0 ? 'active' : ''}" data-day="${d.dayNumber}" style="overflow: visible !important;">
                      <div class="itinerary-header">
                        <div class="itinerary-header-left">
                          <h4 class="itinerary-day-title-new"><span class="day-label">Day ${d.dayNumber}:</span> ${escapeHtml(titleText)}</h4>
                          <p class="itinerary-day-subtitle-new" ${d.altitudeM ? `data-altitude-m="${d.altitudeM}"` : ''}>${escapeHtml(subParts.join(' • ') || 'Full trail schedule')}</p>
                        </div>
                        <div class="itinerary-header-right">
                          <div class="itinerary-toggle-btn-new">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                          </div>
                        </div>
                      </div>
                      <div class="itinerary-content">
                        <div class="itinerary-content-inner">
                          ${(d.routeSummary || d.activityType || d.durationHours || d.distanceKm || d.accommodation || d.meals) ? `
                            <div class="itinerary-meta-box">
                              ${buildMetaItemHtml('#FAF5FF', '#7C3AED', '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', 'ROUTE', d.routeSummary)}
                              ${buildMetaItemHtml('#EFF6FF', '#1D4ED8', '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>', 'MAIN ACTIVITY', d.activityType)}
                              ${buildMetaItemHtml('#EEF2FF', '#4F46E5', '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 'DURATION', d.durationHours)}
                              ${buildMetaItemHtml('#FFFBEB', '#D97706', '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>', 'DISTANCE', d.distanceKm)}
                              ${buildMetaItemHtml('#ECFDF5', '#059669', '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', 'STAY', d.accommodation)}
                              ${buildMetaItemHtml('#FFF1F2', '#E11D48', '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>', 'MEALS', d.meals)}
                            </div>
                          ` : ''}
                          <div class="itinerary-description">${d.descriptionHtml || '<p>Guided trail stage with overnight arrangement.</p>'}</div>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </section>

            <!-- Section 3: Cost Includes & Excludes -->
            <section id="section-includes" class="trek-detail-section">
              <div style="border-left: 4px solid #F6851F; padding-left: 14px; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.8rem; color: #0E3458;">What's Included</h2>
              </div>
              <div class="inc-exc-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 30px;">
                ${(inclusions.length ? inclusions : [{ title: 'Experienced Guide Support', text: 'Licensed local guide and trip management.' }]).map((item) => `
                  <div class="inc-exc-card" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 18px; display: flex; gap: 12px;">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background: #ECFDF5; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${CHECK_SVG}</div>
                    <div>
                      <h4 class="inc-exc-card-title" style="margin: 0 0 4px 0; color: #0E3458; font-size: 1rem;">${escapeHtml(typeof item === 'string' ? item : item.title)}</h4>
                      ${typeof item === 'object' && item.text ? `<p class="inc-exc-card-text" style="margin: 0; font-size: 0.9rem; color: #64748B;">${escapeHtml(item.text)}</p>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>

              <div style="border-left: 4px solid #EF4444; padding-left: 14px; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.8rem; color: #0E3458;">What's Excluded</h2>
              </div>
              <div class="inc-exc-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
                ${(exclusions.length ? exclusions : [{ title: 'Personal Expenses & Insurance', text: 'Personal travel insurance, international flights, and tips.' }]).map((item) => `
                  <div class="inc-exc-card exclude-card" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 18px; display: flex; gap: 12px;">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background: #FEF2F2; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${X_SVG}</div>
                    <div>
                      <h4 class="inc-exc-card-title" style="margin: 0 0 4px 0; color: #0E3458; font-size: 1rem;">${escapeHtml(typeof item === 'string' ? item : item.title)}</h4>
                      ${typeof item === 'object' && item.text ? `<p class="inc-exc-card-text" style="margin: 0; font-size: 0.9rem; color: #64748B;">${escapeHtml(item.text)}</p>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Section 4: Dates & Group Pricing -->
            <section id="section-dates" class="trek-detail-section">
              <div style="border-left: 4px solid #F6851F; padding-left: 14px; margin-bottom: 16px;">
                <h2 style="margin: 0; font-size: 1.8rem; color: #0E3458;">Dates &amp; Group Pricing</h2>
              </div>
              <p class="dates-price-card-intro" style="color: #475569; margin-bottom: 20px;">${escapeHtml(pricing.intro || `Starting from USD ${priceNum.toLocaleString()} per person. Select a departure or request private trip dates.`)}</p>

              ${priceTiers.length > 0 ? `
                <div class="dates-tiers-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 14px; margin-bottom: 24px;">
                  ${priceTiers.map((t) => `
                    <div class="dates-tier-item" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 16px; text-align: center;">
                      <span class="dates-tier-label" style="display: block; font-size: 0.85rem; color: #64748B; font-weight: 600; margin-bottom: 6px;">${escapeHtml(t.label)}</span>
                      <strong class="dates-tier-price" style="display: block; font-size: 1.35rem; color: #0E3458; font-weight: 800;">${escapeHtml(t.price)}</strong>
                      ${t.note ? `<span class="dates-tier-pill" style="font-size: 0.72rem; color: #10B981; font-weight: 700; text-transform: uppercase;">${escapeHtml(t.note)}</span>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${priceTableRows.length > 0 ? `
                <div style="overflow-x: auto; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 20px;">
                  <table class="dates-table" style="width: 100%; border-collapse: collapse;">
                    <thead><tr><th style="padding: 12px; background: #F8FAFC;">Booking Category</th><th style="padding: 12px; background: #F8FAFC;">Price Status</th><th style="padding: 12px; background: #F8FAFC;">Action</th></tr></thead>
                    <tbody>
                      ${priceTableRows.map((r) => `
                        <tr>
                          <td style="padding: 12px; border-top: 1px solid #E2E8F0;">${escapeHtml(r.category)}</td>
                          <td style="padding: 12px; border-top: 1px solid #E2E8F0;">${escapeHtml(r.status)}</td>
                          <td style="padding: 12px; border-top: 1px solid #E2E8F0;"><button type="button" class="btn btn-primary btn-sm open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}">Inquire</button></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}

              ${departures.length > 0 ? `
                <div class="dates-departure-list" style="display: flex; flex-direction: column; gap: 12px;">
                  ${departures.map((dep) => `
                    <div class="departure-item-row" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px 18px;">
                      <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="departure-date-badge" style="background: #EFF6FF; color: #0E3458; border-radius: 8px; padding: 6px 12px; text-align: center; min-width: 56px;">
                          <span style="display: block; font-size: 1.05rem; font-weight: 800;">${escapeHtml(dep.day)}</span>
                          <span style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">${escapeHtml(dep.month)}</span>
                        </div>
                        <div>
                          <h4 class="departure-title" style="margin: 0; font-size: 1rem; color: #0E3458;">${escapeHtml(dep.title)}</h4>
                          <span class="departure-status-badge" style="font-size: 0.76rem; color: #059669; font-weight: 700;">${escapeHtml(dep.status || 'AVAILABLE')}</span>
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 14px;">
                        <strong class="departure-price" style="font-size: 1.08rem; color: #0E3458;">${escapeHtml(dep.price || `$${priceNum.toLocaleString()} pp`)}</strong>
                        <button type="button" class="btn btn-primary btn-sm open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}">Book Date</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </section>

            <!-- Section 5: Packing & Equipment Checklist -->
            <section id="section-packing" class="trek-detail-section">
              <div style="border-left: 4px solid #F6851F; padding-left: 14px; margin-bottom: 16px;">
                <h2 style="margin: 0; font-size: 1.8rem; color: #0E3458;">What to Pack for ${escapeHtml(pkg.title)}</h2>
              </div>
              <p class="packing-intro-text" style="color: #475569; margin-bottom: 18px;">${escapeHtml(packing.intro || 'Pack breathable layers, comfortable broken-in footwear, sun protection, and essential personal medications.')}</p>
              ${(packing.bannerTitle || packing.bannerDesc) ? `
                <div class="packing-rental-banner" style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
                  ${packing.bannerTitle ? `<h4 style="margin: 0 0 6px 0; color: #0E3458;">${escapeHtml(packing.bannerTitle)}</h4>` : ''}
                  ${packing.bannerDesc ? `<p style="margin: 0; font-size: 0.92rem; color: #334155;">${escapeHtml(packing.bannerDesc)}</p>` : ''}
                </div>
              ` : ''}
              ${packingCats.length > 0 ? `
                <div class="packing-controls-bar" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
                  <div>Packed: <strong><span class="gear-checked-count">0</span> / <span class="gear-total-count">${totalPackingItems}</span></strong> (<span class="gear-progress-percent">0%</span>)</div>
                  <div style="display: flex; gap: 8px;">
                    <button type="button" id="btn-check-all-gear" class="packing-action-btn">Check All</button>
                    <button type="button" id="btn-reset-gear" class="packing-action-btn">Reset</button>
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px;">
                  ${packingCats.map((cat, cIdx) => `
                    <div class="packing-category-card" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 18px;">
                      <h3 class="gear-section-title" style="margin: 0 0 12px 0; font-size: 1.1rem; color: #0E3458;">${escapeHtml(cat.title)}</h3>
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${(Array.isArray(cat.items) ? cat.items : []).map((it, iIdx) => `
                          <label class="gear-item-row" style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer;">
                            <input type="checkbox" class="gear-item-checkbox" id="pack_cat_${cIdx}_item_${iIdx}" style="margin-top: 4px;">
                            <div class="gear-item-text">
                              <span class="gear-item-label" style="font-weight: 600; color: #0E3458;">${escapeHtml(it.label)}</span>
                              ${(it.desc || it.qty) ? `<span class="gear-item-desc" style="display: block; font-size: 0.84rem; color: #64748B;">${escapeHtml(it.desc || '')}${it.qty ? ` <span class="gear-qty-tag">${escapeHtml(it.qty)}</span>` : ''}</span>` : ''}
                            </div>
                          </label>
                        `).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${packing.concludingNote ? `<div class="packing-concluding-note" style="margin-top: 16px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 10px; padding: 14px 18px;"><p style="margin: 0; font-size: 0.92rem; color: #334155;">${escapeHtml(packing.concludingNote)}</p></div>` : ''}
            </section>

            <!-- Section 6: Read Before You Book -->
            <section id="section-details" class="trek-detail-section">
              <div class="details-title-wrapper">
                <h2 class="details-main-title">${escapeHtml(readBefore.title || `Read Before You Book — ${pkg.title}`)}</h2>
                <div style="width: 48px; height: 4px; background: #F6851F; border-radius: 2px; margin-top: 8px;"></div>
              </div>
              ${readBefore.subtitle ? `<p class="details-subtitle-text">${escapeHtml(readBefore.subtitle)}</p>` : ''}
              ${readBefore.secondarySubtitle ? `<p class="details-subtitle-text">${readBefore.secondarySubtitle}</p>` : ''}
              <div class="details-header-bar details-controls-bar">
                <div class="details-progress-wrapper" style="margin-bottom: 0;">
                  <div class="details-progress-badge">
                    <div class="details-progress-ring-box">
                      <svg width="44" height="44"><circle class="details-progress-ring-bg" r="18" cx="22" cy="22"></circle><circle class="details-progress-ring-bar" r="18" cx="22" cy="22"></circle></svg>
                    </div>
                    <div class="details-progress-text-box">
                      <span class="details-progress-count">0/${detailTopics.length} read</span>
                      <span class="details-progress-status">Click topics below to explore essential briefings</span>
                    </div>
                  </div>
                </div>
                <div class="details-header-actions">
                  <button type="button" class="details-toggle-all-btn" id="toggle-all-details"><span>Expand All Topics</span></button>
                </div>
              </div>
              <div class="detail-accordion-list">
                ${detailTopics.map((topic, idx) => `
                  <div class="detail-accordion-card" data-detail-id="${escapeHtml(topic.id || `topic-${idx + 1}`)}">
                    <div class="detail-accordion-header">
                      <div class="detail-accordion-header-left">
                        <div class="detail-icon-container">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                          <div class="detail-check-bubble">${CHECK_SVG}</div>
                        </div>
                        <h4 class="detail-accordion-title">${escapeHtml(topic.title)}</h4>
                      </div>
                      <div class="detail-accordion-chevron">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                    <div class="detail-accordion-content">
                      <div class="detail-accordion-content-inner">${topic.contentHtml || ''}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Section 7: Elevation Profile -->
            <section id="section-altitude-profile" class="trek-detail-section">
              <div style="border-left: 4px solid #F6851F; padding-left: 14px; margin-bottom: 14px;">
                <h2 style="margin: 0; font-size: 1.8rem; color: #0E3458;">${escapeHtml(altObj.sectionTitle || `${pkg.title} Elevation Profile`)}</h2>
              </div>
              ${altObj.intro ? `<p style="color: #475569; margin-bottom: 18px;">${escapeHtml(altObj.intro)}</p>` : ''}
              <div class="altitude-chart-card">
                <div id="altitude-chart-wrapper" data-trek-key="${escapeHtml(pkg.trekKey)}"></div>
              </div>
              ${overnightTable.length > 0 ? `
                <div class="alt-table-card" style="margin-top: 22px;">
                  <div class="alt-table-header-bar"><h3 class="alt-table-title">Route Elevation Schedule</h3></div>
                  <div class="alt-table-responsive">
                    <table class="alt-custom-table">
                      <thead><tr><th>Day</th><th>Stop / Milestone</th><th>Elevation</th></tr></thead>
                      <tbody>
                        ${overnightTable.map((row) => `
                          <tr>
                            <td><span class="alt-day-pill">${escapeHtml(row.day)}</span></td>
                            <td>${escapeHtml(row.stop)}</td>
                            <td><span class="alt-stop-name">${escapeHtml(row.altitude)}</span></td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              ` : ''}
              ${higherPlaces.length > 0 ? `
                <div class="higher-places-grid" style="margin-top: 20px;">
                  ${higherPlaces.map((hp) => `
                    <div class="higher-place-card">
                      <div class="higher-place-card-top">
                        ${hp.tag ? `<span class="higher-place-tag">${escapeHtml(hp.tag)}</span>` : ''}
                        ${hp.altitude ? `<span class="higher-place-alt-badge">${escapeHtml(hp.altitude)}</span>` : ''}
                      </div>
                      <h4 class="higher-place-title">${escapeHtml(hp.title)}</h4>
                      ${hp.desc ? `<p class="higher-place-desc">${escapeHtml(hp.desc)}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </section>

            <!-- Section 8: Seasonal Weather Guide -->
            <section id="section-weather" class="trek-detail-section">
              <div style="border-left: 4px solid #F6851F; padding-left: 14px; margin-bottom: 14px;">
                <h2 style="margin: 0; font-size: 1.8rem; color: #0E3458;">${escapeHtml(weatherObj.sectionTitle || `Weather and Best Time for ${pkg.title}`)}</h2>
              </div>
              ${weatherObj.intro ? `<p style="color: #475569; margin-bottom: 18px;">${escapeHtml(weatherObj.intro)}</p>` : ''}
              <div class="alt-stats-grid" style="margin-bottom: 24px;">
                ${seasonCards.map((sc) => `
                  <div class="alt-stat-card">
                    <div class="alt-stat-header"><span class="alt-stat-tag">${escapeHtml(sc.tag || 'Season')}</span></div>
                    <div class="alt-stat-value">${escapeHtml(sc.season)}</div>
                    <div class="alt-stat-label">${escapeHtml(sc.rangeDesc)}</div>
                  </div>
                `).join('')}
              </div>
              <div class="altitude-chart-card">
                <div id="weather-chart-wrapper" data-trek-key="${escapeHtml(pkg.trekKey)}"></div>
              </div>
              ${seasonalTable.length > 0 ? `
                <div class="alt-table-card" style="margin-top: 22px;">
                  <div class="alt-table-header-bar"><h3 class="alt-table-title">Seasonal Weather Conditions</h3></div>
                  <div class="alt-table-responsive">
                    <table class="alt-custom-table">
                      <thead><tr><th>Season</th><th>Months</th><th>What to Expect</th></tr></thead>
                      <tbody>
                        ${seasonalTable.map((row) => `
                          <tr>
                            <td><span class="alt-day-pill">${escapeHtml(row.season)}</span></td>
                            <td>${escapeHtml(row.months)}</td>
                            <td>${escapeHtml(row.expect)}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              ` : ''}
            </section>

            ${routeMapUrl ? `
              <section id="section-map" class="trek-detail-section">
                <div style="border-left: 4px solid #F6851F; padding-left: 14px; margin-bottom: 16px;">
                  <h2 style="margin: 0; font-size: 1.8rem; color: #0E3458;">${escapeHtml((tagsMeta.routeMap && tagsMeta.routeMap.title) || `${pkg.title} Route Map`)}</h2>
                </div>
                ${tagsMeta.routeMap && tagsMeta.routeMap.subtitle ? `<p style="color: #475569; margin-bottom: 16px;">${escapeHtml(tagsMeta.routeMap.subtitle)}</p>` : ''}
                <div class="map-card" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; overflow: hidden;">
                  <img id="trek-route-map-img" src="${escapeHtml(toRelMedia(routeMapUrl, prefix))}" alt="${escapeHtml(`${pkg.title} Route Map`)}" style="width: 100%; height: auto; display: block;">
                </div>
              </section>
            ` : ''}

            <section id="section-booking" class="trek-detail-section">
              <h2 class="trek-section-title">${escapeHtml(bookingBanner.title || `Book ${pkg.title}`)}</h2>
              <p style="color: #475569; font-size: 1.02rem; line-height: 1.7; margin-bottom: 18px;">${escapeHtml(bookingBanner.body || `Share your preferred dates and group size. Our Kathmandu expedition planners will send a confirmed quotation and custom day-by-day plan within 2–4 hours.`)}</p>
              <div style="display: flex; gap: 14px; flex-wrap: wrap;">
                <button type="button" class="btn open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}" style="padding: 14px 28px; background: #F6851F; color: #FFFFFF; border: none; border-radius: 50px; font-size: 1.02rem; font-weight: 800; cursor: pointer;">Enquire Now</button>
                <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: #25D366; color: #FFFFFF; border-radius: 50px; font-weight: 700; text-decoration: none;">WhatsApp Inquiry</a>
              </div>
            </section>

            <!-- Section 10: Reviews (Rule 17 Gold Standard 3-Tab Structure) -->
            <section id="section-reviews" class="trek-detail-section">
              <h2 class="trek-section-title" style="font-size: 2rem; margin-bottom: 8px;">Traveler Reviews &amp; Verified Feedback</h2>
              <p style="color: #475569; margin-bottom: 24px;">Over 15,000 trekkers have explored the Nepal Himalayas with Igloo Himalaya Treks.</p>
              <div class="review-tabs-container">
                <button type="button" class="review-tab-btn active" data-target="reviews-video-pane">Video Reviews</button>
                <button type="button" class="review-tab-btn" data-target="reviews-customer-pane">Customer Reviews</button>
                <button type="button" class="review-tab-btn" data-target="reviews-platform-pane">Verified Platforms</button>
              </div>
              <div id="reviews-video-pane" class="review-pane-content active">
                <div class="video-reviews-grid">
                  <div class="video-review-card" data-video-url="${prefix}video/reviews/InShot_20261015_125657180.mp4" data-trekker="Paul &amp; Team" data-trek="Nepal Himalayan Expedition">
                    <img src="${prefix}images/video-thumb-review-5.webp" alt="Paul and Team Video Review" class="video-card-bg" loading="lazy">
                    <div class="video-card-badge-top"><span class="video-rating-pill">${STAR_SVG} 5.0</span><span class="video-date-pill">Verified</span></div>
                    <button type="button" class="video-play-btn" aria-label="Play video review"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0E3458"><polygon points="8 5 19 12 8 19 8 5"/></svg></button>
                    <div class="video-card-user-info"><div class="video-user-meta"><div class="video-user-name">Paul &amp; Team</div><div class="video-user-trek">Himalayan Trek</div></div></div>
                  </div>
                  <div class="video-review-card" data-video-url="${prefix}video/reviews/InShot_20261015_130001483.mp4" data-trekker="Natalia" data-trek="Solo Himalayan Trekker">
                    <img src="${prefix}images/video-thumb-review-7.webp" alt="Natalia Video Review" class="video-card-bg" loading="lazy">
                    <div class="video-card-badge-top"><span class="video-rating-pill">${STAR_SVG} 5.0</span><span class="video-date-pill">Verified</span></div>
                    <button type="button" class="video-play-btn" aria-label="Play video review"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0E3458"><polygon points="8 5 19 12 8 19 8 5"/></svg></button>
                    <div class="video-card-user-info"><div class="video-user-meta"><div class="video-user-name">Natalia</div><div class="video-user-trek">Solo Female Trekker</div></div></div>
                  </div>
                </div>
                <div id="video-review-modal" class="video-modal-overlay"></div>
              </div>
              <div id="reviews-customer-pane" class="review-pane-content">
                <div class="customer-reviews-stack">
                  <div class="customer-review-card" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px;">
                    <div class="stars-gold" style="margin-bottom: 8px;">${GOLD_STAR_SVG}${GOLD_STAR_SVG}${GOLD_STAR_SVG}${GOLD_STAR_SVG}${GOLD_STAR_SVG}</div>
                    <h4 style="margin: 0 0 6px 0; color: #0E3458;">Exceptional Planning &amp; Mountain Care</h4>
                    <p style="margin: 0; color: #475569; line-height: 1.6;">Seamless logistics from Kathmandu airport arrival through the mountain stages, with knowledgeable Sherpa guides prioritizing safety every day.</p>
                  </div>
                </div>
              </div>
              <div id="reviews-platform-pane" class="review-pane-content">
                <div class="platform-sub-tabs-wrapper" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px;">
                  <strong style="color: #0E3458; font-size: 1.15rem;">4.9 / 5.0 Average Rating</strong>
                  <p style="margin: 6px 0 0 0; color: #475569;">Verified across Google Reviews, TripAdvisor Travelers' Choice, and Trustpilot.</p>
                </div>
              </div>
            </section>

            <!-- Section 11: Categorized FAQs (Rule 15 & Rule 16 Compliant) -->
            <section id="section-faqs" class="trek-detail-section">
              <h2 class="faq-section-accent-title"><span class="faq-accent-bar"></span>${escapeHtml(pkg.title)} FAQs</h2>
              <div class="faq-layout-container">
                <div class="faq-sidebar-card">
                  <div class="faq-category-nav">
                    ${faqCatMeta.map((cat, idx) => {
                      const catCount = faqs.filter((f) => f.category === cat.enumKey).length;
                      return `
                        <button type="button" class="faq-category-btn ${idx === 0 ? 'active' : ''}" data-category="${escapeHtml(cat.domKey)}" aria-pressed="${idx === 0 ? 'true' : 'false'}">
                          <span class="faq-cat-label">${escapeHtml(cat.label)}</span>
                          <span class="faq-cat-badge">${catCount}</span>
                        </button>`;
                    }).join('')}
                  </div>
                </div>
                <div class="faq-main-panel">
                  <div class="faq-panel-header">
                    <h3 class="faq-active-category-title" id="faq-current-category-title">${escapeHtml(faqCatMeta[0].label)}</h3>
                    <button type="button" class="faq-expand-all-btn" id="faq-expand-all-btn">Expand All</button>
                  </div>
                  ${faqCatMeta.map((cat, idx) => {
                    const catFaqs = faqs.filter((f) => f.category === cat.enumKey);
                    return `
                      <div class="faq-category-content ${idx === 0 ? 'active' : ''}" id="faq-cat-${escapeHtml(cat.domKey)}" data-category="${escapeHtml(cat.domKey)}">
                        ${(catFaqs.length > 0 ? catFaqs : (idx === 0 ? [{ question: `How do I book ${pkg.title}?`, answerHtml: `<p>Click Enquire Now or message us on WhatsApp with your target dates and group size.</p>` }] : [])).map((f) => `
                          <div class="faq-item">
                            <button type="button" class="faq-item-question">
                              <span>${escapeHtml(f.question)}</span>
                              <span class="faq-toggle-circle" aria-hidden="true">&#8250;</span>
                            </button>
                            <div class="faq-item-answer">${f.answerHtml || ''}</div>
                          </div>
                        `).join('')}
                      </div>`;
                  }).join('')}
                </div>
              </div>

              <!-- High-Conversion Bottom CTA Banner (Rule 16) -->
              <div class="faq-bottom-cta-banner" style="background: linear-gradient(135deg, #0A2540 0%, #0E3458 55%, #144A75 100%); border-radius: 18px; padding: 48px 32px; margin-top: 45px; text-align: center; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(10, 37, 64, 0.2); border: 1px solid rgba(255, 255, 255, 0.12);">
                <div style="position: relative; z-index: 2; max-width: 820px; margin: 0 auto;">
                  <span style="display: inline-block; padding: 6px 16px; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 30px; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #38BDF8; margin-bottom: 16px;">${escapeHtml(bottomCta.badge || 'PLAN YOUR HIMALAYAN EXPEDITION')}</span>
                  <h2 style="font-size: 2.1rem; font-weight: 800; color: #FFFFFF; margin: 0 0 16px 0;">${escapeHtml(bottomCta.title || `Book ${pkg.title}`)}</h2>
                  <p style="font-size: 1.02rem; line-height: 1.7; color: #E2E8F0; margin: 0 auto 28px auto; max-width: 740px;">${escapeHtml(bottomCta.body || `Send your preferred dates and group size to confirm availability, Sherpa team support, and a tailored quote for ${fullDisplayTitle}.`)}</p>
                  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
                    <button type="button" class="btn open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}" style="background: #F6851F; color: #FFFFFF; font-weight: 800; font-size: 1.05rem; padding: 14px 32px; border-radius: 50px; border: none; cursor: pointer;">Enquire Now</button>
                    <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener" style="background: #25D366; color: #FFFFFF; font-weight: 700; font-size: 1.05rem; padding: 14px 28px; border-radius: 50px; text-decoration: none;">Chat on WhatsApp</a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Sticky Booking Sidebar Column -->
          <div class="trek-sidebar-col" style="position: relative; height: 100%;">
            <div class="sidebar-booking-card" style="position: sticky; top: 160px; z-index: 40; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 18px; padding: 26px; box-shadow: 0 12px 32px rgba(10, 37, 64, 0.08);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 800; color: #1A96C8;">All-Inclusive Value</span>
                <span style="background: #FEF3C7; color: #B45309; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 999px;">BEST SELLER</span>
              </div>
              <div style="font-size: 0.85rem; color: #64748B;">Starting From</div>
              <div style="display: flex; align-items: baseline; gap: 8px; margin: 4px 0 8px 0;">
                <span class="hero-price-val" style="font-size: 2.2rem; font-weight: 900; color: #0E3458;">$${priceNum.toLocaleString()}</span>
                <span style="font-size: 0.92rem; color: #64748B;">/ person</span>
              </div>
              <a href="#section-itinerary" style="display: inline-block; font-size: 0.88rem; color: #1A96C8; font-weight: 700; text-decoration: none; margin-bottom: 14px;">${pkg.durationDays} ${pkg.durationDays === 1 ? 'day' : 'days'} trip</a>

              <div class="group-discount-content" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 12px 14px; margin-bottom: 16px; font-size: 0.86rem;">
                ${sidebarTiers.map((t) => `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #E2E8F0;">
                    <span style="color: #64748B;">${escapeHtml(t.label)}</span>
                    <strong style="color: #0E3458;">${escapeHtml(t.price)}</strong>
                  </div>
                `).join('')}
              </div>

              <ul style="list-style: none; padding: 0; margin: 0 0 18px 0;">
                ${sidebarBullets.map((b) => `
                  <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem; color: #334155; font-weight: 500; margin-bottom: 9px;">
                    <span style="flex-shrink: 0; margin-top: 2px;">${CHECK_SVG}</span>
                    <span>${escapeHtml(b)}</span>
                  </li>
                `).join('')}
              </ul>

              <button type="button" class="btn open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}" style="width: 100%; padding: 14px 20px; background: #F6851F; color: #FFFFFF; border: none; border-radius: 50px; font-size: 1.04rem; font-weight: 800; cursor: pointer; box-shadow: 0 4px 14px rgba(246,133,31,0.35);">Book / Enquire Now</button>
              <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 10px; padding: 11px 16px; background: #F0FDF4; border: 1.5px solid #22C55E; color: #15803D; border-radius: 50px; font-size: 0.92rem; font-weight: 700; text-decoration: none; box-sizing: border-box;">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Rule 2: Pre-Footer Inquiry Modal before You Might Also Like -->
      <div id="inquiry-modal" class="modal-overlay" style="display: none;"></div>

      <!-- You Might Also Like -->
      <section class="you-might-like-section">
        <div class="container">
          <div class="yml-header">
            <span class="yml-pill-tag">MORE ADVENTURES</span>
            <div class="yml-title-row">
              <span class="yml-accent-bar"></span>
              <h2 class="yml-title">You Might Also Like</h2>
            </div>
          </div>
          <div class="yml-cards-grid">
            ${recommendations.slice(0, 4).map((rec) => {
              const t = rec.recommendedPackage;
              if (!t) return '';
              const tFolder = t.type === 'TOUR' ? 'tour' : 'trek';
              const rImg = resolveGalImg(t.galleries && t.galleries[0]);
              const rDays = `${t.durationDays} ${t.durationDays === 1 ? 'Day' : 'Days'}`;
              return `
                <a href="${prefix}${tFolder}/${escapeHtml(t.slug)}/" class="yml-card">
                  <div class="yml-card-image">
                    <img src="${escapeHtml(rImg)}" alt="${escapeHtml(t.title)}" loading="lazy">
                    <div class="yml-card-overlay"></div>
                    <span class="yml-card-badge yml-badge-duration">${escapeHtml(rDays)}</span>
                  </div>
                  <div class="yml-card-body">
                    <h3 class="yml-card-title">${escapeHtml(t.title)} &mdash; ${escapeHtml(rDays)}</h3>
                    ${t.heroSummary ? `<p style="font-size: 0.88rem; color: #64748B; line-height: 1.5; margin: 6px 0 12px 0;">${escapeHtml(t.heroSummary.slice(0, 140))}</p>` : ''}
                    <div class="yml-card-footer">
                      <span class="yml-price-label">More Details</span>
                      <span class="yml-view-trip-btn">View Package →</span>
                    </div>
                  </div>
                </a>`;
            }).join('')}
          </div>
        </div>
      </section>
    </article>
  </main>

  ${getFooterMarkup(prefix)}

  <aside class="mobile-sticky-booking-bar" aria-label="Quick Booking Bar">
    <div class="mobile-sticky-price-wrap">
      <span class="mobile-sticky-price-label">Starting From</span>
      <div class="mobile-sticky-price-val">$${priceNum.toLocaleString()} <span class="mobile-sticky-price-unit">/ person</span></div>
      <span class="mobile-sticky-duration-pill">${escapeHtml(dayLabel)} &bull; All-Inclusive</span>
    </div>
    <div class="mobile-sticky-actions">
      <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener" class="mobile-sticky-wa-btn" aria-label="WhatsApp Inquiry">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
      </a>
      <button type="button" class="mobile-sticky-book-btn open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}">Book Now</button>
    </div>
  </aside>

  <script>
    window.__CMS_ALTITUDE_PROFILE__ = ${JSON.stringify(altRuntime)};
    window.__CMS_WEATHER_PROFILE__ = ${JSON.stringify(weatherRuntime)};
  </script>
  <script type="module" src="${prefix}js/altitude-visualizer.js"></script>
  <script type="module" src="${prefix}js/weather-visualizer.js"></script>
  <script type="module" src="${prefix}js/inquiry-modal.js"></script>
  <script src="${prefix}js/jspdf.umd.min.js"></script>
  <script src="${prefix}js/itinerary-pdf.js"></script>
  <script src="${prefix}js/trek-details.js?v=11"></script>
  <script src="${prefix}js/header-scroll.js?v=37"></script>
  <script src="${prefix}js/mega-menu.js"></script>
  <script defer src="${prefix}js/footer-interactions.js"></script>
</body>
</html>`;
}

module.exports = {
  renderCanonicalPackageHtml
};
