const fs = require('fs');
const path = require('path');

const liveUrls = JSON.parse(fs.readFileSync('scratch/live_scraped_urls.json', 'utf8'));

// Extract server redirects from server.js
const serverJs = fs.readFileSync('server.js', 'utf8');
const redirectBlock = serverJs.match(/const URL_REDIRECTS = {([\s\S]*?)};/);
const serverRedirects = {};
if (redirectBlock) {
  const lines = redirectBlock[1].split('\n');
  lines.forEach(line => {
    const m = line.match(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/);
    if (m) {
      serverRedirects[m[1]] = m[2];
    }
  });
}

// Get all files in project
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

const allHtmlFiles = walk('.');
const localRoutes = new Map();

allHtmlFiles.forEach(file => {
  const rel = path.relative('.', file).replace(/\\/g, '/');
  let route = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
  if (!route.endsWith('/')) route += '/';
  if (route === '/index/') route = '/';

  const content = fs.readFileSync(file, 'utf8');
  const isRedirect = /http-equiv=["']refresh["']/i.test(content) && content.length < 5000;
  const redirectTarget = isRedirect ? (content.match(/url=([^"'>\s]+)/i) || [])[1] : null;

  localRoutes.set(route, {
    file: rel,
    isRedirect,
    redirectTarget
  });
});

console.log(`Local active/redirect routes mapped: ${localRoutes.size}`);
console.log(`Server.js 301 redirects mapped: ${Object.keys(serverRedirects).length}`);

// Categorize and map every live scraped URL
const mappingAnalysis = [];

liveUrls.forEach(fullUrl => {
  if (fullUrl.includes('fonts.googleapis.com')) return;

  try {
    const parsed = new URL(fullUrl);
    let pathname = parsed.pathname;
    if (!pathname.endsWith('/')) pathname += '/';

    let category = 'Other';
    let newUrl = '';
    let status = '';
    let notes = '';

    // Check if trip URL
    if (pathname.startsWith('/trip/')) {
      category = 'Trek / Tour Package';
      const cleanPath = pathname.replace(/\/$/, '');
      const sRedirect = serverRedirects[pathname] || serverRedirects[cleanPath];

      if (sRedirect) {
        newUrl = 'https://igloohimalayatreks.com' + sRedirect;
        status = '301 Redirect -> Optimized New Page';
        notes = 'Mapped via server.js 301 redirect table to authentic high-performance page';
      } else {
        // Try direct matching slug in trek/ or tour/
        const slug = pathname.replace('/trip/', '').replace(/\/$/, '');
        if (localRoutes.has(`/trek/${slug}/`)) {
          newUrl = `https://igloohimalayatreks.com/trek/${slug}/`;
          status = '301 Direct Match -> New Trek Page';
          notes = 'Exact slug match in /trek/';
        } else if (localRoutes.has(`/tour/${slug}/`)) {
          newUrl = `https://igloohimalayatreks.com/tour/${slug}/`;
          status = '301 Direct Match -> New Tour Page';
          notes = 'Exact slug match in /tour/';
        } else {
          // Check closest match
          newUrl = 'https://igloohimalayatreks.com/nepal-trekking-packages/';
          status = '301 Fallback -> Trekking Hub';
          notes = 'Old legacy trip mapped to main destination hub';
        }
      }
    } else if (pathname.startsWith('/activities/')) {
      category = 'Activities Hub';
      if (pathname.includes('trekking')) {
        newUrl = 'https://igloohimalayatreks.com/nepal-trekking-packages/';
        status = '301 Redirect -> Trekking Packages Hub';
      } else if (pathname.includes('tour') || pathname.includes('sightseeing')) {
        newUrl = 'https://igloohimalayatreks.com/nepal-tour-packages/';
        status = '301 Redirect -> Tour Packages Hub';
      } else if (pathname.includes('peak-climbing')) {
        newUrl = 'https://igloohimalayatreks.com/peak-climbing-nepal/';
        status = '301 Redirect -> Peak Climbing Hub';
      } else if (pathname.includes('heli')) {
        newUrl = 'https://igloohimalayatreks.com/tour/everest-base-camp-helicopter-tour/';
        status = '301 Redirect -> Helicopter Tour Page';
      } else if (pathname.includes('safari')) {
        newUrl = 'https://igloohimalayatreks.com/tour/chitwan-national-park-safari/';
        status = '301 Redirect -> Safari Tour Page';
      } else if (pathname.includes('cycling')) {
        newUrl = 'https://igloohimalayatreks.com/tour/cycling-tour-around-kathmandu-valley/';
        status = '301 Redirect -> Cycling Tour Page';
      } else if (pathname.includes('hiking')) {
        newUrl = 'https://igloohimalayatreks.com/tour/jamacho-hike/';
        status = '301 Redirect -> Hike Page';
      } else {
        newUrl = 'https://igloohimalayatreks.com/nepal-trekking-packages/';
        status = '301 Redirect -> Main Hub';
      }
      notes = 'Consolidated into high-converting regional/activity hub';
    } else if (localRoutes.has(pathname)) {
      const local = localRoutes.get(pathname);
      newUrl = 'https://igloohimalayatreks.com' + pathname;
      if (local.isRedirect) {
        status = '301 Redirect Stub';
        notes = `Redirects to ${local.redirectTarget}`;
      } else {
        status = '200 OK (Direct Canonical URL)';
        notes = 'Active modern static page with optimized layout';
      }

      if (pathname === '/') category = 'Homepage';
      else if (pathname.includes('trekking-packages') || pathname.includes('tour-packages')) category = 'Main Hub';
      else if (pathname.includes('guide') || pathname.includes('visa') || pathname.includes('insurance') || pathname.includes('checklist') || pathname.includes('medical')) category = 'Travel Guide';
      else category = 'Company / Policy Page';
    } else {
      // Blog posts / WordPress articles
      category = 'Blog Article / Post';
      newUrl = 'https://igloohimalayatreks.com/nepal-travel-guide/';
      status = '301 Redirect -> Nepal Travel Guide Hub';
      notes = 'WordPress blog post redirected to consolidated travel guide authority page';
    }

    mappingAnalysis.push({
      oldUrl: fullUrl,
      pathname,
      category,
      newUrl,
      status,
      notes
    });
  } catch(e) {}
});

console.log(`Analyzed ${mappingAnalysis.length} URLs.`);

// Summary by category
const counts = {};
mappingAnalysis.forEach(m => counts[m.category] = (counts[m.category] || 0) + 1);
console.log('Category Counts:', counts);

fs.writeFileSync('scratch/url_mapping_analysis.json', JSON.stringify(mappingAnalysis, null, 2), 'utf8');
console.log('Saved to scratch/url_mapping_analysis.json');
