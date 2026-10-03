const http = require('http');
const fs = require('fs');
const path = require('path');

const userUrls = [
  '/trip/everest-base-camp-luxury-trek',
  '/trip/lobuche-peak-climbing-trek',
  '/trip/ebc-trek-with-island-peak',
  '/trip/everest-base-camp-trek-road-based',
  '/trip/tengbuche-trek',
  '/trip/everest-base-camp-trek',
  '/trip/three-high-passes-with-island-peak-climb',
  '/trip/everest-view-mini-trek',
  '/trip/gokyo-lake-helicopter-tour',
  '/trip/everest-base-camp-with-cho-la-and-renjo-la-pass-trek',
  '/trip/gokyo-lake-with-ranjo-la-pass-trek',
  '/trip/everest-base-camp-heli-tour',
  '/trip/mera-peak',
  '/trip/everest-base-camp-with-chola-pass-gokyo-trek',
  '/trip/pikey-peak-trek',
  '/trip/everest-base-camp-trek-without-flight',
  '/trip/gokyo-lakes-trek',
  '/trip/gokyo-lakes-luxury-trek',
  '/trip/everest-chola-and-renjo-la-pass-trek',
  '/trip/gokyo-lake-with-renjo-la-pass-trek',
  '/trip/ebc-chola-pass-gokyo-trek',
  '/trip/everest-view-trek',
  '/trip/lobuche-peak-climbing',
  '/trip/island-peak-climbing',
  '/trip/mera-peak-climbing',
  '/trip/gokyo-lake-trek-with-helicopter-return',
  '/trip/everest-base-camp-with-island-peak-climb',
  '/trip/everest-base-camp-16-days',
  '/trip/everest-three-passes-trek',
  '/trip/everest-base-camp-helicopter-tour'
];

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          location: res.headers.location,
          data
        });
      });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function testAll() {
  console.log(`Starting verification of ${userUrls.length} user URLs...\n`);
  let passed = 0;
  let failed = 0;

  for (const url of userUrls) {
    const res = await fetchUrl(url);
    if (res.statusCode === 301 && res.location) {
      // follow redirect
      const destRes = await fetchUrl(res.location);
      if (destRes.statusCode === 200) {
        console.log(`✅ [301 -> 200 OK] ${url} -> ${res.location}`);
        passed++;
      } else {
        console.log(`❌ [301 -> ${destRes.statusCode}] ${url} -> ${res.location}`);
        failed++;
      }
    } else if (res.statusCode === 200) {
      console.log(`✅ [200 OK Direct] ${url}`);
      passed++;
    } else {
      console.log(`❌ [Status ${res.statusCode}] ${url} (Location: ${res.location || 'none'})`);
      failed++;
    }
  }

  console.log(`\nURL Verification Summary: ${passed} Passed, ${failed} Failed out of ${userUrls.length}`);

  // Now verify newly generated pages on disk
  const pages = [
    'trek/everest-base-camp-luxury-trek/index.html',
    'trek/gokyo-lakes-luxury-trek/index.html',
    'trek/gokyo-lake-trek-with-helicopter-return/index.html',
    'trek/everest-base-camp-trek-without-flight/index.html',
    'trek/island-peak-climbing/index.html',
    'trek/mera-peak-climbing/index.html',
    'trek/lobuche-peak-climbing/index.html',
    'trek/three-high-passes-with-island-peak-climb/index.html',
    'tour/everest-base-camp-helicopter-tour/index.html'
  ];

  console.log('\nVerifying HTML integrity and image assets of generated packages:');
  const ROOT = path.resolve(__dirname, '..');
  let pageErrors = 0;

  for (const p of pages) {
    const full = path.join(ROOT, p);
    if (!fs.existsSync(full)) {
      console.log(`❌ File missing: ${p}`);
      pageErrors++;
      continue;
    }
    const html = fs.readFileSync(full, 'utf8');
    const hasTitle = /<title>[^<]+<\/title>/.test(html);
    const hasCanonical = /<link rel="canonical" href="https:\/\/igloohimalayatreks\.com\/[^"]+\/"\s*\/?>/.test(html);
    const hasSchema = /"@type":\s*"(TouristTrip|Product|FAQPage|BreadcrumbList)"/.test(html);
    
    // Check images
    const imgMatches = html.match(/src="(\.\.\/\.\.\/images\/[^"]+)"/g) || [];
    let brokenImages = 0;
    for (const m of imgMatches) {
      const relPath = m.replace('src="', '').replace('"', '');
      const absImg = path.resolve(path.dirname(full), relPath);
      if (!fs.existsSync(absImg)) {
        console.log(`   ❌ Missing image: ${relPath} in ${p}`);
        brokenImages++;
      }
    }

    if (hasTitle && hasCanonical && hasSchema && brokenImages === 0) {
      console.log(`✅ [Valid Package] ${p} (Images: ${imgMatches.length}, Schema: OK, Canonical: OK)`);
    } else {
      console.log(`❌ [Issues in Package] ${p} (Title: ${hasTitle}, Canonical: ${hasCanonical}, BrokenImgs: ${brokenImages})`);
      pageErrors++;
    }
  }

  console.log(`\nPackage Integrity Summary: ${pages.length - pageErrors}/${pages.length} Perfect`);
}

testAll();
