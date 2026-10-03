const https = require('https');
const http = require('http');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 15000
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).href;
        }
        console.log(`Redirecting [${res.statusCode}] from ${url} -> ${redirectUrl}`);
        return fetchUrl(redirectUrl).then(resolve);
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, statusCode: res.statusCode, headers: res.headers, data });
      });
    });

    req.on('error', (err) => {
      resolve({ url, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ url, error: 'Timeout after 15s' });
    });
  });
}

async function scrapeLiveSite() {
  console.log('Fetching robots.txt and sitemaps from https://igloohimalayatreks.com ...');
  
  const robots = await fetchUrl('https://igloohimalayatreks.com/robots.txt');
  console.log('robots.txt status:', robots.statusCode, robots.error || '');
  if (robots.data) {
    console.log('robots.txt content:\n', robots.data.slice(0, 500));
  }

  const sitemapUrls = [
    'https://igloohimalayatreks.com/sitemap.xml',
    'https://igloohimalayatreks.com/sitemap_index.xml',
    'https://igloohimalayatreks.com/post-sitemap.xml',
    'https://igloohimalayatreks.com/page-sitemap.xml',
    'https://igloohimalayatreks.com/trip-sitemap.xml',
    'https://igloohimalayatreks.com/destination-sitemap.xml',
    'https://igloohimalayatreks.com/activity-sitemap.xml'
  ];

  const foundUrls = new Set();

  for (const sUrl of sitemapUrls) {
    const res = await fetchUrl(sUrl);
    if (res.statusCode === 200 && res.data) {
      console.log(`[FOUND SITEMAP] ${sUrl} (${res.data.length} bytes)`);
      // Parse URLs from XML
      const locMatches = [...res.data.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1].trim());
      console.log(`  Found ${locMatches.length} URLs in ${sUrl}`);
      locMatches.forEach(u => foundUrls.add(u));

      // Check if it's a sitemap index containing child sitemaps
      const sitemapChildMatches = [...res.data.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/sitemap>/gi)].map(m => m[1].trim());
      for (const childUrl of sitemapChildMatches) {
        if (!sitemapUrls.includes(childUrl)) {
          console.log(`  Fetching child sitemap: ${childUrl}`);
          const cRes = await fetchUrl(childUrl);
          if (cRes.statusCode === 200 && cRes.data) {
            const childLocs = [...cRes.data.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1].trim());
            console.log(`    Found ${childLocs.length} URLs in child ${childUrl}`);
            childLocs.forEach(u => foundUrls.add(u));
          }
        }
      }
    } else {
      console.log(`[SITEMAP 404 or ERR] ${sUrl}: status ${res.statusCode} ${res.error || ''}`);
    }
  }

  // Also fetch homepage to extract links
  console.log('\nFetching homepage https://igloohimalayatreks.com/ ...');
  const home = await fetchUrl('https://igloohimalayatreks.com/');
  if (home.statusCode === 200 && home.data) {
    const hrefMatches = [...home.data.matchAll(/href=["'](https?:\/\/igloohimalayatreks\.com[^"'#?]*|\/[^"'#?]*)/gi)].map(m => m[1]);
    console.log(`Found ${hrefMatches.length} href links on homepage.`);
    hrefMatches.forEach(h => {
      let full = h;
      if (full.startsWith('/')) full = 'https://igloohimalayatreks.com' + full;
      if (!full.match(/\.(jpg|jpeg|png|webp|gif|css|js|svg|ico)$/i)) {
        foundUrls.add(full);
      }
    });
  }

  const urlList = Array.from(foundUrls).sort();
  console.log(`\nTotal Unique URLs scraped from live site: ${urlList.length}`);
  fs.writeFileSync('scratch/live_scraped_urls.json', JSON.stringify(urlList, null, 2), 'utf8');
  console.log('Saved to scratch/live_scraped_urls.json');

  // Print first 30
  urlList.slice(0, 30).forEach((u, i) => console.log(`${i+1}. ${u}`));
}

scrapeLiveSite();
