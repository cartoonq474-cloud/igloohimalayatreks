const fs = require('fs');
const path = require('path');

const liveUrls = JSON.parse(fs.readFileSync('scratch/live_scraped_urls.json', 'utf8'));
const livePaths = new Set(liveUrls.map(u => {
  try {
    let p = new URL(u).pathname;
    if (!p.endsWith('/')) p += '/';
    return p;
  } catch(e) {
    return '';
  }
}));

// Find all HTML files in local repo
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') return;
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

const localFiles = walk('.');
const localPages = [];

localFiles.forEach(f => {
  const rel = path.relative('.', f).replace(/\\/g, '/');
  // Skip flat legacy html if directory index.html exists
  if (rel.includes('.html') && !rel.endsWith('index.html') && rel !== 'index.html' && rel !== 'google-sheets-exporter.html') {
    return;
  }
  if (rel === 'google-sheets-exporter.html') return;

  const content = fs.readFileSync(f, 'utf8');
  const isRedirect = /http-equiv=["']refresh["']/i.test(content) && content.length < 5000;
  const redirectTarget = isRedirect ? (content.match(/url=([^"'>\s]+)/i) || [])[1] : null;

  let route = '/' + rel.replace(/index\.html$/, '');
  if (!route.endsWith('/')) route += '/';
  if (route === '/index/') route = '/';

  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].split('—')[0].replace(/\|.*$/, '').trim() : rel;

  localPages.push({
    file: rel,
    route,
    isRedirect,
    redirectTarget,
    title
  });
});

console.log(`Total canonical local pages: ${localPages.length}`);

// Check each local page: did it exist on old live site?
const newAddedPages = [];
const existingPages = [];
const redirectStubs = [];

localPages.forEach(lp => {
  if (lp.isRedirect) {
    redirectStubs.push(lp);
    return;
  }

  // Check if route existed on live site (either as exact route, or as /trip/[slug]/, or as /activities/...)
  const slug = lp.route.split('/').filter(Boolean).pop();
  const tripRoute = `/trip/${slug}/`;

  let matchedOldUrl = null;
  if (livePaths.has(lp.route)) {
    matchedOldUrl = lp.route;
  } else if (livePaths.has(tripRoute)) {
    matchedOldUrl = tripRoute;
  }

  if (matchedOldUrl) {
    existingPages.push({ ...lp, oldUrl: matchedOldUrl });
  } else {
    newAddedPages.push(lp);
  }
});

console.log(`\n=== LOCAL PAGES BREAKDOWN ===`);
console.log(`Total Local Active Pages: ${existingPages.length + newAddedPages.length}`);
console.log(`  - Migrated from Old Site: ${existingPages.length}`);
console.log(`  - BRAND NEW ADDED PAGES in Redesign: ${newAddedPages.length}`);
console.log(`Redirect Stubs: ${redirectStubs.length}`);

console.log(`\n--- BRAND NEW ADDED PAGES (${newAddedPages.length}) ---`);
newAddedPages.forEach((p, i) => {
  console.log(`${i+1}. ${p.route.padEnd(46)} | File: ${p.file.padEnd(40)} | "${p.title.slice(0, 40)}"`);
});
