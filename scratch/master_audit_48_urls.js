const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const allUrls = [
  // Annapurna (18 URLs)
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

  // Everest & Peak Climbing (30 URLs)
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

const env = Object.assign({}, process.env, { PORT: '3003' });
const srv = spawn('node', ['server.js', '--no-reload', '--port', '3003'], {
  cwd: path.resolve(__dirname, '..'),
  env
});

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3003${urlPath}`, (res) => {
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
  console.log(`Auditing all ${allUrls.length} site URLs (Annapurna + Everest + Climbing Peaks)...\n`);
  let passed = 0;
  let failed = 0;

  for (const url of allUrls) {
    const res = await fetchUrl(url);
    if (res.statusCode === 301 && res.location) {
      const destRes = await fetchUrl(res.location);
      if (destRes.statusCode === 200) {
        console.log(`✅ [301 -> 200 OK] ${url} -> ${res.location}`);
        passed++;
      } else {
        console.log(`❌ [301 -> ${destRes.statusCode}] ${url} -> ${res.location}`);
        failed++;
      }
    } else {
      console.log(`❌ [Status ${res.statusCode}] ${url}`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`FINAL MASTER AUDIT: ${passed}/${allUrls.length} PASSED`);
  console.log(`========================================`);
  srv.kill();
  process.exit(failed === 0 ? 0 : 1);
}, 1000);
