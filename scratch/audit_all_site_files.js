const fs = require('fs');
const path = require('path');

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
console.log(`Total HTML files found in repo: ${files.length}`);

const pageMap = new Map();

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

  let urlPath = '/' + rel.replace(/index\.html$/, '');
  if (!urlPath.endsWith('/')) urlPath += '/';
  if (urlPath === '/index/') urlPath = '/';

  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  let title = titleMatch ? titleMatch[1].split('—')[0].replace(/\|.*$/, '').trim() : rel;
  title = title.replace(/\s*\([^)]*$/, '').trim();

  // Extract duration and altitude if present
  const durMatch = content.match(/Duration<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) || content.match(/([0-9]+\s*days?)/i);
  const altMatch = content.match(/Max Altitude<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) || content.match(/(\d{1,2},\d{3}\s*m)/i);
  const regionMatch = content.match(/Trek Region<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) || content.match(/Region<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);

  pageMap.set(urlPath, {
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

console.log(`Unique Canonical/Stub Routes on New Website: ${pageMap.size}`);

const categories = {
  hubs: [],
  treks: [],
  tours: [],
  team: [],
  guides: [],
  company: [],
  redirects: []
};

for (const [url, item] of pageMap.entries()) {
  if (item.isRedirect) {
    categories.redirects.push(item);
  } else if (url.startsWith('/trek/')) {
    categories.treks.push(item);
  } else if (url.startsWith('/tour/')) {
    categories.tours.push(item);
  } else if (url.startsWith('/team/')) {
    categories.team.push(item);
  } else if (['/nepal-trekking-packages/', '/nepal-tour-packages/', '/everest-region-treks/', '/annapurna-region-treks/', '/langtang-region-treks/', '/manaslu-region-treks/', '/mustang-region-treks/', '/dolpo-region-treks/', '/kanchenjunga-region-treks/', '/makalu-region-treks/', '/rolwaling-region-treks/', '/ganesh-himal-region-treks/', '/peak-climbing-nepal/', '/restricted-area-treks-nepal/', '/trekking-regions-nepal/'].includes(url)) {
    categories.hubs.push(item);
  } else if (['/equipment-checklist/', '/nepal-travel-guide/', '/nepal-visa/', '/travel-insurance/', '/recommended-medical-kit/'].includes(url)) {
    categories.guides.push(item);
  } else {
    categories.company.push(item);
  }
}

console.log('\n--- NEW WEBSITE PAGE INVENTORY ---');
console.log(`Active Treks: ${categories.treks.length}`);
console.log(`Active Tours: ${categories.tours.length}`);
console.log(`Destination & Category Hubs: ${categories.hubs.length}`);
console.log(`Travel Guides: ${categories.guides.length}`);
console.log(`Team Profiles: ${categories.team.length}`);
console.log(`Company & Policy Pages: ${categories.company.length}`);
console.log(`Legacy Redirect Stubs: ${categories.redirects.length}`);
console.log(`Total Active Pages: ${categories.treks.length + categories.tours.length + categories.hubs.length + categories.guides.length + categories.team.length + categories.company.length}`);
