const fs = require('fs');
const path = require('path');
const { articles } = require('../data/blog/articles');

const ROOT = path.resolve(__dirname, '..');

// Native CSV row splitter
function parseCSVRow(str) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === '"') {
      if (inQuotes && str[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

// Native CSV row builder
function formatCSVRow(fields) {
  return fields.map(field => {
    if (field === null || field === undefined) field = '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }).join(',');
}

// Map of articles by slug
const articleMap = new Map();
for (const a of articles) {
  const clean = a.slug.replace(/^\//, '').replace(/\/$/, '');
  articleMap.set(clean, a);
}

// Read target sheet
const lines = fs.readFileSync('target_sheet.csv', 'utf8').split(/\r?\n/).filter(Boolean);
const header = parseCSVRow(lines[0]);

const updatedRows = [];
let blogArticlesUpgraded = 0;
let policyMetaCleaned = 0;

for (let i = 1; i < lines.length; i++) {
  const r = parseCSVRow(lines[i]);
  let [origin, oldUrl, newUrl, status, category, title, region, duration, altitude, optimizations, seoValue] = r;

  const oldClean = oldUrl.replace(/^\//, '').replace(/\/$/, '');
  const newClean = newUrl.replace(/^\//, '').replace(/\/$/, '');

  // 1. Check if this is one of our 112 rendered blog articles
  const matchedArticle = articleMap.get(oldClean) || articleMap.get(newClean);

  if (matchedArticle) {
    blogArticlesUpgraded++;
    origin = '📰 Redesigned Informational Article (200 OK)';
    newUrl = `/${matchedArticle.slug.replace(/^\//, '').replace(/\/$/, '')}/`;
    status = '200 OK (Rendered Canonical Blog Article)';
    category = 'Blog Post / Informational Guide';
    title = matchedArticle.title.replace(/\s*\|\s*Igloo Himalaya Treks.*$/, '');
    
    // Determine regional cluster based on slug / title
    const lower = (matchedArticle.slug + ' ' + title).toLowerCase();
    if (lower.includes('everest') || lower.includes('lukla') || lower.includes('ebc') || lower.includes('namche')) {
      region = 'Everest / Khumbu';
    } else if (lower.includes('annapurna') || lower.includes('abc') || lower.includes('poon') || lower.includes('mardi') || lower.includes('tilicho')) {
      region = 'Annapurna Region';
    } else if (lower.includes('gokyo') || lower.includes('cho la')) {
      region = 'Gokyo / Everest';
    } else if (lower.includes('manaslu') || lower.includes('tsum')) {
      region = 'Manaslu Region';
    } else if (lower.includes('langtang') || lower.includes('gosaikunda') || lower.includes('helambu') || lower.includes('tamang')) {
      region = 'Langtang Valley';
    } else if (lower.includes('mustang') || lower.includes('dolpo')) {
      region = 'Mustang / Dolpo';
    } else if (lower.includes('kathmandu')) {
      region = 'Kathmandu Valley';
    } else {
      region = 'Nepal Himalayas';
    }

    duration = matchedArticle.readingTime || '15 min read';
    altitude = altitude && altitude !== 'N/A' && altitude !== '5,500m' ? altitude : 'High-Altitude Trajectory';
    optimizations = 'Rendered via canonical BlogArticleTemplate with sticky TOC, semantic FAQ Schema, high-res webp imagery, author bio, social share, related cluster links, and responsive typography.';
    seoValue = 'TOPICAL AUTHORITY ASSET: 200 OK long-form informational guide capturing high-intent long-tail organic search keywords and internally linking to core commercial packages.';
  } else if (category === 'Company / Policy Page' && (duration === '14 DAYS' || altitude === '5,500m')) {
    // 2. Fix placeholder duration/altitude on policy/utility pages
    policyMetaCleaned++;
    duration = 'N/A';
    altitude = 'N/A';
  }

  updatedRows.push([origin, oldUrl, newUrl, status, category, title, region, duration, altitude, optimizations, seoValue]);
}

// 3. Add Missing Live Pages
const missingPagesToAdd = [
  // 5 Pillar Blog Guides in /blog/
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Pillar Blog Guide Added)',
    '/blog/everest-base-camp-vs-annapurna-circuit/',
    '200 OK (New Page Added)',
    'Blog Post / Informational Guide',
    'Everest Base Camp vs Annapurna Circuit: The Ultimate Himalayan Comparison Guide',
    'Everest & Annapurna',
    '25 min read',
    '5,545 m (Kala Patthar) / 5,416 m (Thorong La)',
    'Definitive head-to-head comparison guide, route elevation profiles, difficulty, cost breakdowns, and conversion CTAs.',
    'HIGH CONVERTING INTENT: Captures undecided trekkers choosing between Nepal\'s two most popular trekking circuits.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Pillar Blog Guide Added)',
    '/blog/everest-packing-checklist/',
    '200 OK (New Page Added)',
    'Blog Post / Informational Guide',
    'Everest Base Camp Trek Packing List: The Complete Gear Checklist',
    'Everest / Khumbu',
    '20 min read',
    '5,364 m',
    'Layering system guide, weight limits, seasonal variations, printable equipment checklist, and porter welfare guidelines.',
    'EVERGREEN GEAR AUTHORITY: High search volume gear checklist ranking for commercial high-intent gear queries.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Pillar Blog Guide Added)',
    '/blog/how-to-prevent-altitude-sickness/',
    '200 OK (New Page Added)',
    'Blog Post / Informational Guide',
    'How to Prevent Altitude Sickness in Nepal: The Medical Guide to High-Altitude Acclimatization',
    'Himalaya / Nepal',
    '22 min read',
    '5,545 m',
    'Wilderness medic approved guide covering AMS symptoms, Lake Louise Score, Diamox dosage protocols, hydration, and emergency descent.',
    'SAFETY & E-E-A-T LEADER: Medical authority guide establishing trust and positioning agency as safety leaders.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Pillar Blog Guide Added)',
    '/blog/teahouse-food-lodging-nepal-trails/',
    '200 OK (New Page Added)',
    'Blog Post / Informational Guide',
    'Teahouse Food and Lodging Along Nepal Trekking Trails: Complete Guide',
    'Himalaya / Nepal',
    '18 min read',
    '5,160 m',
    'Complete guide to Himalayan teahouse living: menu costs, Dal Bhat fuel, charging electronics, hot showers, and room etiquette.',
    'TOPICAL AUTHORITY: Answers vital pre-trek queries regarding daily comforts and logistics on trail.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Pillar Blog Guide Added)',
    '/blog/ultimate-everest-packing-checklist-2026/',
    '200 OK (New Page Added)',
    'Blog Post / Informational Guide',
    'Ultimate Everest Packing Checklist 2026: Season-by-Season Guide',
    'Everest / Khumbu',
    '20 min read',
    '5,545 m',
    'Updated 2026 season-specific packing recommendations, duffel weights, and gear rental options in Kathmandu.',
    'ANNUAL FRESHNESS: Targeted seasonal gear rankings with active affiliate/inquiry triggers.'
  ],

  // Essential Travel & Gear Guides
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Essential Guide Added)',
    '/equipment-checklist.html',
    '200 OK (New Page Added)',
    'Essential Travel Guide',
    'Himalayan Trekking Equipment & Gear Checklist | Igloo Himalaya Treks',
    'Himalaya / Nepal',
    'N/A',
    'N/A',
    'Interactive gear checklist with download option, categorized by base layer, insulation, footwear, and alpine accessories.',
    'TRUST & CLIENT PREPARATION: Essential pre-departure asset referenced across all package booking confirmations.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Essential Guide Added)',
    '/recommended-medical-kit.html',
    '200 OK (New Page Added)',
    'Essential Travel Guide',
    'Recommended High-Altitude Medical Kit & Wilderness First Aid Guide',
    'Himalaya / Nepal',
    'N/A',
    'N/A',
    'Comprehensive first-aid checklist, prescription guidance (Diamox), wound care, and water purification protocols.',
    'E-E-A-T AUTHORITY: Direct medical preparation information establishing institutional expedition credibility.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Essential Guide Added)',
    '/travel-insurance.html',
    '200 OK (New Page Added)',
    'Essential Travel Guide',
    'Mandatory Travel Insurance & High-Altitude Helicopter Rescue Policy',
    'Himalaya / Nepal',
    'N/A',
    'N/A',
    'Clear guidelines on 6,000m altitude coverage requirements, emergency evacuation coordination, and approved insurance providers.',
    'BOOKING REQUIREMENT ASSET: Mandatory compliance page protecting trekkers and agency liability.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Essential Guide Added)',
    '/nepal-tour-packages.html',
    '200 OK (New Page Added)',
    'Main Landing Hub',
    'Nepal Cultural & Sightseeing Tour Packages Hub 2026',
    'Nepal Nationwide',
    '3 - 10 Days',
    '2,175 m',
    'Curated cultural tours directory covering Kathmandu Valley heritage, Pokhara, Chitwan wildlife, and Lumbini pilgrimage.',
    'CATEGORY SILO: Captures travelers seeking cultural and scenic sightseeing beyond high-altitude trekking.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Essential Guide Added)',
    '/nepal-travel-guide.html',
    '200 OK (New Page Added)',
    'Essential Travel Guide',
    'Definitive Nepal Travel Guide: Seasons, Currency, Culture & Practical Tips',
    'Nepal Nationwide',
    'N/A',
    'N/A',
    'Comprehensive practical handbook covering best seasons, SIM cards, currency exchange, cultural etiquette, and domestic travel.',
    'PILLAR TRAFFIC MAGNET: Broad top-of-funnel informational rankings for tourists planning trips to Nepal.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Essential Guide Added)',
    '/nepal-trekking-packages.html',
    '200 OK (New Page Added)',
    'Main Landing Hub',
    'Explore All 60+ Nepal Trekking Packages & Expeditions 2026',
    'Nepal Nationwide',
    '3 - 25 Days',
    '6,476 m',
    'Primary commercial directory with multi-filter faceted search across difficulty, region, duration, and peak climbing categories.',
    'CORE REVENUE HUB: Primary commercial landing page consolidating all trekking packages for direct booking conversion.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Essential Guide Added)',
    '/nepal-visa.html',
    '200 OK (New Page Added)',
    'Essential Travel Guide',
    'Nepal Tourist Visa on Arrival: Requirements, Fees & Online Application Guide',
    'Nepal Nationwide',
    'N/A',
    'N/A',
    'Step-by-step on-arrival immigration walkthrough, fee tables (15/30/90 days), and official portal links.',
    'SEARCH VOLUME MAGNET: Captures all incoming travelers researching entry and immigration requirements for Nepal.'
  ],

  // 2 Verified Team Leaders from Official Company Records
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Official Team Record Added)',
    '/team.html#ramesh-karki',
    '200 OK (New Profile Added)',
    'Team Member Profile',
    'Ramesh Karki — Senior Trekking Leader (20 Yrs Practical Experience)',
    'Dhading / Himalaya',
    '20 Yrs Guiding Exp',
    '5,500m+',
    'Veteran guide profile, Dhading native, School Leaving Certificate (SLC) education, first-aid certified, English/Nepali/Hindi speaker.',
    'E-E-A-T TRUST FACTOR: Verifiable 20-year field veteran establishing authentic local guiding credentials.'
  ],
  [
    '⭐ BRAND NEW PAGE ADDED',
    'None (Official Team Record Added)',
    '/team.html#sonam-tamang',
    '200 OK (New Profile Added)',
    'Team Member Profile',
    'Sonam Tamang — NMA Certified Climbing Guide (15 Yrs Alpine Leadership)',
    'Solukhumbu / Everest',
    '15 Yrs Climbing Exp',
    '6,812m (Ama Dablam)',
    'Solukhumbu native, Grade 10 education, certified NMA climbing guide, Island Peak, Mera Peak, Ama Dablam, and Lobuche East specialist.',
    'E-E-A-T TRUST FACTOR: Accredited alpine climbing guide credential proving technical mountaineering expertise.'
  ]
];

for (const p of missingPagesToAdd) {
  updatedRows.push(p);
}

// Generate CSV content
const csvLines = [formatCSVRow(header)];
for (const row of updatedRows) {
  csvLines.push(formatCSVRow(row));
}

const outputPath = path.resolve(ROOT, 'updated_google_sheet.csv');
fs.writeFileSync(outputPath, csvLines.join('\n'), 'utf8');

console.log('✔ updated_google_sheet.csv successfully created!');
console.log(`Total original rows: ${lines.length - 1}`);
console.log(`Blog articles upgraded from 301 to 200 OK: ${blogArticlesUpgraded}`);
console.log(`Policy/Utility page metadata cleaned: ${policyMetaCleaned}`);
console.log(`Missing live pages & team members added: ${missingPagesToAdd.length}`);
console.log(`Total updated rows in new dataset: ${updatedRows.length}`);
