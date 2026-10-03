const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BASE_URL = 'https://igloohimalayatreks.com';

function walk(dir) {
  let files = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.git' || entry === 'dist' || entry === 'scratch' || entry === '.gemini' || entry === '.tempmediaStorage') continue;
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(walk(fullPath));
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = walk(ROOT_DIR);
const urlMap = new Map();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');

  // Skip duplicate legacy root redirect/duplicate pages if any (e.g. equipment-checklist.html vs equipment-checklist/index.html)
  if (relPath === 'equipment-checklist.html' && fs.existsSync(path.join(ROOT_DIR, 'equipment-checklist', 'index.html'))) {
    continue;
  }

  // Extract canonical if present
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  let canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : '';

  if (!canonicalUrl) {
    if (relPath === 'index.html') {
      canonicalUrl = `${BASE_URL}/`;
    } else if (relPath.endsWith('/index.html')) {
      canonicalUrl = `${BASE_URL}/${relPath.replace(/\/index\.html$/, '/')}`;
    } else {
      canonicalUrl = `${BASE_URL}/${relPath}`;
    }
  }

  // Determine priority & changefreq based on route type
  let priority = '0.7';
  let changefreq = 'monthly';

  if (canonicalUrl === `${BASE_URL}/`) {
    priority = '1.0';
    changefreq = 'daily';
  } else if (canonicalUrl.includes('/blog/')) {
    priority = '0.8';
    changefreq = 'weekly';
  } else if (canonicalUrl.includes('/trek/') || canonicalUrl.includes('/tour/')) {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (canonicalUrl.includes('nepal-trekking-packages') || canonicalUrl.includes('blogs.html') || canonicalUrl.includes('regions.html')) {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (canonicalUrl.includes('privacy-policy') || canonicalUrl.includes('terms-and-conditions')) {
    priority = '0.3';
    changefreq = 'yearly';
  }

  // Get last modified date (YYYY-MM-DD)
  const stat = fs.statSync(file);
  const lastmod = new Date(stat.mtime).toISOString().split('T')[0];

  if (!urlMap.has(canonicalUrl)) {
    urlMap.set(canonicalUrl, { loc: canonicalUrl, lastmod, changefreq, priority });
  }
}

// Generate valid XML
const urls = Array.from(urlMap.values());
urls.sort((a, b) => (b.priority - a.priority));

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✔ Generated sitemap.xml with ${urls.length} canonical URLs`);

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Disallow: /scratch/
Disallow: /node_modules/

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf8');
console.log(`✔ Generated robots.txt`);
