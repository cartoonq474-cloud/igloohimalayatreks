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

function slugifyCat(str) {
  return String(str || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'general';
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
const CHECK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const BLUE_CHECK_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><polyline points="20 6 9 17 4 12"/></svg>';
const SPARKLE_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" style="flex-shrink: 0;"><path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4z"/></svg>';

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
  if (c.includes('group') || c.includes('guide') || c.includes('team') || c.includes('porter')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
  }
  if (c.includes('permit') || c.includes('pass') || c.includes('visa') || c.includes('doc')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
  }
  if (c.includes('transport') || c.includes('flight') || c.includes('drive')) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>';
  }
  if (c.includes('start') || c.includes('end') || c.includes('region') || c.includes('route') || c.includes('dest')) {
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

function buildDefaultTripFacts(pkg, dayLabel) {
  const destName = (pkg.destination && pkg.destination.name) || 'Nepal Himalayas';
  const maxAltM = Number(pkg.maxAltitudeM || 0);
  const maxAltFt = maxAltM ? Math.round(maxAltM * 3.28084) : 0;
  const tripKind = pkg.type === 'TOUR' ? 'Guided Cultural & Overland Tour' : (pkg.type === 'PEAK_CLIMB' ? 'Guided Peak Expedition' : 'Teahouse Trekking');
  const stays = pkg.type === 'TOUR' ? 'Comfortable hotels & local lodges' : 'Hotel in Kathmandu & mountain teahouses';
  const difficultyLabel = pkg.difficulty || 'MODERATE';

  return [
    { category: 'DESTINATION', value: destName, subtitle: 'Himalayan region & trail corridor' },
    { category: 'TRIP DURATION', value: dayLabel, subtitle: 'Full arrival-to-departure programme' },
    { category: 'MAXIMUM ALTITUDE', value: maxAltM ? `${maxAltM.toLocaleString()} m (${maxAltFt.toLocaleString()} ft)` : 'Moderate Altitude', subtitle: 'Highest planned route elevation', altitudeM: maxAltM || undefined },
    { category: 'TRIP GRADE', value: difficultyLabel, subtitle: 'Consecutive walking & mountain conditions' },
    { category: 'TRIP STYLE', value: tripKind, subtitle: 'Private & group joining departures' },
    { category: 'ACCOMMODATION', value: stays, subtitle: 'Twin-sharing clean rooms' },
    { category: 'MEAL PLAN', value: 'Breakfast, Lunch & Dinner', subtitle: 'On route + breakfast in Kathmandu' },
    { category: 'DAILY ACTIVITY', value: pkg.type === 'TOUR' ? 'Scenic Sightseeing & Walks' : '4–7 Hours Walking Daily', subtitle: 'At a comfortable acclimatised pace' },
    { category: 'GROUP SIZE', value: '1–12 Travellers', subtitle: 'Small groups or private departure' },
    { category: 'BEST SEASONS', value: 'Spring & Autumn', subtitle: 'Mar–May & Sep–Nov (year-round options)' },
    { category: 'START / END POINT', value: 'Kathmandu, Nepal', subtitle: 'With airport pickup & drop-off' },
    { category: 'TRANSPORTATION', value: 'Private Vehicle / Domestic Transfers', subtitle: 'Included per itinerary schedule' },
    { category: 'PERMITS & DOCS', value: 'Required Permits Arranged', subtitle: 'Managed by our Kathmandu office' },
    { category: 'GUIDE & TEAM', value: 'Licensed Local Guide', subtitle: 'Experienced Himalayan crew & support' }
  ];
}

function buildPackingCategorySvg(title, size = 20) {
  const t = String(title || '').toLowerCase();
  const wh = `width="${size}" height="${size}"`;
  if (t.includes('cloth') || t.includes('layer') || t.includes('wear')) {
    return `<svg ${wh} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`;
  }
  if (t.includes('sleep') || t.includes('camp')) {
    return `<svg ${wh} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
  if (t.includes('toil') || t.includes('hyg') || t.includes('first aid') || t.includes('med')) {
    return `<svg ${wh} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
  }
  if (t.includes('elect') || t.includes('power') || t.includes('tech')) {
    return `<svg ${wh} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
  }
  if (t.includes('doc') || t.includes('personal') || t.includes('permit')) {
    return `<svg ${wh} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
  }
  return `<svg ${wh} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M12 2v20"/></svg>`;
}

function buildDefaultPackingCategories(isTour) {
  return [
    {
      title: 'Hiking Gear',
      icon: '🥾',
      bg: '#FFF7ED',
      color: '#EA580C',
      items: [
        { label: isTour ? 'Comfortable walking shoes' : 'Waterproof trekking boots', desc: 'Broken in beforehand with reliable grip on uneven terrain', qty: '1 pair' },
        { label: 'Daypack (25–35 L)', desc: 'For daily water, extra jacket, rain cover, camera and documents', qty: '1 pack' },
        { label: 'Trekking poles', desc: 'Adjustable poles for descents and steep stone staircases', qty: '1 pair' },
        { label: 'UV protection sunglasses', desc: 'Polarized or glacier-grade lens for high-altitude glare', qty: '1 pair' },
        { label: 'Headlamp + spare batteries', desc: 'Essential for dawn starts and mountain lodge evenings', qty: '1 unit' },
        { label: 'Reusable water bottles (1L)', desc: 'Wide-mouth insulated bottles or hydration flask', qty: '2 bottles' }
      ]
    },
    {
      title: 'Clothing & Layers',
      icon: '🧥',
      bg: '#EFF6FF',
      color: '#1D4ED8',
      items: [
        { label: 'Moisture-wicking base layers', desc: 'Lightweight merino or breathable synthetic tops', qty: '3–4 pcs' },
        { label: 'Warm fleece or mid-layer jacket', desc: 'Insulation layer for crisp mountain mornings', qty: '1 pc' },
        { label: 'Insulated down jacket', desc: 'Included complimentary on loan for high-altitude trips', qty: '1 pc' },
        { label: 'Waterproof / windproof shell jacket', desc: 'Breathable outer protection against wind and showers', qty: '1 pc' },
        { label: 'Convertible trekking trousers', desc: 'Quick-drying outdoor pants plus thermal leggings for cold nights', qty: '2–3 pairs' },
        { label: 'Thermal & hiking socks', desc: 'Wool-blend cushioned socks (avoid cotton on trail)', qty: '4–5 pairs' }
      ]
    },
    {
      title: 'Sleeping & Cold Weather',
      icon: '⛺',
      bg: '#F5F3FF',
      color: '#7C3AED',
      items: [
        { label: '4-season sleeping bag (-15°C to -20°C)', desc: 'Complimentary 4-season bag provided on loan by Igloo', qty: '1 bag' },
        { label: 'Warm wool beanie & neck gaiter', desc: 'Covers ears and keeps dust/wind away at high passes', qty: '1 set' },
        { label: 'Insulated outer & liner gloves', desc: 'Layered warmth for cold dawns above 4,000 m', qty: '1 pair each' }
      ]
    },
    {
      title: 'Toiletries & First Aid',
      icon: '🧼',
      bg: '#ECFDF5',
      color: '#059669',
      items: [
        { label: 'SPF 50+ sunscreen & SPF lip balm', desc: 'Strong UV intensity increases rapidly with elevation', qty: '1 each' },
        { label: 'Personal prescriptions & altitude tablets', desc: 'Diamox/ibuprofen/rehydration salts discussed with your doctor', qty: '1 kit' },
        { label: 'Quick-dry camp towel & wet wipes', desc: 'Biodegradable travel wipes and travel soap sheets', qty: '1 set' },
        { label: 'Hand sanitizer & blister plasters', desc: 'Compeed/moleskin patches for trail comfort', qty: '1 set' }
      ]
    },
    {
      title: 'Electronics & Power',
      icon: '🔌',
      bg: '#FEF3C7',
      color: '#D97706',
      items: [
        { label: '10,000–20,000 mAh power bank', desc: 'Cold drains batteries faster; keep electronics in sleeping bag overnight', qty: '1–2 units' },
        { label: 'Universal travel adapter & cables', desc: 'Nepal uses Type C, D and M sockets (230V)', qty: '1 set' },
        { label: 'Camera / smartphone & extra memory', desc: 'Weather-sealed pouch for high-altitude dust and moisture', qty: '1 set' }
      ]
    },
    {
      title: 'Travel Documents',
      icon: '📄',
      bg: '#FFF1F2',
      color: '#E11D48',
      items: [
        { label: 'Passport + 4 passport-size photos', desc: 'At least 6 months validity from arrival date; photos for permits', qty: '1 + 4 pcs' },
        { label: 'Travel & high-altitude evacuation insurance', desc: 'Printed & digital copy showing policy emergency hotline', qty: '1 copy' },
        { label: 'Local currency (NPR) cash', desc: 'For hot showers, charging, Wi-Fi, tips and snacks on route', qty: 'As needed' }
      ]
    }
  ];
}

function buildDefaultDetailTopics(pkg) {
  const maxM = pkg.maxAltitudeM ? `${pkg.maxAltitudeM.toLocaleString()} m` : 'high mountain sections';
  return [
    {
      id: 'difficulty',
      title: 'Trip Difficulty, Pacing & Physical Preparation',
      contentHtml: `<p>Prepare with regular brisk walks, stair climbing, or weekend hikes carrying a light daypack. Your guide sets a steady, conversational pace tailored to group comfort and trail conditions.</p>`
    },
    {
      id: 'altitude',
      title: `Altitude & Acclimatisation (Up to ${maxM})`,
      contentHtml: `<p>Scheduled acclimatisation stops and gradual elevation gain allow your body to adapt naturally. Hydrate regularly, eat warm meals, and report headaches or fatigue to your guide promptly.</p>`
    },
    {
      id: 'accommodation',
      title: 'Hotels in Kathmandu & Route Accommodation',
      contentHtml: `<p>Kathmandu stays are in comfortable twin-share 3-star heritage/boutique hotels with private bathrooms. Along the mountain stages, stays are in clean locally run teahouses or guesthouses.</p>`
    },
    {
      id: 'meals',
      title: 'Daily Meals, Drinking Water & Dietary Care',
      contentHtml: `<p>Freshly prepared breakfast, lunch, and dinner include Dal Bhat, noodles, soups, pasta, pancakes, and seasonal vegetables. Vegetarian, vegan, and allergy preferences are happily accommodated.</p>`
    },
    {
      id: 'guide-porters',
      title: 'Licensed Guides, Porters & Luggage Allowance',
      contentHtml: `<p>Your trip is led by a government-licensed English-speaking guide trained in altitude first aid. Complimentary 80L duffel bags are provided when porters are included (up to ~12–15 kg luggage per traveller).</p>`
    },
    {
      id: 'permits',
      title: 'Permits, Documentation & Entry Requirements',
      contentHtml: `<p>All national park fees, conservation permits, and restricted area documentation listed in the itinerary are arranged beforehand in Kathmandu—simply bring your passport and 4 passport photographs.</p>`
    },
    {
      id: 'insurance',
      title: 'Travel Insurance & 24/7 Emergency Support',
      contentHtml: `<p>Comprehensive travel insurance covering medical expenses and helicopter evacuation up to ${pkg.maxAltitudeM ? `${pkg.maxAltitudeM.toLocaleString()} m` : 'the trip max altitude'} is mandatory prior to departure.</p>`
    },
    {
      id: 'booking-payment',
      title: 'Flexible Booking, Deposit & Free Amendments',
      contentHtml: `<p>Lock in your dates with a straightforward trip confirmation. You can adjust departure dates or customize days in Kathmandu at any time before permit issuance with no hidden fees.</p>`
    }
  ];
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
  if (Array.isArray(wObj.baseDailyData) && wObj.baseDailyData.length > 0 && Array.isArray(wObj.monthData) && wObj.monthData.length > 0) {
    return {
      ...wObj,
      monthData: wObj.monthData.map((m) => ({
        name: m.name || m.month || 'Month',
        min: Number(m.min ?? 0),
        max: Number(m.max ?? 15)
      }))
    };
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
    regionTitle: (pkg.destination && pkg.destination.name) || `${pkg.title} Route Climate`,
    baseDailyData,
    monthData: [
      { name: 'January', min: -2, max: 14 },
      { name: 'February', min: 0, max: 16 },
      { name: 'March', min: 4, max: 20 },
      { name: 'April', min: 8, max: 23 },
      { name: 'May', min: 11, max: 25 },
      { name: 'June', min: 14, max: 26 },
      { name: 'July', min: 15, max: 25 },
      { name: 'August', min: 15, max: 25 },
      { name: 'September', min: 13, max: 24 },
      { name: 'October', min: 8, max: 22 },
      { name: 'November', min: 3, max: 18 },
      { name: 'December', min: -1, max: 15 }
    ]
  };
}

function buildDefaultDepartures(priceNum) {
  return [
    { month: 'SEP', day: '05', title: 'Sep 5 – Available Group Departure', status: 'AVAILABLE', price: `$${priceNum.toLocaleString()} pp` },
    { month: 'SEP', day: '18', title: 'Sep 18 – Small Group Joining', status: 'AVAILABLE', price: `$${priceNum.toLocaleString()} pp` },
    { month: 'OCT', day: '03', title: 'Oct 3 – Autumn Peak Departure', status: 'GUARANTEED', price: `$${priceNum.toLocaleString()} pp` },
    { month: 'OCT', day: '17', title: 'Oct 17 – Autumn Clear Sky Window', status: 'AVAILABLE', price: `$${priceNum.toLocaleString()} pp` },
    { month: 'NOV', day: '04', title: 'Nov 4 – Late Autumn Departure', status: 'AVAILABLE', price: `$${priceNum.toLocaleString()} pp` },
    { month: 'DEC', day: '06', title: 'Dec 6 – Winter Trail Departure', status: 'AVAILABLE', price: `$${priceNum.toLocaleString()} pp` }
  ];
}

function buildInqModalHtml(fullDisplayTitle, whatsappDigits, recommendedPackages) {
  const pkgOptions = (recommendedPackages || [])
    .map((p) => {
      const label = `${p.title} — ${p.durationDays} ${p.durationDays === 1 ? 'Day' : 'Days'}`;
      return `<option value="${escapeHtml(label)}" data-slug="${escapeHtml(p.slug)}">${escapeHtml(label)}</option>`;
    })
    .join('');

  return `<div id="inquiry-modal" class="modal-overlay" style="display: none;">
    <div class="modal-card inq-modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-trek-title">
      <button id="modal-close-btn" class="modal-close" aria-label="Close Inquiry Modal" type="button">&times;</button>
      <div class="inq-modal-header">
        <span class="inq-brand-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
          OFFICIAL HIMALAYAN EXPEDITION INQUIRY
        </span>
        <h3 id="modal-trek-title" class="inq-modal-title">Book or Inquire About Your Trek</h3>
        <p class="inq-modal-subtitle">Receive a confirmed price quote, customized day-by-day route plan, and gear checklist within <strong>2–4 hours</strong> from our senior Sherpa team in Kathmandu.</p>
        <div class="inq-selected-trip-wrap" id="inq-trip-badge-wrap">
          <div class="inq-trip-chip">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span id="inq-badge-trek-name">${escapeHtml(fullDisplayTitle)}</span>
          </div>
          <span class="inq-departure-tag" id="inq-departure-tag" style="display: none;"></span>
        </div>
      </div>

      <form id="custom-inquiry-form" class="inq-form" action="https://formsubmit.co/info@igloohimalayatreks.com" method="POST" novalidate>
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_autoresponse" value="Namaste from Igloo Himalaya Treks! Thank you for inquiring. Our Senior Sherpa Expedition Team is preparing your personalized itinerary and confirmed quotation, and will reach out within 2–4 hours.">
        <input type="hidden" id="inq-hidden-trek" name="trekTitle" value="${escapeHtml(fullDisplayTitle)}">
        <input type="hidden" id="inq-hidden-departure" name="departureDate" value="">

        <div class="inq-section-title">
          <span class="inq-step-badge">1</span>
          <span>Expedition &amp; Travel Dates</span>
        </div>

        <div class="inq-field-group full-width">
          <label class="inq-field-label" for="inq-package">
            <span>Select Trek / Package <span class="required">*</span></span>
            <span class="hint">Tailored Himalayan Routes</span>
          </label>
          <div class="inq-input-wrap">
            <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
            <select id="inq-package" name="package" class="inq-select" required>
              <option value="${escapeHtml(fullDisplayTitle)}" selected>${escapeHtml(fullDisplayTitle)}</option>
              ${pkgOptions}
              <option value="Tailor-Made Custom Himalayan Itinerary">Tailor-Made Custom Himalayan Itinerary</option>
            </select>
          </div>
          <span class="inq-error-msg" id="inq-package-error">Please select your preferred trek or package</span>
        </div>

        <div class="inq-form-grid">
          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-start-date">
              <span>Target Start Date / Month</span>
              <span class="hint">Approximate is fine</span>
            </label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <input type="text" id="inq-start-date" name="startDate" class="inq-input" placeholder="e.g. October 2026 or Spring 2027">
            </div>
          </div>
          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-season">
              <span>Preferred Season / Year</span>
              <span class="hint">Weather window</span>
            </label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>
              <select id="inq-season" name="season" class="inq-select">
                <option value="Autumn 2026 (Sep–Nov) — Best Visibility" selected>Autumn 2026 (Sep–Nov) — Best Visibility</option>
                <option value="Spring 2027 (Mar–May) — Wildflowers &amp; Warm">Spring 2027 (Mar–May) — Wildflowers &amp; Warm</option>
                <option value="Winter (Dec–Feb) — Quiet Trails">Winter (Dec–Feb) — Quiet Trails</option>
                <option value="Flexible / Dates Not Fixed Yet">Flexible / Dates Not Fixed Yet</option>
              </select>
            </div>
          </div>
        </div>

        <div class="inq-section-title">
          <span class="inq-step-badge">2</span>
          <span>Lead Traveller &amp; Contact Details</span>
        </div>

        <div class="inq-form-grid">
          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-name"><span>Full Name <span class="required">*</span></span></label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" id="inq-name" name="name" autocomplete="name" class="inq-input" placeholder="e.g. Sarah Jenkins" required>
            </div>
            <span class="inq-error-msg" id="inq-name-error">Please enter your full name</span>
          </div>
          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-email"><span>Email Address <span class="required">*</span></span></label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input type="email" id="inq-email" name="email" autocomplete="email" class="inq-input" placeholder="sarah@example.com" required>
            </div>
            <span class="inq-error-msg" id="inq-email-error">Please enter a valid email address</span>
          </div>
        </div>

        <div class="inq-form-grid">
          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-phone">
              <span>WhatsApp / Phone <span class="required">*</span></span>
              <span class="hint">For instant quote &amp; PDF</span>
            </label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <input type="tel" id="inq-phone" name="phone" autocomplete="tel" class="inq-input" placeholder="+1 (555) 000-0000" required>
            </div>
            <span class="inq-error-msg" id="inq-phone-error">Please enter a valid contact phone number</span>
          </div>
          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-trekkers">
              <span>Number of Travellers</span>
              <span class="hint">Group discounts</span>
            </label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <select id="inq-trekkers" name="trekkers" class="inq-select">
                <option value="1">1 Person (Solo Traveller)</option>
                <option value="2" selected>2 Persons (Most Popular)</option>
                <option value="3-4">3–4 Persons (Small Group)</option>
                <option value="5-9">5–9 Persons (Group Discount)</option>
                <option value="10+">10+ Persons (Large Group Deal)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="inq-field-group full-width">
          <label class="inq-field-label" for="inq-notes">
            <span>Special Requests, Dietary Needs or Fitness Level</span>
            <span class="hint">Optional</span>
          </label>
          <textarea id="inq-notes" name="notes" class="inq-textarea" rows="2" placeholder="Tell us your dietary preferences, fitness level, or questions for our Sherpa team..."></textarea>
        </div>

        <div class="inq-actions-wrap">
          <button type="submit" id="inq-submit-btn" class="inq-submit-btn">
            <span class="btn-text">Send Booking Inquiry &amp; Get Proposal</span>
            <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <div class="inq-btn-subtext">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>No payment required today &bull; 100% Free custom route plan &amp; confirmed quote</span>
          </div>
        </div>

        <a id="inq-whatsapp-link" href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${encodeURIComponent(`Hello Igloo Himalaya Treks, I would like to inquire about ${fullDisplayTitle}`)}" target="_blank" rel="noopener" class="inq-whatsapp-alt">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
          <span>Prefer instant answer? Chat with Senior Planner on WhatsApp →</span>
        </a>

        <div class="inq-trust-strip">
          <div class="inq-trust-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>2–4 Hr Response</span>
          </div>
          <div class="inq-trust-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>100% Guaranteed</span>
          </div>
          <div class="inq-trust-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F6851F" stroke-width="2.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>Sherpa Certified</span>
          </div>
          <div class="inq-trust-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2.2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>No Booking Fees</span>
          </div>
        </div>
      </form>
    </div>
  </div>`;
}

/**
 * Renders a complete Everest Base Camp Gold-Standard Trek/Tour HTML page from a Prisma Package record
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
  const phoneDisplay = (siteSetting && siteSetting.primaryPhone) || '+9779860843980';
  const waPrefill = encodeURIComponent(`Hello Igloo Himalaya Treks, I would like to inquire about ${fullDisplayTitle} starting from USD ${priceNum}.`);

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

  const rawTripFacts = Array.isArray(pkg.tripFactsJson) ? pkg.tripFactsJson : [];
  const tripFacts = rawTripFacts.length >= 6 ? rawTripFacts : (rawTripFacts.length > 0 ? [...rawTripFacts, ...buildDefaultTripFacts(pkg, dayLabel).slice(rawTripFacts.length)] : buildDefaultTripFacts(pkg, dayLabel));

  const whyBookCards = Array.isArray(tagsMeta.whyBookCards) && tagsMeta.whyBookCards.length > 0
    ? tagsMeta.whyBookCards
    : [
        { title: 'Trip Briefing & Gear Check', desc: 'Before departing Kathmandu, our guides review every itinerary detail, inspect gear, and help arrange any final supplies.' },
        { title: 'Certified Guide & Support Crew', desc: 'Licensed English-speaking local guide trained in high-altitude safety, first aid, and regional culture.' },
        { title: 'Complimentary Expedition Gear', desc: '4-season sleeping bag, warm down jacket, and waterproof duffel bag provided for high-altitude comfort.' },
        { title: '24/7 Local Coordination', desc: 'Direct Kathmandu office monitoring for weather updates, transport changes, and personalized group flexibility.' }
      ];
  const whyBookIcons = [
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  ];

  const inclusions = Array.isArray(pkg.inclusionsJson) ? pkg.inclusionsJson : [];
  const exclusions = Array.isArray(pkg.exclusionsJson) ? pkg.exclusionsJson : [];
  const pricing = (pkg.groupPricingJson && !Array.isArray(pkg.groupPricingJson)) ? pkg.groupPricingJson : {};
  const sidebarTiers = Array.isArray(pricing.sidebarTiers) && pricing.sidebarTiers.length > 0
    ? pricing.sidebarTiers
    : [
        { label: '1 person (Solo Traveller)', price: `USD ${Math.round(priceNum * 1.15).toLocaleString()} / person` },
        { label: '2–4 people', price: `USD ${priceNum.toLocaleString()} / person` },
        { label: '5–9 people', price: `USD ${Math.round(priceNum * 0.92).toLocaleString()} / person (Best Rate)` },
        { label: '10+ people', price: 'Request a quote' }
      ];
  const sidebarBullets = Array.isArray(pricing.sidebarBullets) && pricing.sidebarBullets.length > 0
    ? pricing.sidebarBullets
    : [
        'Trip Leading by well trained Team',
        'Hassle-Free & Instant Booking',
        '100% Customers Satisfaction',
        'Reasonable Price & Best Service',
        'No Hidden Cost & Secure Payment'
      ];
  const priceTiers = Array.isArray(pricing.tiers) && pricing.tiers.length > 0
    ? pricing.tiers
    : [
        { label: '1 Person (Solo)', price: `USD ${Math.round(priceNum * 1.15).toLocaleString()}`, note: 'Private Support' },
        { label: '2–4 People', price: `USD ${priceNum.toLocaleString()}`, note: 'Small Group' },
        { label: '5–7 People', price: `USD ${Math.round(priceNum * 0.92).toLocaleString()}`, note: 'Best Value', highlight: true },
        { label: '8+ People', price: 'Quote', note: 'Request Quote' }
      ];
  const priceTableRows = Array.isArray(pricing.tableRows) ? pricing.tableRows : [];
  const rawDepartures = Array.isArray(pkg.departureDatesJson) ? pkg.departureDatesJson : [];
  const departures = (rawDepartures.length > 0 ? rawDepartures : buildDefaultDepartures(priceNum)).map((dep) => {
    const titleStr = String(dep.title || '');
    const mMatch = titleStr.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})\b/i);
    const inferredMonth = mMatch ? mMatch[1].toUpperCase().slice(0, 3) : 'SEP';
    const inferredDay = mMatch ? mMatch[2].padStart(2, '0') : '05';
    const month = String(dep.month || '').trim().toUpperCase().slice(0, 3) || inferredMonth;
    const day = String(dep.day || '').trim() || inferredDay;
    return { ...dep, month, day };
  });
  const depMonths = Array.from(new Set(departures.map((d) => d.month)));
  const firstMonth = depMonths[0] || 'SEP';
  const monthCounts = {};

  const packing = (pkg.packingListJson && typeof pkg.packingListJson === 'object' && !Array.isArray(pkg.packingListJson))
    ? pkg.packingListJson
    : { intro: '', bannerTitle: '', bannerDesc: '', concludingNote: '', categories: [] };
  const rawPackingCats = Array.isArray(packing.categories) && packing.categories.length > 0
    ? packing.categories
    : buildDefaultPackingCategories(pkg.type === 'TOUR');
  const packingCats = rawPackingCats.map((cat, idx) => {
    const fallbackIcons = [
      { bg: '#FFF7ED', color: '#EA580C' },
      { bg: '#EFF6FF', color: '#1D4ED8' },
      { bg: '#F5F3FF', color: '#7C3AED' },
      { bg: '#ECFDF5', color: '#059669' },
      { bg: '#FEF3C7', color: '#D97706' },
      { bg: '#FFF1F2', color: '#E11D48' }
    ];
    const fb = fallbackIcons[idx % fallbackIcons.length];
    return {
      ...cat,
      slug: slugifyCat(cat.title),
      tabSvg: buildPackingCategorySvg(cat.title, 15),
      badgeSvg: buildPackingCategorySvg(cat.title, 20),
      bg: cat.bg || fb.bg,
      color: cat.color || fb.color,
      items: Array.isArray(cat.items) ? cat.items : []
    };
  });
  const totalPackingItems = packingCats.reduce((acc, c) => acc + c.items.length, 0);

  const readBefore = (pkg.readBeforeBookJson && typeof pkg.readBeforeBookJson === 'object' && !Array.isArray(pkg.readBeforeBookJson))
    ? pkg.readBeforeBookJson
    : { title: `Read Before You Book`, subtitle: '', secondarySubtitle: '', items: Array.isArray(pkg.readBeforeBookJson) ? pkg.readBeforeBookJson : [] };
  const detailTopics = Array.isArray(readBefore.items) && readBefore.items.length > 0
    ? readBefore.items
    : buildDefaultDetailTopics(pkg);

  const altObj = (pkg.altitudeProfileJson && typeof pkg.altitudeProfileJson === 'object') ? pkg.altitudeProfileJson : {};
  const overnightTable = Array.isArray(altObj.overnightTable) && altObj.overnightTable.length > 0
    ? altObj.overnightTable
    : (itineraryDays.length > 0
      ? itineraryDays.map((d) => ({ day: `Day ${d.dayNumber}`, stop: cleanDayTitle(d.title), altitude: d.altitudeM ? `${d.altitudeM.toLocaleString()} m` : '1,400 m' }))
      : [
          { day: '1', stop: 'Kathmandu Arrival', altitude: '1,400 m' },
          { day: `${Math.max(2, Math.floor((pkg.durationDays || 5) / 2))}`, stop: `${pkg.title} High Point`, altitude: pkg.maxAltitudeM ? `${pkg.maxAltitudeM.toLocaleString()} m` : '2,500 m' },
          { day: `${pkg.durationDays || 2}`, stop: 'Kathmandu Departure', altitude: '1,400 m' }
        ]);
  const higherPlaces = Array.isArray(altObj.higherPlaces) && altObj.higherPlaces.length > 0
    ? altObj.higherPlaces
    : [
        { tag: 'Highlight Point', altitude: pkg.maxAltitudeM ? `${pkg.maxAltitudeM.toLocaleString()} m` : 'Summit View', title: `${pkg.title} Panoramic High Point`, desc: 'Highest sightseeing / trail viewpoint reached during the day before returning to comfortable overnight altitude.' },
        { tag: 'Acclimatisation', altitude: 'Steady Gain', title: 'Built-In Acclimatisation & Pacing', desc: 'Scheduled elevation stops help every traveller adapt smoothly while enjoying cultural landmarks along the route.' }
      ];

  const weatherObj = (pkg.weatherProfileJson && typeof pkg.weatherProfileJson === 'object') ? pkg.weatherProfileJson : {};
  const seasonCards = Array.isArray(weatherObj.seasonCards) && weatherObj.seasonCards.length > 0
    ? weatherObj.seasonCards
    : [
        { tag: 'Peak Visibility', season: 'Autumn (Sep–Nov)', rangeDesc: 'Crisp blue skies & festive trails' },
        { tag: 'Wildflowers', season: 'Spring (Mar–May)', rangeDesc: 'Rhododendrons & pleasant days' },
        { tag: 'Peaceful Trails', season: 'Winter (Dec–Feb)', rangeDesc: 'Quiet lodges & golden sunsets' },
        { tag: 'Lush Valleys', season: 'Monsoon (Jun–Aug)', rangeDesc: 'Green hills & rainshadow options' }
      ];
  const seasonalTable = Array.isArray(weatherObj.seasonalTable) && weatherObj.seasonalTable.length > 0
    ? weatherObj.seasonalTable
    : [
        { season: 'Spring', months: 'March–May', expect: 'Warmer daytime temperatures, blooming rhododendron forests, and pleasant visibility on clear mornings.' },
        { season: 'Autumn', months: 'September–November', expect: 'Crisp post-monsoon air, reliable mountain views, and comfortable walking conditions across high passes.' },
        { season: 'Winter', months: 'December–February', expect: 'Peaceful lodges and bright sunny days with cold mornings and nights at higher elevations.' },
        { season: 'Monsoon', months: 'June–August', expect: 'Warm lush valleys and seasonal rain at lower elevations; ideal for rainshadow Tibetan-border corridors.' }
      ];

  const routeMapUrl = (pkg.routeMapMedia && (pkg.routeMapMedia.legacyLocalPath || pkg.routeMapMedia.secureUrl))
    || (tagsMeta.routeMap && tagsMeta.routeMap.imageUrl) || '';

  const expertCta = tagsMeta.expertCta || {};
  const bookingBanner = tagsMeta.bookingBanner || {};
  const bottomCta = tagsMeta.bottomCta || {};
  const sidebarBadge = tagsMeta.sidebarBadge || 'BEST SELLER';

  const faqs = Array.isArray(pkg.faqs) ? pkg.faqs : [];
  const faqCatMeta = Array.isArray(tagsMeta.faqCategories) && tagsMeta.faqCategories.length > 0 ? tagsMeta.faqCategories : FAQ_CAT_DEFAULTS;
  const recommendations = Array.isArray(pkg.recommendations) && pkg.recommendations.length > 0
    ? pkg.recommendations
    : (Array.isArray(pkg._fallbackRecommendations) ? pkg._fallbackRecommendations : []);
  const recPackagesList = recommendations.map((r) => r.recommendedPackage || r).filter(Boolean).slice(0, 4);

  const altRuntime = buildAltitudeRuntimeData(pkg, itineraryDays);
  const weatherRuntime = buildWeatherRuntimeData(pkg, itineraryDays);
  const routeBadgeImg = heroImgs[0].src;

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
<!-- cms-template: gold-standard-v2 -->
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
  <link rel="stylesheet" href="${prefix}index.css?v=41">
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
            <button type="button" class="btn btn-primary open-inquiry-btn mobile-drawer-cta" data-trek-title="${escapeHtml(fullDisplayTitle)}">Plan Custom Trip</button>
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
      <!-- Page Title Section -->
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

      <!-- Key Trip Facts Grid (Rule 8) -->
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

      <!-- Trust Badges Section (Matching EBC Gold Standard) -->
      <div class="container" style="margin-bottom: 30px;">
        <div class="trek-trust-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; background: #ffffff; border: 1px solid var(--color-neutral-100); padding: 14px 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
            <div style="width: 38px; height: 38px; background: #F2F4F6; color: #1A96C8; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--color-primary-navy); line-height: 1.3;">Govt-registered local Nepal agency</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: #ffffff; border: 1px solid var(--color-neutral-100); padding: 14px 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
            <div style="width: 38px; height: 38px; background: #F2F4F6; color: #1A96C8; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--color-primary-navy); line-height: 1.3;">10,000+ happy travellers</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: #ffffff; border: 1px solid var(--color-neutral-100); padding: 14px 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
            <div style="width: 38px; height: 38px; background: #F2F4F6; color: #1A96C8; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--color-primary-navy); line-height: 1.3;">Secure payment &middot; No hidden fees</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: #ffffff; border: 1px solid var(--color-neutral-100); padding: 14px 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
            <div style="width: 38px; height: 38px; background: #F2F4F6; color: #1A96C8; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--color-primary-navy); line-height: 1.3;">Instant confirmation</span>
          </div>
        </div>
      </div>

      <!-- Sticky Scroll-Spy Sub-Navigation Bar (Rule 18 + EBC SVG Icons) -->
      <div class="trek-sub-nav">
        <div class="container">
          <div class="trek-sub-nav-list">
            <button type="button" class="trek-sub-nav-btn active" data-tab="overview">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Overview
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="itinerary">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Itinerary
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="includes">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Includes &amp; Excludes
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="dates">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Dates &amp; Availability
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="packing">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>Packing List
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="details">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>Trip Details
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="${routeMapUrl ? 'map' : 'altitude-profile'}">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/></svg>${routeMapUrl ? 'Map' : 'Elevation'}
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="booking">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>Booking
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="reviews">
              <svg class="icon-svg icon-sm icon-margin-right icon-svg-fill" style="fill: currentColor; stroke: none;" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>Reviews
            </button>
            <button type="button" class="trek-sub-nav-btn" data-tab="faqs">
              <svg class="icon-svg icon-sm icon-margin-right" viewBox="0 0 24 24"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>FAQs
            </button>
          </div>
        </div>
      </div>

      <!-- Main 2-Column Content Layout & Sticky Sidebar -->
      <section class="section-padding" style="padding-top: 10px;" data-trek-details-wrapper data-trek-key="${escapeHtml(pkg.trekKey)}">
        <div class="container trek-detail-layout" style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 40px; align-items: stretch; position: relative;">
          <div style="min-width: 0;">

            <!-- Section 1: Overview & Highlights -->
            <section id="section-overview" class="trek-detail-section">
              <h2 class="trek-section-title">${escapeHtml(pkg.title)} Overview</h2>
              <div class="rte-overview-content" data-rte-overview>${pkg.overviewHtml || `<p>${escapeHtml(metaDesc)}</p>`}</div>

              <!-- Ask Experts WhatsApp CTA Banner Card -->
              <div class="trek-expert-cta-card">
                <div class="expert-cta-left">
                  <div class="expert-cta-badge-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8b5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div class="expert-cta-text-group">
                    <h3 class="expert-cta-title">${escapeHtml(expertCta.title || 'Want to know more about this trek?')}</h3>
                    <p class="expert-cta-subtitle">${escapeHtml(expertCta.subtitle || 'Chat with us — real Himalayan experts, not bots.')}</p>
                    <div class="expert-cta-status">
                      <span class="status-dot"></span>
                      <span>${escapeHtml(expertCta.status || 'Replies within 2–4 hours')}</span>
                    </div>
                  </div>
                </div>
                <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener" class="expert-whatsapp-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A96C8">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                  </svg>
                  <span>WhatsApp us</span>
                </a>
              </div>

              <!-- Rule 6 Gold-Standard Highlights Card -->
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 26px 0 30px;">
                <h2 style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; color: #0E3458;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F6851F" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>${escapeHtml(pkg.title)} Highlights</span>
                </h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 14px;">
                  ${highlights.map((h) => `
                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                      <span style="width: 24px; height: 24px; border-radius: 50%; background: #ECFDF5; border: 1px solid #10B981; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">${CHECK_SVG}</span>
                      <span style="font-size: 0.98rem; color: #334155; line-height: 1.55; font-weight: 500;">${escapeHtml(h)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Why Book With Us (EBC 4-Card SVG Icon Grid) -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--color-neutral-100, #E2E8F0); margin-bottom: 16px;">
                <div style="border-left: 4px solid var(--color-copper-orange, #F6851F); padding-left: 14px; margin-bottom: 12px;">
                  <h3 style="font-size: 1.45rem; margin: 0; color: var(--color-primary-navy, #0E3458); font-weight: 700;">${escapeHtml(tagsMeta.whyBookTitle || `Why Book ${pkg.title} with Igloo Himalaya Treks?`)}</h3>
                </div>
                <p style="color: var(--color-neutral-600, #475569); font-size: 1rem; margin-bottom: 22px; line-height: 1.6;">
                  ${escapeHtml(tagsMeta.whyBookIntro || 'We prepare every traveller in Kathmandu and provide seamless mountain logistics from arrival to departure:')}
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                  ${whyBookCards.map((c, idx) => `
                    <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 22px; display: flex; gap: 16px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03); transition: transform 0.2s ease, box-shadow 0.2s ease;">
                      <div style="width: 44px; height: 44px; background: #EEF6FF; color: #1A96C8; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        ${whyBookIcons[idx % whyBookIcons.length]}
                      </div>
                      <div>
                        <h4 style="font-size: 1.05rem; font-weight: 700; color: #0E3458; margin: 0 0 6px 0;">${escapeHtml(c.title)}</h4>
                        <p style="font-size: 0.92rem; color: #64748B; margin: 0; line-height: 1.55;">${escapeHtml(c.desc)}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>

            <!-- Section 2: Day-by-Day Itinerary (Rule 13) -->
            <section id="section-itinerary" class="trek-detail-section">
              <div class="itinerary-header-bar">
                <div>
                  <h2 class="trek-section-title" style="margin-bottom: 6px;">${escapeHtml(pkg.title)} Itinerary — Day by Day</h2>
                  <div style="width: 48px; height: 4px; background: var(--color-copper-orange, #F6851F); border-radius: 2px; margin-top: 8px; margin-bottom: 12px;"></div>
                  <p style="font-size: 1.02rem; color: var(--color-neutral-600); line-height: 1.6; margin: 0; max-width: 800px;">${escapeHtml(tagsMeta.itineraryIntro || `Our ${dayLabel.toLowerCase()} programme covers arrival, route stages, acclimatisation stops, and return travel. Times and elevations are approximate based on trail conditions.`)}</p>
                </div>
                <div class="itinerary-actions-wrapper">
                  <button id="toggle-all-itinerary" class="itinerary-toggle-all-btn" type="button">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    <span>Expand All Days</span>
                  </button>
                  <button id="itinerary-download-pdf-btn" class="itinerary-header-action-btn itinerary-pdf-trigger" type="button" onclick="window.handleItineraryPDFAction && window.handleItineraryPDFAction(this, event);" title="Download itinerary in PDF format">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download PDF
                  </button>
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
                          <p class="itinerary-day-subtitle-new" ${d.altitudeM ? `data-altitude-m="${d.altitudeM}"` : ''}>${escapeHtml(subParts.join(' — ') || 'Full trail schedule')}</p>
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
                              ${buildMetaItemHtml('#EEF2FF', '#4F46E5', '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 'TRAVEL TIME', d.durationHours)}
                              ${buildMetaItemHtml('#FFFBEB', '#D97706', '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>', 'DISTANCE', d.distanceKm)}
                              ${buildMetaItemHtml('#ECFDF5', '#059669', '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', 'STAY', d.accommodation)}
                              ${buildMetaItemHtml('#FFF1F2', '#E11D48', '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>', 'MEALS', d.meals)}
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

            <!-- Section 3: Cost Includes & Excludes (EBC 2-Column Card Style) -->
            <section id="section-includes" class="trek-detail-section">
              <div class="inc-exc-container">
                <div class="inc-exc-section-title-wrapper">
                  <h2 class="inc-exc-section-title">What’s Included in ${escapeHtml(pkg.title)}</h2>
                  <div style="width: 48px; height: 4px; background: var(--color-copper-orange, #F6851F); border-radius: 2px; margin-top: 8px;"></div>
                </div>
                <div class="inc-exc-grid">
                  ${(inclusions.length ? inclusions : [{ title: 'Experienced Guide Support', text: 'Licensed local guide and full Kathmandu trip coordination.' }]).map((item) => `
                    <div class="inc-exc-card">
                      <div class="inc-exc-icon-box">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange, #F6851F)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16 10 11 15 8 12"/></svg>
                      </div>
                      <div class="inc-exc-card-content">
                        <h4 class="inc-exc-card-title">${escapeHtml(typeof item === 'string' ? item : item.title)}</h4>
                        ${typeof item === 'object' && item.text ? `<p class="inc-exc-card-text">${escapeHtml(item.text)}</p>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>

                <div class="inc-exc-section-title-wrapper" style="margin-top: 10px;">
                  <h2 class="inc-exc-section-title">What’s Not Included in ${escapeHtml(pkg.title)}</h2>
                  <div style="width: 48px; height: 4px; background: var(--color-copper-orange, #F6851F); border-radius: 2px; margin-top: 8px;"></div>
                </div>
                <div class="inc-exc-grid">
                  ${(exclusions.length ? exclusions : [{ title: 'Personal Expenses & Insurance', text: 'International airfare, Nepal entry visa, travel insurance, and personal gratuities.' }]).map((item) => `
                    <div class="inc-exc-card exclude-card">
                      <div class="inc-exc-icon-box">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      </div>
                      <div class="inc-exc-card-content">
                        <h4 class="inc-exc-card-title">${escapeHtml(typeof item === 'string' ? item : item.title)}</h4>
                        ${typeof item === 'object' && item.text ? `<p class="inc-exc-card-text">${escapeHtml(item.text)}</p>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>

            <!-- Section 4: Dates & Availability (EBC Dual-Mode Interactive Calendar + Group Departures) -->
            <section id="section-dates" class="trek-detail-section">
              <div class="dates-section-header">
                <h2 class="trek-section-title" style="margin-bottom: 0;">${escapeHtml(pkg.title)} Dates &amp; Availability</h2>
                <div class="dates-mode-toggle">
                  <button type="button" class="dates-mode-btn active" data-mode="group">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Group Departures
                  </button>
                  <button type="button" class="dates-mode-btn" data-mode="private">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Private Trip Dates
                  </button>
                </div>
              </div>

              <div style="margin-bottom: 24px; color: var(--color-neutral-600); font-size: 0.98rem; line-height: 1.6;">
                <p style="margin-bottom: 8px;"><strong>Group Departures:</strong> Join scheduled small groups at competitive per-person pricing. ${escapeHtml(pricing.intro || '')}</p>
                <p style="margin-bottom: 0;"><strong>Private Trip Dates:</strong> Travelling with friends, family, or solo? Pick your own start date on the interactive calendar below and we tailor everything to you.</p>
              </div>

              <div style="background: white; border-radius: 12px; border: 1px solid #E2E8F0; padding: 24px; margin-bottom: 28px; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);">
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 8px; font-weight: 700;">Starting Prices by Group Size</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.92rem; margin-bottom: 18px;">Prices are in US dollars per person. Contact us with your travel dates and group size to confirm availability.</p>
                <div class="dates-tier-cards-grid">
                  ${priceTiers.map((t, idx) => {
                    const hasExplicitBest = priceTiers.some((x) => x.highlight || /best/i.test(x.note || ''));
                    const isBest = Boolean(t.highlight || /best/i.test(t.note || '') || (!hasExplicitBest && idx === 2));
                    return `
                    <div style="background: ${isBest ? '#F0FDF4' : '#F8FAFC'}; border: ${isBest ? '1.5px solid #10B981' : '1.5px solid #E2E8F0'}; border-radius: 10px; padding: 16px; text-align: center;">
                      <span style="font-size: 0.85rem; color: ${isBest ? '#065F46' : '#64748B'}; font-weight: 600; display: block; margin-bottom: 6px;">${escapeHtml(t.label)}</span>
                      <strong style="font-size: 1.45rem; color: ${isBest ? '#065F46' : 'var(--color-primary-navy, #0E3458)'}; display: block;">${escapeHtml(t.price)}</strong>
                      ${t.note ? `<span style="font-size: 0.75rem; color: ${isBest ? '#059669' : '#1A96C8'}; font-weight: 700; text-transform: uppercase;">${escapeHtml(t.note)}</span>` : ''}
                    </div>`;
                  }).join('')}
                </div>
              </div>

              ${priceTableRows.length > 0 ? `
                <div style="overflow-x: auto; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 24px; background: #FFFFFF;">
                  <table class="dates-table" style="width: 100%; border-collapse: collapse;">
                    <thead><tr><th style="padding: 12px; background: #F8FAFC; text-align: left;">Booking Category</th><th style="padding: 12px; background: #F8FAFC; text-align: left;">Price Status</th><th style="padding: 12px; background: #F8FAFC; text-align: left;">Action</th></tr></thead>
                    <tbody>
                      ${priceTableRows.map((r) => `
                        <tr>
                          <td style="padding: 12px; border-top: 1px solid #E2E8F0;">${escapeHtml(r.category)}</td>
                          <td style="padding: 12px; border-top: 1px solid #E2E8F0;">${escapeHtml(r.status)}</td>
                          <td style="padding: 12px; border-top: 1px solid #E2E8F0;"><button type="button" class="btn-book-now open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}">Inquire</button></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}

              <div class="dates-card-container">
                <div id="dates-group-view" class="dates-view-pane active">
                  <div class="dates-group-topbar">
                    <span class="dates-year-badge">2026</span>
                    <div class="dates-month-tabs">
                      ${depMonths.map((m, idx) => `<button type="button" class="dates-month-tab ${idx === 0 ? 'active' : ''}" data-month="${escapeHtml(m)}">${escapeHtml(m)}</button>`).join('')}
                    </div>
                  </div>
                  <div class="dates-departure-list">
                    ${departures.map((dep) => {
                      const rowMonth = dep.month;
                      monthCounts[rowMonth] = (monthCounts[rowMonth] || 0) + 1;
                      const isExtra = monthCounts[rowMonth] > 5;
                      const isFirstVisible = rowMonth === firstMonth && !isExtra;
                      const rawPrice = String(dep.price || `$${priceNum.toLocaleString()}`).trim();
                      const priceNumberOnly = rawPrice.replace(/\s*pp$/i, '').trim();
                      return `
                        <div class="departure-item-row${isExtra ? ' extra-date' : ''}" data-month="${escapeHtml(rowMonth)}" style="display: ${isFirstVisible ? 'flex' : 'none'};">
                          <div class="departure-date-badge">
                            <div class="calendar-ring-dots"><span></span><span></span><span></span></div>
                            <div class="calendar-day-num">${escapeHtml(dep.day)}</div>
                            <div class="calendar-month-txt">${escapeHtml(rowMonth)}</div>
                          </div>
                          <div class="departure-info">
                            <h4 class="departure-title">${escapeHtml(dep.title)}</h4>
                            <span class="departure-status-pill">${escapeHtml(dep.status || 'AVAILABLE')}</span>
                          </div>
                          <div class="departure-action">
                            <div class="departure-price"><span class="price-val">${escapeHtml(priceNumberOnly)}</span> <span class="price-unit">pp</span></div>
                            <button type="button" class="btn-book-now open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}">Book Now</button>
                          </div>
                        </div>`;
                    }).join('')}
                  </div>
                  <div class="dates-load-more-wrapper">
                    <button type="button" id="btn-load-more-dates" class="btn-load-more-dates">Load more dates</button>
                  </div>
                </div>

                <div id="dates-private-view" class="dates-view-pane" style="display: none;">
                  <div class="private-dates-header">
                    <div class="private-dates-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div>
                      <h3 class="private-dates-title">Choose Your Departure Date</h3>
                      <p class="private-dates-desc">Plan your ${escapeHtml(fullDisplayTitle)} with flexible dates tailored around your travel window.</p>
                    </div>
                  </div>
                  <div class="dual-calendar-card">
                    <div id="dual-calendar-mount" class="dual-calendar-mount"></div>
                    <div class="calendar-footer-meta">
                      <div class="legend-item"><span class="sold-out-dot"></span> Sold out dates</div>
                      <div class="discount-note">Group-size discounts will be applied in the next step.</div>
                    </div>
                  </div>
                  <div class="private-dates-action-bar">
                    <span id="private-selected-date-text" class="private-selected-prompt">Select a start date from the calendar.</span>
                    <button type="button" id="btn-select-private-date" class="btn-select-dates open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}" disabled>Select dates &#8599;</button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 5: Packing & Equipment Checklist (EBC Controls, Progress Pill, Filter Tabs & Categories) -->
            <section id="section-packing" class="trek-detail-section">
              <div class="packing-header-bar">
                <div class="packing-header-left">
                  <h2 class="trek-section-title" style="margin-bottom: 8px;">What to Pack for ${escapeHtml(pkg.title)}</h2>
                  <p style="color: var(--color-neutral-600); font-size: 1.02rem; line-height: 1.6; margin: 0; max-width: 780px;">${escapeHtml(packing.intro || 'Pack layers for warmer daytime stages, cold mornings and evenings, and changing weather at higher elevations. Keep water, extra layers, and documents in your daypack.')}</p>
                </div>
                <div class="packing-header-right">
                  <div class="packing-progress-pill">
                    <div class="packing-progress-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <div class="packing-progress-text">Packed: <strong><span class="gear-checked-count">0</span> / <span class="gear-total-count">${totalPackingItems}</span></strong> Items</div>
                    <span class="packing-progress-badge gear-progress-percent">0%</span>
                  </div>
                  <div class="packing-actions-row">
                    <button type="button" class="packing-action-btn" onclick="window.print();">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                      Print Checklist
                    </button>
                    <button type="button" id="btn-check-all-gear" class="packing-action-btn">Check All</button>
                    <button type="button" id="btn-reset-gear" class="packing-action-btn">Reset</button>
                  </div>
                </div>
              </div>

              <div class="packing-rental-banner">
                <div class="packing-rental-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><polyline points="10 6 14 10 10 14"/></svg>
                </div>
                <div class="packing-rental-content">
                  <h4 class="packing-rental-title">${escapeHtml(packing.bannerTitle || 'Complimentary Equipment Provided by Igloo')}<span class="packing-rental-badge">Included Free</span></h4>
                  <p class="packing-rental-desc">${escapeHtml(packing.bannerDesc || 'We provide an expedition-grade 4-season down sleeping bag (-20°C rated), a warm down jacket, and an 80L waterproof duffel bag in Kathmandu for use on high-altitude routes.')}</p>
                </div>
              </div>

              <div class="packing-category-tabs">
                <button type="button" class="packing-tab-btn active" data-category="all"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> All Categories <span class="tab-count-bubble">${totalPackingItems}</span></button>
                ${packingCats.map((cat) => `<button type="button" class="packing-tab-btn" data-category="${escapeHtml(cat.slug)}">${cat.tabSvg} ${escapeHtml(cat.title)} <span class="tab-count-bubble">${cat.items.length}</span></button>`).join('')}
              </div>

              <div class="packing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 18px;">
                ${packingCats.map((cat, cIdx) => `
                  <div class="gear-section packing-category-card" data-category="${escapeHtml(cat.slug)}" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px;">
                    <div class="gear-cat-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                      <span class="gear-cat-icon-badge" style="background: ${cat.bg}; color: ${cat.color};">${cat.badgeSvg}</span>
                      <h3 class="gear-section-title" style="margin: 0; font-size: 1.1rem; color: #0E3458;">${escapeHtml(cat.title)}</h3>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      ${cat.items.map((it, iIdx) => `
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
              ${packing.concludingNote ? `<div class="packing-concluding-note" style="margin-top: 18px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 10px; padding: 14px 18px;"><p style="margin: 0; font-size: 0.92rem; color: #334155;">${escapeHtml(packing.concludingNote)}</p></div>` : ''}
            </section>

            <!-- Section 6: Read Before You Book (EBC Standalone Section with Ring Tracker) -->
            <section id="section-details" class="trek-detail-section">
              <div class="details-section-container">
                <div class="details-header-bar">
                  <div>
                    <div class="details-title-wrapper">
                      <h2 class="details-main-title">${escapeHtml(readBefore.title || 'Read Before You Book')}</h2>
                      <div style="width: 48px; height: 4px; background: var(--color-copper-orange, #F6851F); border-radius: 2px; margin-top: 8px;"></div>
                    </div>
                    <p class="details-subtitle-text" style="margin-top: 12px; margin-bottom: 4px;">${escapeHtml(readBefore.subtitle || `Before booking ${pkg.title}, review the route pacing, altitude precautions, accommodation standard, and permit arrangements below.`)}</p>
                    <p class="details-subtitle-text" style="margin-bottom: 0;">${readBefore.secondarySubtitle || `Need advice before booking? Feel free to <a href="https://wa.me/${escapeHtml(whatsappDigits)}" target="_blank" rel="noopener">WhatsApp us</a> directly.`}</p>
                  </div>
                  <div class="details-header-actions">
                    <button type="button" class="details-toggle-all-btn details-expand-all-btn" id="expand-all-details">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                      <span>Expand All Topics</span>
                    </button>
                    <button type="button" class="details-toggle-all-btn details-collapse-all-btn" id="collapse-all-details">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                      <span>Collapse All Topics</span>
                    </button>
                  </div>
                </div>

                <div class="details-progress-wrapper">
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

                <div class="detail-accordion-list">
                  ${detailTopics.map((topic, idx) => `
                    <div class="detail-accordion-card" data-detail-id="${escapeHtml(topic.id || `topic-${idx + 1}`)}">
                      <div class="detail-accordion-header">
                        <div class="detail-accordion-header-left">
                          <div class="detail-icon-container">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
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
              </div>
            </section>

            <!-- Section 7: Elevation Profile (Standalone Section matching EBC) -->
            <section id="section-altitude-profile" class="trek-detail-section">
              <div class="details-title-wrapper" style="margin-bottom: 24px;">
                <h2 class="details-main-title">${escapeHtml(altObj.sectionTitle || `Altitude Profile of ${pkg.title}`)}</h2>
                <div style="width: 48px; height: 4px; background: var(--color-copper-orange, #F6851F); border-radius: 2px; margin-top: 8px;"></div>
              </div>
              <p style="color: var(--color-neutral-700); font-size: 1.02rem; line-height: 1.7; margin-bottom: 20px;">${escapeHtml(altObj.intro || 'Interactive elevation map showing daily gain and acclimatisation stopping points. Switch units below to convert between meters (m) and feet (ft).')}</p>
              <div style="background: white; padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--color-neutral-100); box-shadow: var(--shadow-sm); margin-bottom: 30px;">
                <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 20px;">Interactive elevation profile along the itinerary stages.</p>
                <div id="altitude-chart-wrapper" data-trek-key="${escapeHtml(pkg.trekKey)}"></div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 30px;">
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px;">
                  <h3 style="font-size: 1.15rem; margin-bottom: 14px; color: var(--color-primary-navy); font-weight: 700;">Overnight Altitudes</h3>
                  <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; text-align: left;">
                      <thead>
                        <tr style="border-bottom: 2px solid #e2e8f0; color: #475569;">
                          <th style="padding: 8px 10px;">Day</th>
                          <th style="padding: 8px 10px;">Overnight Stop</th>
                          <th style="padding: 8px 10px; text-align: right;">Approx. Altitude</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${overnightTable.map((row) => `
                          <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 7px 10px;">${escapeHtml(row.day)}</td>
                            <td style="padding: 7px 10px;">${escapeHtml(row.stop)}</td>
                            <td style="padding: 7px 10px; text-align: right;">${escapeHtml(row.altitude)}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div style="background: #F8FAFC; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px;">
                  <h3 style="font-size: 1.15rem; margin-bottom: 14px; color: var(--color-primary-navy); font-weight: 700;">Higher Places You Visit</h3>
                  <ul style="list-style: none; padding: 0; margin: 0 0 16px 0; display: flex; flex-direction: column; gap: 12px; font-size: 0.94rem; color: var(--color-neutral-700);">
                    ${higherPlaces.map((hp) => `
                      <li style="display: flex; gap: 10px; align-items: flex-start;">
                        <span style="color: #1A96C8; font-weight: 700;">&bull;</span>
                        <div><strong>${escapeHtml(hp.title)}${hp.altitude ? ` (${escapeHtml(hp.altitude)})` : ''}:</strong> ${escapeHtml(hp.desc || '')}</div>
                      </li>
                    `).join('')}
                  </ul>
                  <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; font-size: 0.88rem; color: #475569; line-height: 1.5;">
                    <svg class="icon-svg icon-lightbulb" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg> Gradual elevation scheduling allows your body time to acclimatise before reaching the highest section of the itinerary.
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 8: Weather & Best Time (Matching EBC Cards + Advice Grid) -->
            <section id="section-weather" class="trek-detail-section">
              <div class="details-title-wrapper" style="margin-bottom: 24px;">
                <h2 class="details-main-title">${escapeHtml(weatherObj.sectionTitle || `Weather and Best Time for ${pkg.title}`)}</h2>
                <div style="width: 48px; height: 4px; background: var(--color-copper-orange, #F6851F); border-radius: 2px; margin-top: 8px;"></div>
              </div>
              <p style="font-size: 1.02rem; color: var(--color-neutral-700); line-height: 1.7; margin-bottom: 20px;">${escapeHtml(weatherObj.intro || 'Spring (March–May) and autumn (September–November) generally provide the clearest visibility and most comfortable temperatures along Himalayan routes.')}</p>
              <div style="background: white; padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--color-neutral-100); box-shadow: var(--shadow-sm); margin-bottom: 30px;">
                <div id="weather-chart-wrapper" data-trek-key="${escapeHtml(pkg.trekKey)}"></div>
              </div>

              <div class="alt-stats-grid" style="margin-bottom: 24px;">
                ${seasonCards.map((sc) => `
                  <div class="alt-stat-card">
                    <div class="alt-stat-header"><span class="alt-stat-tag">${escapeHtml(sc.tag || 'Season')}</span></div>
                    <div class="alt-stat-value">${escapeHtml(sc.season)}</div>
                    <div class="alt-stat-label">${escapeHtml(sc.rangeDesc)}</div>
                  </div>
                `).join('')}
              </div>

              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
                <h3 style="font-size: 1.2rem; color: var(--color-primary-navy); margin-bottom: 16px; font-weight: 700;">Seasonal Weather Conditions</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
                  ${seasonalTable.map((row, idx) => {
                    const pillColors = [
                      { bg: '#DCFCE7', col: '#166534' },
                      { bg: '#DCFCE7', col: '#166534' },
                      { bg: '#E0E7FF', col: '#3730A3' },
                      { bg: '#FEF3C7', col: '#92400E' }
                    ];
                    const pc = pillColors[idx % pillColors.length];
                    return `
                      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                          <strong style="color: #0E3458; font-size: 1.05rem;">${escapeHtml(row.season)}</strong>
                          <span style="font-size: 0.8rem; background: ${pc.bg}; color: ${pc.col}; font-weight: 700; padding: 2px 8px; border-radius: 12px;">${escapeHtml(row.months)}</span>
                        </div>
                        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0;">${escapeHtml(row.expect)}</p>
                      </div>`;
                  }).join('')}
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div style="background: #F8FAFC; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
                  <h4 style="font-size: 1.1rem; color: var(--color-primary-navy); margin-bottom: 8px; font-weight: 700;">${escapeHtml(weatherObj.routeChangeTitle || 'How Weather Changes Along the Route')}</h4>
                  <p style="font-size: 0.92rem; color: var(--color-neutral-700); line-height: 1.6; margin: 0;">${escapeHtml(weatherObj.routeChangeText || 'Daytime stages feel pleasant in sunshine at lower stops, becoming progressively cooler as altitude increases, especially before sunrise and after sunset. Wind-exposed passes require warm layering.')}</p>
                </div>
                <div style="background: #F8FAFC; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
                  <h4 style="font-size: 1.1rem; color: var(--color-primary-navy); margin-bottom: 8px; font-weight: 700;">${escapeHtml(weatherObj.bestSeasonTitle || 'Which Season Should You Choose?')}</h4>
                  <p style="font-size: 0.92rem; color: var(--color-neutral-700); line-height: 1.6; margin: 0;">${escapeHtml(weatherObj.bestSeasonText || 'Choose spring (March–May) for warmer trails and wildflowers, or autumn (October–November) for the crispest panoramic skies. Winter and summer departures suit flexible travellers.')}</p>
                </div>
              </div>
            </section>

            ${routeMapUrl ? `
              <!-- Section: Route Map (EBC Card with Toolbar + Lightbox Modal) -->
              <section id="section-map" class="trek-detail-section" style="margin-bottom: 50px; scroll-margin-top: 140px;">
                <div style="margin-bottom: 20px;">
                  <h2 class="trek-section-title" style="margin-bottom: 8px; font-size: 1.85rem; font-weight: 700; color: #0E3458;">${escapeHtml((tagsMeta.routeMap && tagsMeta.routeMap.title) || `${pkg.title} Route Map`)}</h2>
                  <div style="width: 48px; height: 4px; background: var(--color-copper-orange, #F6851F); border-radius: 2px; margin-top: 8px;"></div>
                </div>
                <p style="color: var(--color-neutral-600, #475569); font-size: 1.05rem; line-height: 1.6; margin: 0 0 24px 0;">${escapeHtml((tagsMeta.routeMap && tagsMeta.routeMap.subtitle) || `Topographic route overview for ${fullDisplayTitle}.`)}</p>
                <div class="map-card" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); position: relative; margin-bottom: 25px;">
                  <div style="position: relative; overflow: hidden; cursor: zoom-in;" onclick="document.getElementById('map-modal-${escapeHtml(pkg.slug)}').style.display='flex'">
                    <img id="trek-route-map-img" src="${escapeHtml(toRelMedia(routeMapUrl, prefix))}" alt="${escapeHtml(`${pkg.title} Route Map`)}" style="width: 100%; height: auto; display: block;">
                    <div style="position: absolute; top: 16px; left: 16px; background: rgba(255, 255, 255, 0.94); color: #0E3458; border: 1px solid #E2E8F0; padding: 6px 14px; border-radius: 20px; font-size: 0.80rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#F6851F"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span>Official Route Map</span>
                    </div>
                    <div style="position: absolute; bottom: 16px; right: 16px; background: rgba(10, 37, 64, 0.88); color: #FFFFFF; padding: 8px 18px; border-radius: 30px; font-size: 0.84rem; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
                      <span>Click to Enlarge Map</span>
                    </div>
                  </div>
                  <div style="background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                    <span style="font-size: 0.85rem; color: #475569;"><strong style="color: #0E3458;">Standard:</strong> High-Resolution Topographic Map</span>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <a href="${escapeHtml(toRelMedia(routeMapUrl, prefix))}" target="_blank" download class="btn-sm" style="display: inline-flex; align-items: center; gap: 6px; background: #FFFFFF; border: 1px solid #CBD5E1; color: #0E3458; font-size: 0.82rem; font-weight: 600; padding: 6px 14px; border-radius: 6px; text-decoration: none;">Download Map</a>
                      <a href="${escapeHtml(toRelMedia(routeMapUrl, prefix))}" target="_blank" rel="noopener" class="btn-sm" style="display: inline-flex; align-items: center; gap: 6px; background: #0E3458; color: #FFFFFF; font-size: 0.82rem; font-weight: 600; padding: 6px 14px; border-radius: 6px; text-decoration: none;">Full Screen</a>
                    </div>
                  </div>
                </div>
                <div id="map-modal-${escapeHtml(pkg.slug)}" style="display: none; position: fixed; inset: 0; background: rgba(10, 37, 64, 0.92); z-index: 9999; align-items: center; justify-content: center; padding: 20px;" onclick="if(event.target === this) this.style.display='none'">
                  <div style="position: relative; max-width: 95vw; max-height: 95vh; background: #FFFFFF; border-radius: 12px; overflow: hidden;">
                    <button type="button" onclick="document.getElementById('map-modal-${escapeHtml(pkg.slug)}').style.display='none'" style="position: absolute; top: 14px; right: 14px; z-index: 10; background: rgba(0,0,0,0.6); border: none; color: #FFFFFF; width: 36px; height: 36px; border-radius: 50%; cursor: pointer;" aria-label="Close Map Modal">&times;</button>
                    <img src="${escapeHtml(toRelMedia(routeMapUrl, prefix))}" alt="${escapeHtml(`${pkg.title} Full Route Map`)}" style="max-width: 100%; max-height: 90vh; object-fit: contain; display: block;" />
                  </div>
                </div>
              </section>
            ` : ''}

            <!-- Section 9: Booking Redirect CTA -->
            <section id="section-booking" class="trek-detail-section">
              <h2 class="trek-section-title">${escapeHtml(bookingBanner.title || `Book ${pkg.title}`)}</h2>
              <p style="color: var(--color-neutral-700); font-size: 1.05rem; line-height: 1.7; margin-bottom: 16px;">${escapeHtml(bookingBanner.body || `Share your preferred travel dates, number of travellers, and any questions. We will check availability and confirm the full price and route arrangements for ${fullDisplayTitle}.`)}</p>
              <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 20px;">
                <button type="button" class="btn open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}" style="padding: 14px 28px; background: #F6851F; color: #FFFFFF; border: none; border-radius: 50px; font-size: 1.05rem; font-weight: 800; cursor: pointer; box-shadow: 0 4px 14px rgba(246, 133, 31, 0.35);">Enquire Now</button>
                <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: #25D366; color: #FFFFFF; border: none; border-radius: 50px; font-size: 1.05rem; font-weight: 700; text-decoration: none; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
                  WhatsApp Inquiry
                </a>
              </div>
            </section>

            <!-- Section 10: Reviews (Rule 17 Gold Standard 3-Tab Structure + 4 Video Cards + Platform Tabs + Modal) -->
            <section id="section-reviews" class="trek-detail-section">
              <h2 class="trek-section-title" style="font-size: 2.1rem; margin-bottom: 8px; text-align: left;">Traveler Reviews &amp; Verified Feedback</h2>
              <p style="color: var(--color-neutral-600); font-size: 1.02rem; margin-bottom: 24px; text-align: left;">Over 15,000 adventure travellers have explored the Himalayas and sacred routes with Igloo Himalaya Treks.</p>

              <div class="review-tabs-container">
                <button type="button" class="review-tab-btn active" data-target="reviews-video-pane">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                  Video Reviews
                </button>
                <button type="button" class="review-tab-btn" data-target="reviews-customer-pane">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Customer Reviews
                </button>
                <button type="button" class="review-tab-btn" data-target="reviews-platform-pane">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Platform Reviews
                </button>
              </div>

              <!-- Tab 1: Video Reviews -->
              <div id="reviews-video-pane" class="review-pane-content active">
                <div class="video-reviews-grid">
                  <div class="video-review-card" data-video-url="${prefix}video/reviews/InShot_20261015_125657180.mp4" data-trekker="Paul &amp; Team" data-trek="${escapeHtml(pkg.title)} Group">
                    <img src="${prefix}images/video-thumb-review-5.webp" alt="Paul and Team Video Review" class="video-card-bg" loading="lazy">
                    <div class="video-card-badge-top"><span class="video-rating-pill">${STAR_SVG} 5.0</span><span class="video-date-pill">25 October</span></div>
                    <button type="button" class="video-play-btn" aria-label="Play video review"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0E3458"><polygon points="8 5 19 12 8 19 8 5"/></svg></button>
                    <div class="video-card-user-info">
                      <div class="video-user-avatar"><img src="${prefix}images/video-thumb-review-5.webp" alt="Paul &amp; Team Avatar"><span class="verified-check">${BLUE_CHECK_SVG}</span></div>
                      <div class="video-user-meta"><div class="video-user-name">Paul &amp; Team <span class="blue-check">${BLUE_CHECK_SVG}</span></div><div class="video-user-trek">${escapeHtml(pkg.title)} Group</div></div>
                    </div>
                  </div>
                  <div class="video-review-card" data-video-url="${prefix}video/reviews/InShot_20261015_130001483.mp4" data-trekker="Natalia" data-trek="Solo Female Traveller">
                    <img src="${prefix}images/video-thumb-review-7.webp" alt="Natalia Video Review" class="video-card-bg" loading="lazy">
                    <div class="video-card-badge-top"><span class="video-rating-pill">${STAR_SVG} 5.0</span><span class="video-date-pill">18 November</span></div>
                    <button type="button" class="video-play-btn" aria-label="Play video review"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0E3458"><polygon points="8 5 19 12 8 19 8 5"/></svg></button>
                    <div class="video-card-user-info">
                      <div class="video-user-avatar"><img src="${prefix}images/video-thumb-review-7.webp" alt="Natalia Avatar"><span class="verified-check">${BLUE_CHECK_SVG}</span></div>
                      <div class="video-user-meta"><div class="video-user-name">Natalia <span class="blue-check">${BLUE_CHECK_SVG}</span></div><div class="video-user-trek">Solo Female Traveller</div></div>
                    </div>
                  </div>
                  <div class="video-review-card" data-video-url="${prefix}video/reviews/InShot_20261015_125122577.mp4" data-trekker="Dave &amp; Jo" data-trek="Hospitality &amp; Sherpas">
                    <img src="${prefix}images/video-thumb-review-6.webp" alt="Dave and Jo Video Review" class="video-card-bg" loading="lazy">
                    <div class="video-card-badge-top"><span class="video-rating-pill">${STAR_SVG} 5.0</span><span class="video-date-pill">04 November</span></div>
                    <button type="button" class="video-play-btn" aria-label="Play video review"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0E3458"><polygon points="8 5 19 12 8 19 8 5"/></svg></button>
                    <div class="video-card-user-info">
                      <div class="video-user-avatar"><img src="${prefix}images/video-thumb-review-6.webp" alt="Dave &amp; Jo Avatar"><span class="verified-check">${BLUE_CHECK_SVG}</span></div>
                      <div class="video-user-meta"><div class="video-user-name">Dave &amp; Jo <span class="blue-check">${BLUE_CHECK_SVG}</span></div><div class="video-user-trek">Hospitality &amp; Sherpas</div></div>
                    </div>
                  </div>
                  <div class="video-review-card" data-video-url="${prefix}video/reviews/InShot_20261015_124403631.mp4" data-trekker="Moli" data-trek="High-Altitude Journey">
                    <img src="${prefix}images/video-thumb-review-1.webp" alt="Moli Video Review" class="video-card-bg" loading="lazy">
                    <div class="video-card-badge-top"><span class="video-rating-pill">${STAR_SVG} 4.9</span><span class="video-date-pill">12 October</span></div>
                    <button type="button" class="video-play-btn" aria-label="Play video review"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0E3458"><polygon points="8 5 19 12 8 19 8 5"/></svg></button>
                    <div class="video-card-user-info">
                      <div class="video-user-avatar"><img src="${prefix}images/video-thumb-review-1.webp" alt="Moli Avatar"><span class="verified-check">${BLUE_CHECK_SVG}</span></div>
                      <div class="video-user-meta"><div class="video-user-name">Moli <span class="blue-check">${BLUE_CHECK_SVG}</span></div><div class="video-user-trek">High-Altitude Journey</div></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 2: Customer Written Reviews -->
              <div id="reviews-customer-pane" class="review-pane-content" style="display: none;">
                <div class="customer-reviews-stack">
                  <div class="customer-review-card">
                    <div class="customer-review-header">
                      <div class="reviewer-profile">
                        <img src="${prefix}images/avatar-madeline.png" alt="Madeline Thomson" class="reviewer-avatar">
                        <div class="reviewer-info">
                          <div class="reviewer-name-row"><span class="reviewer-name">Madeline Thomson</span><span class="reviewer-country">&middot; AUSTRALIA</span></div>
                          <div class="review-date-txt">16th June 2026</div>
                        </div>
                      </div>
                      <div class="verified-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Verified Purchase</div>
                    </div>
                    <div class="review-rating-row">
                      <span class="stars-gold">${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}</span>
                      <h3 class="review-heading-title">Unforgettable ${escapeHtml(pkg.title)} Journey</h3>
                    </div>
                    <div class="review-meta-subline">Review for ${escapeHtml(fullDisplayTitle)} &middot; <a href="#section-dates" class="book-trek-link">Book this trip</a></div>
                    <div class="review-body-text">
                      <p class="review-text-content">Our experience with Igloo Himalaya Treks went beyond every expectation. From airport pickup in Kathmandu to every mountain stop, Sagar and the team kept us comfortable, well-acclimatised, and well-fed throughout the journey.</p>
                    </div>
                    <div class="review-photos-grid">
                      <img src="${escapeHtml(heroImgs[0].src)}" alt="${escapeHtml(heroImgs[0].alt)}" class="review-photo-thumb">
                      <img src="${escapeHtml(heroImgs[1].src)}" alt="${escapeHtml(heroImgs[1].alt)}" class="review-photo-thumb">
                      <img src="${escapeHtml(heroImgs[2].src)}" alt="${escapeHtml(heroImgs[2].alt)}" class="review-photo-thumb">
                    </div>
                    <div class="customer-review-footer">
                      <div class="guided-by-tag"><img src="${prefix}images/avatar-sagar.png" alt="Sagar Gurung" class="guide-avatar-sm"> Guided by <strong>Sagar Gurung</strong></div>
                      <button type="button" class="helpful-vote-btn" data-votes="15"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> Helpful (<span class="vote-count">15</span>)</button>
                    </div>
                  </div>
                  <div class="customer-review-card">
                    <div class="customer-review-header">
                      <div class="reviewer-profile">
                        <img src="${prefix}images/avatar-brenna.png" alt="Brenna Shaw" class="reviewer-avatar">
                        <div class="reviewer-info">
                          <div class="reviewer-name-row"><span class="reviewer-name">Brenna Shaw</span><span class="reviewer-country">&middot; UNITED STATES</span></div>
                          <div class="review-date-txt">9th June 2026</div>
                        </div>
                      </div>
                      <div class="verified-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Verified Purchase</div>
                    </div>
                    <div class="review-rating-row">
                      <span class="stars-gold">${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}</span>
                      <h3 class="review-heading-title">5+++ stars for Igloo Himalaya Treks</h3>
                    </div>
                    <div class="review-meta-subline">Review for ${escapeHtml(fullDisplayTitle)} &middot; <a href="#section-dates" class="book-trek-link">Book this trip</a></div>
                    <div class="review-body-text">
                      <p class="review-text-content">Absolute 5-star planning from start to finish. Daily safety checks, clean accommodation arrangements, and zero hidden costs. Highly recommend booking directly with Igloo Himalaya Treks!</p>
                    </div>
                    <div class="customer-review-footer">
                      <div class="guided-by-tag"><img src="${prefix}images/avatar-sagar.png" alt="Sagar Gurung" class="guide-avatar-sm"> Guided by <strong>Sagar Gurung</strong></div>
                      <button type="button" class="helpful-vote-btn" data-votes="22"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> Helpful (<span class="vote-count">22</span>)</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 3: Platform Reviews -->
              <div id="reviews-platform-pane" class="review-pane-content" style="display: none;">
                <div class="platform-sub-tabs-wrapper">
                  <div class="platform-sub-tabs">
                    <button type="button" class="platform-sub-tab active" data-platform="google">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
                      Google Reviews
                    </button>
                    <button type="button" class="platform-sub-tab" data-platform="tripadvisor">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#00AA6C"><circle cx="12" cy="12" r="10"/></svg>
                      TripAdvisor
                    </button>
                    <button type="button" class="platform-sub-tab" data-platform="trustpilot">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#00B67A"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      Trustpilot
                    </button>
                  </div>
                </div>
                <div class="platform-summary-card">
                  <div class="summary-left">
                    <span class="stars-gold">${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}</span>
                    <span class="summary-score">4.9</span>
                    <span class="summary-count" id="platform-summary-count">(1,549 Verified Reviews)</span>
                  </div>
                  <button type="button" class="btn-leave-review open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}">Leave a Review</button>
                </div>
                <div class="customer-reviews-stack" id="platform-cards-container">
                  <div class="customer-review-card platform-review-item" data-platform="google">
                    <div class="customer-review-header">
                      <div class="reviewer-profile"><img src="${prefix}images/avatar-madeline.png" alt="Madeline Thomson" class="reviewer-avatar"><div class="reviewer-info"><div class="reviewer-name-row"><span class="reviewer-name">Madeline Thomson</span><span class="reviewer-country">&middot; AUSTRALIA</span></div><div class="review-date-txt">16th June 2026</div></div></div>
                      <div class="verified-badge">Verified Purchase</div>
                    </div>
                    <div class="review-rating-row"><span class="stars-gold">${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}</span><h3 class="review-heading-title">Seamless Planning &amp; Expert Team</h3></div>
                    <div class="review-body-text"><p class="review-text-content">Igloo Himalaya Treks organized every permit, hotel, and high-altitude guide seamlessly. Would travel with Sagar and team again in a heartbeat.</p></div>
                  </div>
                  <div class="customer-review-card platform-review-item" data-platform="tripadvisor" style="display: none;">
                    <div class="customer-review-header">
                      <div class="reviewer-profile"><img src="${prefix}images/avatar-brenna.png" alt="Travelers Choice Review" class="reviewer-avatar"><div class="reviewer-info"><div class="reviewer-name-row"><span class="reviewer-name">James R.</span><span class="reviewer-country">&middot; TRIPADVISOR</span></div><div class="review-date-txt">12th April 2026</div></div></div>
                      <div class="verified-badge">Verified Purchase</div>
                    </div>
                    <div class="review-rating-row"><span class="stars-gold">${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}</span><h3 class="review-heading-title">Travelers' Choice Worthy Operator</h3></div>
                    <div class="review-body-text"><p class="review-text-content">Prompt communication before arrival and calm, experienced guidance throughout the entire route.</p></div>
                  </div>
                  <div class="customer-review-card platform-review-item" data-platform="trustpilot" style="display: none;">
                    <div class="customer-review-header">
                      <div class="reviewer-profile"><img src="${prefix}images/avatar-brenna.png" alt="Emily Taylor" class="reviewer-avatar"><div class="reviewer-info"><div class="reviewer-name-row"><span class="reviewer-name">Emily Taylor</span><span class="reviewer-country">&middot; TRUSTPILOT</span></div><div class="review-date-txt">19th February 2026</div></div></div>
                      <div class="verified-badge">Verified Purchase</div>
                    </div>
                    <div class="review-rating-row"><span class="stars-gold">${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}${STAR_SVG}</span><h3 class="review-heading-title">Transparent &amp; Reliable Company</h3></div>
                    <div class="review-body-text"><p class="review-text-content">No hidden costs, 100% transparent pricing, and instant communication. Best local Himalayan operator!</p></div>
                  </div>
                </div>
              </div>

              <!-- Complete Video Player Lightbox Modal -->
              <div id="video-review-modal" class="video-modal-overlay">
                <div class="video-modal-card">
                  <button type="button" id="video-modal-close" class="video-modal-close-btn">&times;</button>
                  <div class="video-modal-header">
                    <h3 id="video-modal-title" style="color: var(--color-primary-navy); margin-bottom: 4px;">Video Review</h3>
                    <span id="video-modal-sub" style="color: var(--color-copper-orange); font-weight: 600; font-size: 0.9rem;">Igloo Himalaya Treks Experience</span>
                  </div>
                  <div class="video-modal-player-wrapper">
                    <video id="video-modal-player" controls poster="${prefix}images/video-thumb-review-5.webp" style="width: 100%; height: 100%; border-radius: 12px; object-fit: cover;">
                      <source src="${prefix}video/reviews/InShot_20261015_125657180.mp4" type="video/mp4">
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 11: Categorized FAQs (Rule 15 & Rule 16) -->
            <section id="section-faqs" class="trek-detail-section">
              <h2 class="faq-section-accent-title"><span class="faq-accent-bar"></span>${escapeHtml(pkg.title)} FAQs</h2>
              <div class="faq-layout-container">
                <div class="faq-sidebar-card">
                  <div class="faq-category-nav">
                    ${faqCatMeta.map((cat, idx) => {
                      const catCount = faqs.filter((f) => f.category === cat.enumKey).length;
                      return `
                        <button type="button" class="faq-category-btn ${idx === 0 ? 'active' : ''}" data-category="${escapeHtml(cat.domKey)}" aria-pressed="${idx === 0 ? 'true' : 'false'}">
                          <span class="faq-cat-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          </span>
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
                    const defaultCatFaqs = [
                      { question: `How do I book ${pkg.title}?`, answerHtml: '<p>Click Enquire Now or Book Now to confirm preferred dates and receive a full day-by-day proposal within 2–4 hours.</p>' },
                      { question: `What permits or gear are arranged?`, answerHtml: '<p>All required travel/trekking permits listed in the package and complimentary expedition gear (down jacket, sleeping bag, duffel bag) are arranged in Kathmandu.</p>' }
                    ];
                    const itemsToRender = catFaqs.length > 0 ? catFaqs : (idx === 0 ? defaultCatFaqs : []);
                    return `
                      <div class="faq-category-content ${idx === 0 ? 'active' : ''}" id="faq-cat-${escapeHtml(cat.domKey)}" data-category="${escapeHtml(cat.domKey)}">
                        ${itemsToRender.map((f) => `
                          <div class="faq-item">
                            <div class="faq-item-question" role="button" tabindex="0">
                              <span>${escapeHtml(f.question)}</span>
                              <span class="faq-toggle-circle" aria-hidden="true">&#8250;</span>
                            </div>
                            <div class="faq-item-answer">${f.answerHtml || ''}</div>
                          </div>
                        `).join('')}
                      </div>`;
                  }).join('')}
                </div>
              </div>

              <!-- Ultra-Premium High-Conversion Bottom Expedition CTA Card (Rule 16) -->
              <div class="bottom-cta-card faq-bottom-cta-banner" style="background: linear-gradient(135deg, #0A2540 0%, #0E3458 55%, #144A75 100%); border-radius: 16px; padding: 48px 36px; margin-top: 48px; box-shadow: 0 10px 30px rgba(10, 37, 64, 0.25); position: relative; overflow: hidden; box-sizing: border-box; width: 100%;">
                <div style="position: absolute; top: -60px; right: -60px; width: 260px; height: 260px; background: radial-gradient(circle, rgba(26, 150, 200, 0.35) 0%, rgba(26, 150, 200, 0) 70%); border-radius: 50%; pointer-events: none;" aria-hidden="true"></div>
                <div style="position: absolute; bottom: -80px; left: -40px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(246, 133, 31, 0.2) 0%, rgba(246, 133, 31, 0) 70%); border-radius: 50%; pointer-events: none;" aria-hidden="true"></div>
                <div style="position: relative; z-index: 2; text-align: center; max-width: 820px; margin: 0 auto;">
                  <span style="display: inline-block; padding: 6px 18px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 30px; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #38BDF8; margin-bottom: 16px; backdrop-filter: blur(6px);">${escapeHtml(bottomCta.badge || 'PLAN YOUR HIMALAYAN EXPEDITION')}</span>
                  <h3 style="font-size: 2.2rem; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin: 0 0 14px 0;">${escapeHtml(bottomCta.title || `Book ${pkg.title}`)}</h3>
                  <p style="font-size: 1.05rem; line-height: 1.7; color: #E2E8F0; margin: 0 auto 28px auto; max-width: 760px;">${escapeHtml(bottomCta.body || `Send your preferred dates, group size, and questions to confirm availability and receive a customized quotation for ${fullDisplayTitle}.`)}</p>
                  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 28px;">
                    <button type="button" class="btn open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}" style="background: linear-gradient(135deg, #F6851F 0%, #E07312 100%); color: #FFFFFF; border: none; border-radius: 50px; padding: 14px 34px; font-size: 1.05rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 16px rgba(246, 133, 31, 0.4);">Enquire Now</button>
                    <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener noreferrer" style="background: #25D366; color: #FFFFFF; font-weight: 700; font-size: 1.05rem; padding: 14px 28px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" style="vertical-align: middle;"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                  <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; font-size: 0.9rem; color: #E2E8F0; border-top: 1px solid rgba(255, 255, 255, 0.12); padding-top: 22px;">
                    <div style="display: flex; align-items: center; gap: 8px; font-weight: 600;">${CHECK_SVG} 100% Guaranteed Departures</div>
                    <div style="display: flex; align-items: center; gap: 8px; font-weight: 600;">${CHECK_SVG} 2–4 Hr Response Time</div>
                    <div style="display: flex; align-items: center; gap: 8px; font-weight: 600;">${CHECK_SVG} Certified High-Altitude Sherpa Guides</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column: Sticky Booking Card (EBC Gold Standard Architecture) -->
          <div class="trek-sidebar-col" style="position: relative; height: 100%;">
            <div class="sidebar-booking-card" style="position: -webkit-sticky; position: sticky; top: 160px; z-index: 40; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 20px; padding: 26px; box-shadow: 0 10px 35px rgba(0, 0, 0, 0.07);">
              <div style="position: absolute; top: 18px; right: 0; background: #F59E0B; color: #FFFFFF; font-size: 0.72rem; font-weight: 800; padding: 5px 14px; border-radius: 4px 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);">
                ${escapeHtml(sidebarBadge)}
              </div>

              <span style="font-size: 0.75rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">FROM</span>
              <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 16px; flex-wrap: wrap;">
                <span class="hero-price-val" style="font-size: 2.5rem; font-weight: 800; color: #0E3458; line-height: 1;">$${priceNum.toLocaleString()}</span>
                <span style="font-size: 0.92rem; color: #64748B; font-weight: 500;">/ person</span>
                <a href="#section-itinerary" style="font-size: 0.92rem; color: #475569; font-weight: 600; text-decoration: underline; margin-left: 4px;">${pkg.durationDays} ${pkg.durationDays === 1 ? 'day' : 'days'} trip</a>
              </div>

              <!-- Collapsible Group Discount Accordion -->
              <button type="button" class="group-discount-toggle" id="booking-discount-toggle" aria-expanded="false" aria-controls="booking-discount-content" style="border-top: 1px dashed #CBD5E1; border-bottom: 1px dashed #CBD5E1; padding: 10px 0; margin-bottom: 18px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; width: 100%; background: transparent; font-family: inherit;">
                <span style="font-size: 0.78rem; font-weight: 800; color: #0E3458; text-transform: uppercase; letter-spacing: 0.04em;">TIERED GROUP PRICING</span>
                <span class="gd-arrow booking-discount-chevron" id="booking-discount-chevron" style="font-size: 0.85rem; color: #0E3458; transition: transform 0.2s ease;">&#9660;</span>
              </button>

              <div class="group-discount-content booking-discount-content" id="booking-discount-content" style="display: none; margin-bottom: 18px; background: #F8FAFC; border-radius: 10px; padding: 12px; font-size: 0.85rem; border: 1px solid #E2E8F0;">
                ${sidebarTiers.map((t, i) => `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0;${i < sidebarTiers.length - 1 ? ' border-bottom: 1px solid #E2E8F0;' : ''}">
                    <span style="color: #64748B;">${escapeHtml(t.label)}</span>
                    <strong style="color: ${String(t.price).toLowerCase().includes('best') ? '#F6851F' : '#0E3458'};">${escapeHtml(t.price)}</strong>
                  </div>
                `).join('')}
              </div>

              <button type="button" class="btn open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}" style="width: 100%; padding: 14px; background: #F6851F; color: #FFFFFF; border: none; border-radius: 50px; font-size: 1.05rem; font-weight: 800; cursor: pointer; margin-bottom: 12px; box-shadow: 0 4px 14px rgba(246, 133, 31, 0.35);">Book Now</button>
              <button type="button" class="btn open-inquiry-btn" data-trek-title="${escapeHtml(fullDisplayTitle)}" style="width: 100%; padding: 12px; background: #FFFFFF; color: #0E3458; border: 1px solid #CBD5E1; border-radius: 50px; font-size: 0.98rem; font-weight: 700; cursor: pointer; margin-bottom: 22px;">Make an Enquiry</button>

              <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; display: flex; flex-direction: column; gap: 11px;">
                ${sidebarBullets.map((b) => `
                  <li style="display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 600; color: #334155;">
                    ${SPARKLE_SVG}
                    <span>${escapeHtml(b)}</span>
                  </li>
                `).join('')}
              </ul>

              <div style="border-top: 1px dashed #CBD5E1; padding-top: 18px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <span style="font-size: 0.72rem; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">INSTANT HELP</span>
                  <strong style="font-size: 1.05rem; font-weight: 800; color: #0E3458;">Call or WhatsApp</strong>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <a href="tel:${escapeHtml(phoneDisplay.replace(/\s+/g, ''))}" aria-label="Call Us" style="width: 44px; height: 44px; border-radius: 50%; border: 1px solid #CBD5E1; background: #FFFFFF; display: flex; align-items: center; justify-content: center; color: #0E3458; text-decoration: none;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </a>
                  <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=${waPrefill}" target="_blank" rel="noopener" aria-label="WhatsApp Us" style="width: 44px; height: 44px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; color: #FFFFFF; text-decoration: none; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Rule 2: Pre-Footer Inquiry Modal before You Might Also Like -->
      ${buildInqModalHtml(fullDisplayTitle, whatsappDigits, recPackagesList)}

      <!-- You Might Also Like — Full-Width 4-Card Recommendation Section -->
      <section class="you-might-like-section">
        <div class="container">
          <div class="yml-header">
            <span class="yml-pill-tag">MORE ADVENTURES</span>
            <div class="yml-title-row">
              <span class="yml-accent-bar"></span>
              <h2 class="yml-title">You Might Also Like</h2>
            </div>
            <p class="yml-subtitle">Consider these curated journeys in the Himalayas if you want an alternative pace, duration, or regional corridor.</p>
          </div>
          <div class="yml-cards-grid">
            ${recPackagesList.map((t) => {
              const tFolder = t.type === 'TOUR' ? 'tour' : 'trek';
              const rImg = resolveGalImg(t.galleries && t.galleries[0]) || routeBadgeImg;
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
                    <p style="font-size: 0.88rem; color: #64748B; line-height: 1.5; margin: 6px 0 12px 0;">${escapeHtml((t.heroSummary || `Explore this ${rDays} Himalayan programme with experienced local guides and complete logistics.`).slice(0, 140))}</p>
                    <div class="yml-card-footer">
                      <div class="yml-card-price"><span class="yml-price-label">More Details</span></div>
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
  <script src="${prefix}js/trek-details.js?v=12"></script>
  <script src="${prefix}js/header-scroll.js?v=37"></script>
  <script src="${prefix}js/mega-menu.js"></script>
  <script defer src="${prefix}js/footer-interactions.js"></script>
</body>
</html>`;
}

module.exports = {
  renderCanonicalPackageHtml,
  buildDefaultTripFacts,
  buildDefaultPackingCategories,
  buildDefaultDetailTopics
};
