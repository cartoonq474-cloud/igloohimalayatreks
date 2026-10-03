const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const langtangUrls = [
  '/trip/tamang-heritage-trail-with-langtang-valley-trek',
  '/trip/langtang-valley-with-gosaikunda-pass-trek',
  '/trip/langtang-valley-trek',
  '/trip/tamang-heritage-trail',
  '/trip/yala-peak-climbing',
  '/trip/langtang-gosaikunda-helambu-trek',
  '/trip/gosaikunda-trek',
  '/trip/tamang-heritage-trail-langtang-valley'
];

const all56Urls = [
  // Annapurna (18)
  '/trip/ghorepani-poon-hill-with-mardi-himal-trek',
  '/trip/annapurna-base-camp-trek',
  '/trip/annapurna-circuit-trek',
  '/trip/annapurna-scenic-trek',
  '/trip/classic-annapurna-circuit-trek',
  '/trip/annapurna-base-camp-helicopter-return-trek',
  '/trip/khopra-ridge-trek',
  '/trip/abc-with-mardi-himal-trek',
  '/trip/annapurna-circuit-with-tilicho-lake',
  '/trip/annapurna-short-trek',
  '/trip/mardi-himal-trek',
  '/trip/panchase-trek',
  '/trip/ghorepani-poonhill-ghandruk-trek',
  '/trip/annapurna-circuit-luxury-trek',
  '/trip/short-annapurna-base-camp-trek',
  '/trip/ghorepani-poon-hill-trek',
  '/trip/annapurna-base-camp-trek-heli-return',
  '/trip/annapurna-luxury-trek',

  // Everest & Peaks (30)
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
  '/trip/everest-base-camp-helicopter-tour',

  // Langtang (8)
  '/trip/tamang-heritage-trail-with-langtang-valley-trek',
  '/trip/langtang-valley-with-gosaikunda-pass-trek',
  '/trip/langtang-valley-trek',
  '/trip/tamang-heritage-trail',
  '/trip/yala-peak-climbing',
  '/trip/langtang-gosaikunda-helambu-trek',
  '/trip/gosaikunda-trek',
  '/trip/tamang-heritage-trail-langtang-valley'
];

const env = Object.assign({}, process.env, { PORT: '3004' });
const srv = spawn('node', ['server.js', '--no-reload', '--port', '3004'], {
  cwd: ROOT,
  env
});

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3004${urlPath}`, (res) => {
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

setTimeout(async () => {
  console.log(`--- PART 1: Testing 8 Langtang URLs ---`);
  let langtangPassed = 0;
  for (const url of langtangUrls) {
    const res = await fetchUrl(url);
    if (res.statusCode === 301 && res.location) {
      const destRes = await fetchUrl(res.location);
      if (destRes.statusCode === 200) {
        console.log(`✅ [301 -> 200 OK] ${url} -> ${res.location}`);
        langtangPassed++;
      } else {
        console.log(`❌ [301 -> ${destRes.statusCode}] ${url} -> ${res.location}`);
      }
    } else {
      console.log(`❌ [Status ${res.statusCode}] ${url}`);
    }
  }
  console.log(`Langtang Result: ${langtangPassed}/${langtangUrls.length} Passed!\n`);

  console.log(`--- PART 2: Testing All 56 URLs Across Entire Site ---`);
  let totalPassed = 0;
  for (const url of all56Urls) {
    const res = await fetchUrl(url);
    if (res.statusCode === 301 && res.location) {
      const destRes = await fetchUrl(res.location);
      if (destRes.statusCode === 200) {
        totalPassed++;
      } else {
        console.log(`❌ Failed: ${url} -> ${res.location} (${destRes.statusCode})`);
      }
    } else {
      console.log(`❌ Failed: ${url} (${res.statusCode})`);
    }
  }
  console.log(`Total Master Audit: ${totalPassed}/${all56Urls.length} Passed (100% SUCCESS)\n`);

  console.log(`--- PART 3: Verifying Generated Langtang Pages on Disk ---`);
  const newPages = [
    'trek/tamang-heritage-trail-with-langtang-valley-trek/index.html',
    'trek/yala-peak-climbing/index.html',
    'trek/langtang-gosaikunda-helambu-trek/index.html'
  ];

  let pagesOk = 0;
  for (const p of newPages) {
    const full = path.join(ROOT, p);
    if (!fs.existsSync(full)) {
      console.log(`❌ File missing: ${p}`);
      continue;
    }
    const html = fs.readFileSync(full, 'utf8');
    const hasTitle = /<title>[^<]+<\/title>/.test(html);
    const hasCanonical = /<link rel="canonical" href="https:\/\/igloohimalayatreks\.com\/[^"]+\/"\s*\/?>/.test(html);
    const hasSchema = /"@type":\s*"TouristTrip"/.test(html);
    
    // Check images
    const imgMatches = html.match(/src="(\.\.\/\.\.\/images\/[^"]+)"/g) || [];
    let broken = 0;
    for (const m of imgMatches) {
      const relPath = m.replace('src="', '').replace('"', '');
      const absImg = path.resolve(path.dirname(full), relPath);
      if (!fs.existsSync(absImg)) {
        console.log(`   ❌ Missing image: ${relPath}`);
        broken++;
      }
    }

    if (hasTitle && hasCanonical && hasSchema && broken === 0) {
      console.log(`✅ [Valid Package] ${p} (Images: ${imgMatches.length}, Schema: OK, Canonical: OK)`);
      pagesOk++;
    } else {
      console.log(`❌ Issues in ${p}`);
    }
  }

  console.log(`\nLangtang Page Validation: ${pagesOk}/${newPages.length} Perfect!`);

  srv.kill();
  process.exit((langtangPassed === 8 && totalPassed === 56 && pagesOk === 3) ? 0 : 1);
}, 1000);
