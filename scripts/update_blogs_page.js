const fs = require('fs');
const path = require('path');
const { articles } = require('../data/blog/articles.js');

const ROOT = path.resolve(__dirname, '..');
const articlesBySlug = new Map();
articles.forEach(a => articlesBySlug.set(a.slug, a));

const blogDir = path.join(ROOT, 'blog');
const folders = fs.readdirSync(blogDir).filter(f => fs.statSync(path.join(blogDir, f)).isDirectory());

function mapCategory(slug, cat = '', title = '') {
  const text = (slug + ' ' + cat + ' ' + title).toLowerCase();
  if (text.includes('climb') || text.includes('peak') || text.includes('island') || text.includes('mera') || text.includes('lobuche') || text.includes('yala')) {
    return 'climbing';
  }
  if (text.includes('gear') || text.includes('pack') || text.includes('checklist') || text.includes('equipment') || text.includes('boots')) {
    return 'gear';
  }
  if (text.includes('altitude') || text.includes('sickness') || text.includes('ams') || text.includes('flood') || text.includes('safety') || text.includes('medical') || text.includes('insurance')) {
    return 'safety';
  }
  if (text.includes('food') || text.includes('teahouse') || text.includes('dal bhat') || text.includes('festival') || text.includes('culture') || text.includes('sherpa') || text.includes('nims')) {
    return 'culture';
  }
  if (text.includes('everest') || text.includes('khumbu') || text.includes('gokyo') || text.includes('lukla') || text.includes('ebc') || text.includes('kala patthar')) {
    return 'everest';
  }
  if (text.includes('annapurna') || text.includes('mardi') || text.includes('poon hill') || text.includes('tilicho') || text.includes('mohare') || text.includes('thorong')) {
    return 'annapurna';
  }
  if (text.includes('langtang') || text.includes('kyanjin') || text.includes('tserko') || text.includes('gosainkunda') || text.includes('helambu')) {
    return 'langtang';
  }
  if (text.includes('manaslu') || text.includes('mustang') || text.includes('dolpo') || text.includes('kanchenjunga') || text.includes('restricted') || text.includes('remote') || text.includes('tsum')) {
    return 'remote';
  }
  return 'planning';
}

function getCategoryBadge(catKey, originalCategory) {
  if (originalCategory && originalCategory.length > 3 && originalCategory.length < 28 && !originalCategory.includes('·')) {
    return originalCategory;
  }
  const badgeMap = {
    everest: 'Everest Region',
    annapurna: 'Annapurna Region',
    langtang: 'Langtang Valley',
    remote: 'Wilderness & Remote',
    climbing: 'Peak Climbing',
    gear: 'Gear & Packing',
    safety: 'Altitude & Safety',
    culture: 'Culture & Food',
    planning: 'Travel Planning'
  };
  return badgeMap[catKey] || 'Trekking Guide';
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const list = [];
for (const folder of folders) {
  if (folder === 'everest-packing-checklist') continue; // redirect stub

  const indexPath = path.join(blogDir, folder, 'index.html');
  if (!fs.existsSync(indexPath)) continue;

  const html = fs.readFileSync(indexPath, 'utf8');
  let data = articlesBySlug.get(folder);

  let title, desc, heroImg, readingTime, originalCategory;

  if (data) {
    title = data.h1 || data.title.replace(/\s*\|\s*Igloo Himalaya Treks.*$/i, '').trim();
    desc = data.desc || data.lead || '';
    heroImg = data.heroImg;
    readingTime = data.readingTime || '15 min read';
    originalCategory = data.category || '';
  } else {
    // Standalone
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/) || html.match(/<img[^>]+src="(?:\.\.\/)*([^"]+)"/);
    const catMatch = html.match(/class="hero-badge"[^>]*>([\s\S]*?)<\/span>/) || html.match(/class="pill[^"]*"[^>]*>([\s\S]*?)<\/span>/);

    title = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : (titleMatch ? titleMatch[1].replace(/\s*\|\s*Igloo Himalaya Treks.*$/i, '').trim() : folder);
    desc = descMatch ? descMatch[1].trim() : '';
    if (!desc) {
      const pMatch = html.match(/<p class="lead"[^>]*>([\s\S]*?)<\/p>/) || html.match(/<article[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/) || html.match(/<main[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
      if (pMatch) desc = pMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160) + '...';
    }
    const standaloneHeroOverrides = {
      'ultimate-everest-packing-checklist-2026': 'images/everest-base-camp-packing-checklist-2026-gear-flat-lay.webp',
      'how-to-prevent-altitude-sickness': 'images/how-to-prevent-altitude-sickness-ams-nepal-hero.webp',
      'teahouse-food-lodging-nepal-trails': 'images/traditional-nepal-teahouse-dal-bhat-thali.webp',
      'everest-base-camp-vs-annapurna-circuit': 'images/everest-base-camp-vs-annapurna-circuit-hero.webp'
    };

    if (standaloneHeroOverrides[folder]) {
      heroImg = standaloneHeroOverrides[folder];
    } else if (imgMatch) {
      heroImg = imgMatch[1].replace(/https?:\/\/igloohimalayatreks\.com\//, '').replace(/^\.\.\//, '').replace(/^\.\.\//, '');
      if (heroImg.includes('logo.png')) {
        heroImg = 'images/hero-himalayas.webp';
      }
    }
    originalCategory = catMatch ? catMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    readingTime = '20 min read';
  }

  // Clean title: remove site suffix if present
  let displayTitle = title.replace(/\s*\|\s*Igloo Himalaya Treks.*$/i, '').trim();

  // Clean image path
  if (!heroImg) heroImg = 'images/hero-himalayas.webp';
  heroImg = heroImg.replace(/^\/?/, '');

  // Truncate long descriptions nicely
  let displayDesc = desc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (displayDesc.length > 175) {
    displayDesc = displayDesc.slice(0, 172) + '...';
  }

  const catKey = mapCategory(folder, originalCategory, displayTitle);
  const badge = getCategoryBadge(catKey, originalCategory);

  list.push({
    slug: folder,
    title: displayTitle,
    desc: displayDesc,
    heroImg,
    catKey,
    badge,
    readingTime
  });
}

// Priority sort order:
// 1. Cornerstone guides (packing, altitude sickness, teahouse food, everest guide, etc.)
// 2. Alphabetical by title
const cornerstoneSlugs = [
  'ultimate-everest-packing-checklist-2026',
  'how-to-prevent-altitude-sickness',
  'teahouse-food-lodging-nepal-trails',
  'everest-base-camp-vs-annapurna-circuit',
  'everest-base-camp-trek-guide',
  'best-hiking-places-near-kathmandu',
  'best-treks-in-nepal-for-beginners',
  'best-treks-in-nepal-2027',
  'how-to-train-for-high-altitude-hiking',
  'do-you-need-a-guide-to-trek-in-nepal-2026',
  'how-to-choose-the-best-trekking-company-in-nepal'
];

list.sort((a, b) => {
  const aCornerIdx = cornerstoneSlugs.indexOf(a.slug);
  const bCornerIdx = cornerstoneSlugs.indexOf(b.slug);
  if (aCornerIdx !== -1 && bCornerIdx !== -1) return aCornerIdx - bCornerIdx;
  if (aCornerIdx !== -1) return -1;
  if (bCornerIdx !== -1) return 1;
  return a.title.localeCompare(b.title);
});

console.log(`Generating cards for all ${list.length} blog articles...`);

// Category counts
const counts = {
  all: list.length,
  everest: 0,
  annapurna: 0,
  langtang: 0,
  remote: 0,
  gear: 0,
  culture: 0,
  safety: 0,
  climbing: 0,
  planning: 0
};

list.forEach(item => {
  if (counts[item.catKey] !== undefined) {
    counts[item.catKey]++;
  }
});

console.log('Category counts:', counts);

// Build Cards HTML
const cardsHtml = list.map(item => {
  return `          <!-- Blog Card: ${escapeHtml(item.title)} -->
          <article class="card blog-card" data-category="${item.catKey}">
            <div class="blog-card-media">
              <a href="blog/${item.slug}/" tabindex="-1" aria-hidden="true" class="blog-card-img-link">
                <img src="${item.heroImg}" alt="${escapeHtml(item.title)}" class="blog-card-img" width="400" height="220" loading="lazy" decoding="async">
              </a>
              <span class="blog-card-badge">${escapeHtml(item.badge)}</span>
            </div>
            <div class="blog-card-body">
              <div>
                <h3 class="blog-card-title">
                  <a href="blog/${item.slug}/">${escapeHtml(item.title)}</a>
                </h3>
                <p class="blog-card-desc">
                  ${escapeHtml(item.desc)}
                </p>
              </div>
              <div class="blog-card-footer">
                <a href="blog/${item.slug}/" class="blog-card-cta">Read Article →</a>
                <span class="blog-card-read-time">${escapeHtml(item.readingTime)}</span>
              </div>
            </div>
          </article>`;
}).join('\n\n');

// Read existing blogs.html
const blogsHtmlPath = path.join(ROOT, 'blogs.html');
let blogsHtml = fs.readFileSync(blogsHtmlPath, 'utf8');

// Ensure canonical tag exists
if (!blogsHtml.includes('<link rel="canonical"')) {
  blogsHtml = blogsHtml.replace(
    '<meta name="description"',
    '<link rel="canonical" href="https://igloohimalayatreks.com/blogs.html">\n  <meta name="description"'
  );
}

// Add/update enhanced CSS in <head>
const customCss = `
  <style>
    .blog-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 14px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
      box-shadow: 0 2px 8px rgba(14, 52, 88, 0.04);
    }
    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 28px rgba(14, 52, 88, 0.12);
      border-color: #cbd5e1;
    }
    .blog-card-media {
      height: 195px;
      overflow: hidden;
      position: relative;
      background: #f1f5f9;
    }
    .blog-card-img-link {
      display: block;
      width: 100%;
      height: 100%;
    }
    .blog-card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .blog-card:hover .blog-card-img {
      transform: scale(1.05);
    }
    .blog-card-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(14, 52, 88, 0.88);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      color: #ffffff;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .blog-card-body {
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }
    .blog-card-title {
      font-size: 1.15rem;
      margin: 0 0 10px 0;
      color: var(--color-primary-navy);
      line-height: 1.4;
      font-weight: 700;
    }
    .blog-card-title a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .blog-card-title a:hover {
      color: var(--color-copper-orange);
    }
    .blog-card-desc {
      font-size: 0.88rem;
      color: var(--color-neutral-600);
      margin-bottom: 16px;
      line-height: 1.55;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .blog-card-footer {
      padding-top: 14px;
      border-top: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .blog-card-cta {
      color: var(--color-copper-orange);
      font-weight: 700;
      font-size: 0.88rem;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: transform 0.2s ease, color 0.2s ease;
    }
    .blog-card-cta:hover {
      color: var(--color-copper-hover, #e07412);
      transform: translateX(3px);
    }
    .blog-card-read-time {
      font-size: 0.78rem;
      color: var(--color-neutral-400);
      font-weight: 500;
    }
    .filter-pill {
      transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .filter-pill:hover:not(.active) {
      background: #f1f5f9 !important;
      border-color: #cbd5e1 !important;
    }
  </style>`;

if (!blogsHtml.includes('.blog-card-media {')) {
  blogsHtml = blogsHtml.replace('</head>', `${customCss}\n</head>`);
}

// Update Filter Section & Grid
const newFilterPills = `        <!-- Filter Pills Bar -->
        <div class="blog-filter-pills" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px;">
          <button type="button" class="filter-pill active" data-filter="all" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #0e3458; color: #ffffff; font-weight: 600; font-size: 0.85rem; cursor: pointer;">All Articles (${counts.all})</button>
          <button type="button" class="filter-pill" data-filter="everest" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Everest Region (${counts.everest})</button>
          <button type="button" class="filter-pill" data-filter="annapurna" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Annapurna Region (${counts.annapurna})</button>
          <button type="button" class="filter-pill" data-filter="langtang" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Langtang Valley (${counts.langtang})</button>
          <button type="button" class="filter-pill" data-filter="remote" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Manaslu &amp; Remote (${counts.remote})</button>
          <button type="button" class="filter-pill" data-filter="gear" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Gear &amp; Packing (${counts.gear})</button>
          <button type="button" class="filter-pill" data-filter="culture" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Culture &amp; Food (${counts.culture})</button>
          <button type="button" class="filter-pill" data-filter="safety" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Altitude &amp; Safety (${counts.safety})</button>
          <button type="button" class="filter-pill" data-filter="climbing" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Peak Climbing (${counts.climbing})</button>
          <button type="button" class="filter-pill" data-filter="planning" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: #ffffff; color: var(--color-primary-navy); font-weight: 600; font-size: 0.85rem; cursor: pointer;">Travel Planning (${counts.planning})</button>
        </div>`;

// Replace Header title count
blogsHtml = blogsHtml.replace(
  /<h2 class="section-title"[^>]*>Himalayan Trekking Guides &amp; Articles \(\d+\)<\/h2>/,
  `<h2 class="section-title" style="font-size: 2rem; margin: 0;">Himalayan Trekking Guides &amp; Articles (${counts.all})</h2>`
);
blogsHtml = blogsHtml.replace(
  /<h2 class="section-title"[^>]*>Himalayan Trekking Guides & Articles \(\d+\)<\/h2>/,
  `<h2 class="section-title" style="font-size: 2rem; margin: 0;">Himalayan Trekking Guides &amp; Articles (${counts.all})</h2>`
);

// Replace filter pills
blogsHtml = blogsHtml.replace(
  /<!-- Filter Pills Bar -->[\s\S]*?<\/div>\s*<!-- Articles Grid Container -->/,
  `${newFilterPills}\n\n        <!-- Articles Grid Container -->`
);

// Replace Grid Cards
const gridStartMarker = '<div id="articles-grid" class="grid grid-3" style="gap: 24px;">';
const gridEndMarker = '</div>\n\n        <div id="no-results"';
const altGridEndMarker = '</div>\r\n\r\n        <div id="no-results"';

let startIdx = blogsHtml.indexOf(gridStartMarker);
if (startIdx === -1) {
  throw new Error('Could not find gridStartMarker in blogs.html');
}

let endIdx = blogsHtml.indexOf(gridEndMarker, startIdx);
if (endIdx === -1) {
  endIdx = blogsHtml.indexOf(altGridEndMarker, startIdx);
}
if (endIdx === -1) {
  // Try finding no-results div
  const noResultsIdx = blogsHtml.indexOf('id="no-results"', startIdx);
  if (noResultsIdx !== -1) {
    endIdx = blogsHtml.lastIndexOf('</div>', noResultsIdx);
  }
}

if (endIdx === -1) {
  throw new Error('Could not find gridEndMarker in blogs.html');
}

blogsHtml = blogsHtml.slice(0, startIdx + gridStartMarker.length) + '\n\n' + cardsHtml + '\n\n        ' + blogsHtml.slice(endIdx);

fs.writeFileSync(blogsHtmlPath, blogsHtml, 'utf8');
console.log('Successfully updated blogs.html with all 76 cards!');
