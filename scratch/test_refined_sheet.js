const fs = require('fs');
const path = require('path');

// 1. Read scraped live URLs
const liveUrls = JSON.parse(fs.readFileSync('scratch/live_scraped_urls.json', 'utf8'));
const livePaths = new Set(liveUrls.map(u => {
  try {
    let p = new URL(u).pathname;
    if (!p.endsWith('/') && !p.includes('.')) p += '/';
    return p;
  } catch(e) {
    return '';
  }
}));

// 2. Read server.js redirects
const serverJs = fs.readFileSync('server.js', 'utf8');
const redirectBlock = serverJs.match(/const URL_REDIRECTS = {([\s\S]*?)};/);
const serverRedirects = {};
if (redirectBlock) {
  redirectBlock[1].split('\n').forEach(line => {
    const m = line.match(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/);
    if (m) {
      let k = m[1];
      serverRedirects[k] = m[2];
      if (!k.endsWith('/') && !k.includes('.')) serverRedirects[k + '/'] = m[2];
    }
  });
}

// 3. Scan all HTML files
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (['node_modules', '.git', 'scratch', '.vscode', '.idea'].includes(file)) return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('.');
const allLocalPages = new Map();

files.forEach(f => {
  const rel = path.relative('.', f).replace(/\\/g, '/');
  if (rel === 'google-sheets-exporter.html') return;
  // Skip flat html if directory index exists
  if (!rel.endsWith('index.html') && rel !== 'index.html') {
    const dirEquivalent = rel.replace(/\.html$/, '/index.html');
    if (fs.existsSync(dirEquivalent)) return;
  }

  const content = fs.readFileSync(f, 'utf8');
  const isRedirect = /http-equiv=["']refresh["']/i.test(content) && content.length < 5000;
  const redirectTarget = isRedirect ? (content.match(/url=([^"'>\s]+)/i) || [])[1] : null;

  let urlPath = '/' + rel;
  if (rel === 'index.html') {
    urlPath = '/';
  } else if (rel.endsWith('/index.html')) {
    urlPath = '/' + rel.replace(/index\.html$/, '');
  }

  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  let title = titleMatch ? titleMatch[1].split('—')[0].replace(/\|.*$/, '').trim() : rel;
  title = title.replace(/\s*\([^)]*$/, '').trim();

  const durMatch = content.match(/Duration<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) || content.match(/([0-9]+\s*days?)/i);
  const altMatch = content.match(/Max Altitude<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) || content.match(/(\d{1,2},\d{3}\s*m)/i);
  const regionMatch = content.match(/Trek Region<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) || content.match(/Region<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);

  allLocalPages.set(urlPath, {
    file: rel,
    urlPath,
    fullUrl: `https://igloohimalayatreks.com${urlPath}`,
    isRedirect,
    redirectTarget,
    title,
    duration: durMatch ? durMatch[1].trim() : 'N/A',
    altitude: altMatch ? altMatch[1].trim() : 'N/A',
    region: regionMatch ? regionMatch[1].trim() : 'Himalaya'
  });
});

console.log(`Local routes indexed: ${allLocalPages.size}`);

const brandNew = [];
const migrated = [];

allLocalPages.forEach((item, urlPath) => {
  if (item.isRedirect) return;

  const slug = urlPath.split('/').filter(Boolean).pop() || '';
  let oldUrl = null;

  // Specific mappings for company / travel-guide / regional hubs
  const knownOldMappings = {
    '/about.html': '/about-us/',
    '/contact.html': '/contact-us/',
    '/team.html': '/our-teams/',
    '/privacy-policy.html': '/privacy-policy/',
    '/terms-and-conditions.html': '/terms-and-conditions/',
    '/blogs.html': '/blog/',
    '/annapurna-region-treks/': '/destinations/nepal/annapurna-region/',
    '/dolpo-region-treks/': '/destinations/nepal/dolpa-region/',
    '/everest-region-treks/': '/destinations/nepal/everest-region/',
    '/kanchenjunga-region-treks/': '/destinations/nepal/kangchenjunga-region/',
    '/langtang-region-treks/': '/destinations/nepal/langtang-region/',
    '/manaslu-region-treks/': '/destinations/nepal/manaslu-region/',
    '/mustang-region-treks/': '/destinations/nepal/upper-mustang/',
    '/nepal-trekking-packages/': '/destinations/nepal/',
    '/equipment-checklist/': '/travel-guide/trekking-gears-list/',
    '/nepal-visa/': '/travel-guide/nepal-travel-visa/',
    '/travel-insurance/': '/travel-guide/travel-insurance-in-nepal/',
    '/recommended-medical-kit/': '/travel-guide/medical-kit-for-trekking-in-nepal/',
    '/nepal-travel-guide/': '/travel-guide/'
  };

  if (knownOldMappings[urlPath]) {
    oldUrl = `https://igloohimalayatreks.com${knownOldMappings[urlPath]}`;
  } else if (livePaths.has(`/trip/${slug}/`)) {
    oldUrl = `https://igloohimalayatreks.com/trip/${slug}/`;
  } else if (livePaths.has(`/tour/${slug}/`)) {
    oldUrl = `https://igloohimalayatreks.com/tour/${slug}/`;
  } else if (livePaths.has(`/trek/${slug}/`)) {
    oldUrl = `https://igloohimalayatreks.com/trek/${slug}/`;
  } else if (livePaths.has(urlPath)) {
    oldUrl = `https://igloohimalayatreks.com${urlPath}`;
  } else {
    // Reverse lookup in serverRedirects
    for (const [k, v] of Object.entries(serverRedirects)) {
      if (v === urlPath || v === urlPath.replace(/\/$/, '') || v === urlPath.replace(/\.html$/, '')) {
        oldUrl = `https://igloohimalayatreks.com${k}`;
        break;
      }
    }
  }

  // Determine Category
  let category = "Trek Package";
  if (urlPath.startsWith('/trek/')) {
    if (/climbing|peak/i.test(slug)) category = "Peak Climbing Expedition";
    else category = "Trek Package";
  } else if (urlPath.startsWith('/tour/')) {
    category = "Tour Package";
  } else if (urlPath.startsWith('/team/')) {
    category = "Team Member Profile";
  } else if (urlPath.includes('-region-treks/') || urlPath.includes('restricted-area-treks-nepal/') || urlPath.includes('trekking-regions-nepal/')) {
    category = "Regional Destination Hub";
  } else if (urlPath.includes('peak-climbing-nepal/')) {
    category = "Peak Climbing Expedition Hub";
  } else if (['/nepal-trekking-packages/', '/nepal-tour-packages/'].includes(urlPath)) {
    category = "Main Landing Hub";
  } else if (['/equipment-checklist/', '/nepal-travel-guide/', '/nepal-visa/', '/travel-insurance/', '/recommended-medical-kit/'].includes(urlPath)) {
    category = "Essential Travel Guide";
  } else if (urlPath === '/' || urlPath === '') {
    category = "Homepage";
  } else {
    category = "Company / Policy Page";
  }

  if (oldUrl) {
    migrated.push({ urlPath, fullUrl: item.fullUrl, oldUrl, category, title: item.title });
  } else {
    brandNew.push({ urlPath, fullUrl: item.fullUrl, category, title: item.title });
  }
});

console.log(`\nActive Canonical Pages Breakdown:`);
console.log(`- ⭐ BRAND NEW PAGES: ${brandNew.length}`);
console.log(`- 🔄 MIGRATED PAGES: ${migrated.length}`);
console.log(`- TOTAL ACTIVE PAGES: ${brandNew.length + migrated.length}`);

console.log(`\n=== 30 BRAND NEW PAGES ===`);
brandNew.forEach((p, i) => {
  console.log(`${i+1}. [${p.category}] ${p.title} -> ${p.fullUrl}`);
});
