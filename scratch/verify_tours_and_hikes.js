const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3015;
const BASE = `http://localhost:${PORT}`;

// Spawn isolated server instance
const serverProc = spawn('node', ['server.js'], {
  cwd: path.resolve(__dirname, '..'),
  env: { ...process.env, PORT: String(PORT) },
  stdio: 'pipe'
});

serverProc.stdout.on('data', d => {});
serverProc.stderr.on('data', d => console.error(d.toString()));

function request(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE}${urlPath}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        location: res.headers.location,
        body: data
      }));
    }).on('error', reject);
  });
}

const allUrls = [
  // 1. Day Tours, Cycling, Valley Hikes & Cultural Tours (9 New URLs)
  { url: '/trip/one-day-kathmandu-city-tour', expectedTarget: '/tour/one-day-kathmandu-city-tour/' },
  { url: '/trip/day-cycling-tour-kathmandu', expectedTarget: '/tour/cycling-tour-around-kathmandu-valley/' },
  { url: '/trip/cycling-tour-around-kathmandu-valley', expectedTarget: '/tour/cycling-tour-around-kathmandu-valley/' },
  { url: '/trip/kathmandu-heritage-tour', expectedTarget: '/tour/kathmandu-cultural-heritage-tour/' },
  { url: '/trip/jamacho-hike', expectedTarget: '/tour/jamacho-hike/' },
  { url: '/trip/rara-lake-jeep-tour', expectedTarget: '/tour/rara-lake-jeep-tour/' },
  { url: '/trip/honeymoon-tour-in-nepal', expectedTarget: '/tour/honeymoon-tour-in-nepal/' },
  { url: '/trip/chisapani-nagarkot-trek', expectedTarget: '/trek/chisapani-nagarkot-trek/' },
  { url: '/trip/chitwan-jungle-safari-tour', expectedTarget: '/tour/chitwan-national-park-safari/' },

  // Direct Packages & Hubs
  { url: '/tour/one-day-kathmandu-city-tour/', expectedTarget: null },
  { url: '/tour/cycling-tour-around-kathmandu-valley/', expectedTarget: null },
  { url: '/tour/jamacho-hike/', expectedTarget: null },
  { url: '/tour/rara-lake-jeep-tour/', expectedTarget: null },
  { url: '/tour/honeymoon-tour-in-nepal/', expectedTarget: null },
  { url: '/trek/chisapani-nagarkot-trek/', expectedTarget: null },
  { url: '/tour/kathmandu-cultural-heritage-tour/', expectedTarget: null },
  { url: '/tour/chitwan-national-park-safari/', expectedTarget: null },
  { url: '/nepal-tour-packages/', expectedTarget: null },

  // Dolpo (2 requested)
  { url: '/trip/lower-dolpo-trek', expectedTarget: '/trek/lower-dolpo-trek/' },
  { url: '/trip/upper-dolpo-trek', expectedTarget: '/trek/upper-dolpo-trek/' },
  { url: '/trek/lower-dolpo-trek/', expectedTarget: null },
  { url: '/trek/upper-dolpo-trek/', expectedTarget: null },
  { url: '/dolpo-region-treks/', expectedTarget: null },

  // Mustang (3 requested + alias)
  { url: '/trip/upper-mustang-trek', expectedTarget: '/trek/upper-mustang-trek/' },
  { url: '/trip/upper-mustang-jeep-tour', expectedTarget: '/trek/upper-mustang-jeep-tour/' },
  { url: '/trip/upper-mustang-tiji-festival', expectedTarget: '/trek/upper-mustang-tiji-festival/' },
  { url: '/tour/upper-mustang-jeep-tour/', expectedTarget: '/trek/upper-mustang-jeep-tour/' },
  { url: '/trek/upper-mustang-trek/', expectedTarget: null },
  { url: '/trek/upper-mustang-jeep-tour/', expectedTarget: null },
  { url: '/trek/upper-mustang-tiji-festival/', expectedTarget: null },
  { url: '/mustang-region-treks/', expectedTarget: null },

  // Kanchenjunga (3)
  { url: '/trip/kanchenjunga-circuit-trek', expectedTarget: '/trek/kanchenjunga-circuit-trek/' },
  { url: '/trip/kanchenjunga-trek-without-flight', expectedTarget: '/trek/kanchenjunga-trek-without-flight/' },
  { url: '/trip/kanchenjunga-circuit-trek-nepal', expectedTarget: '/trek/kanchenjunga-circuit-trek/' },
  { url: '/trek/kanchenjunga-circuit-trek/', expectedTarget: null },
  { url: '/trek/kanchenjunga-trek-without-flight/', expectedTarget: null },
  { url: '/kanchenjunga-region-treks/', expectedTarget: null },

  // Manaslu (5)
  { url: '/trip/manaslu-circuit-with-tsum-valley-trek', expectedTarget: '/trek/manaslu-tsum-valley-trek/' },
  { url: '/trip/manaslu-circuit-trek', expectedTarget: '/trek/manaslu-circuit-trek/' },
  { url: '/trip/manaslu-circuit-trek-12-days', expectedTarget: '/trek/manaslu-circuit-trek-12-days/' },
  { url: '/trip/manaslu-tsum-valley-trek', expectedTarget: '/trek/manaslu-tsum-valley-trek/' },
  { url: '/trip/tsum-valley-trek', expectedTarget: '/trek/tsum-valley-trek/' },
  { url: '/manaslu-region-treks/', expectedTarget: null },

  // Langtang (8)
  { url: '/trip/tamang-heritage-trail-with-langtang-valley-trek', expectedTarget: '/trek/tamang-heritage-trail-with-langtang-valley-trek/' },
  { url: '/trip/langtang-valley-with-gosaikunda-pass-trek', expectedTarget: '/trek/langtang-gosaikunda-trek/' },
  { url: '/trip/langtang-valley-trek', expectedTarget: '/trek/langtang-valley-trek/' },
  { url: '/trip/tamang-heritage-trail', expectedTarget: '/trek/tamang-heritage-trail-trek/' },
  { url: '/trip/yala-peak-climbing', expectedTarget: '/trek/yala-peak-climbing/' },
  { url: '/trip/langtang-gosaikunda-helambu-trek', expectedTarget: '/trek/langtang-gosaikunda-helambu-trek/' },
  { url: '/trip/gosaikunda-trek', expectedTarget: '/trek/gosaikunda-lake-trek/' },
  { url: '/trip/tamang-heritage-trail-langtang-valley', expectedTarget: '/trek/tamang-heritage-trail-with-langtang-valley-trek/' },

  // Everest & Peaks (30)
  { url: '/trip/everest-base-camp-luxury-trek', expectedTarget: '/trek/everest-base-camp-luxury-trek/' },
  { url: '/trip/lobuche-peak-climbing-trek', expectedTarget: '/trek/lobuche-peak-climbing/' },
  { url: '/trip/ebc-trek-with-island-peak', expectedTarget: '/trek/island-peak-climbing/' },
  { url: '/trip/everest-base-camp-trek-road-based', expectedTarget: '/trek/everest-base-camp-trek-without-flight/' },
  { url: '/trip/tengbuche-trek', expectedTarget: '/trek/everest-view-trek/' },
  { url: '/trip/everest-base-camp-trek', expectedTarget: '/trek/everest-base-camp-trek/' },
  { url: '/trip/three-high-passes-with-island-peak-climb', expectedTarget: '/trek/three-high-passes-with-island-peak-climb/' },
  { url: '/trip/everest-view-mini-trek', expectedTarget: '/trek/everest-view-trek/' },
  { url: '/trip/gokyo-lake-helicopter-tour', expectedTarget: '/tour/everest-base-camp-helicopter-tour/' },
  { url: '/trip/everest-base-camp-with-cho-la-and-renjo-la-pass-trek', expectedTarget: '/trek/everest-three-passes-trek/' },
  { url: '/trip/gokyo-lake-with-ranjo-la-pass-trek', expectedTarget: '/trek/gokyo-lakes-trek/' },
  { url: '/trip/everest-base-camp-heli-tour', expectedTarget: '/tour/everest-base-camp-helicopter-tour/' },
  { url: '/trip/mera-peak', expectedTarget: '/trek/mera-peak-climbing/' },
  { url: '/trip/everest-base-camp-with-chola-pass-gokyo-trek', expectedTarget: '/trek/everest-base-camp-via-gokyo-lakes/' },
  { url: '/trip/pikey-peak-trek', expectedTarget: '/trek/pikey-peak-trek/' },
  { url: '/trip/everest-base-camp-trek-without-flight', expectedTarget: '/trek/everest-base-camp-trek-without-flight/' },
  { url: '/trip/gokyo-lakes-trek', expectedTarget: '/trek/gokyo-lakes-trek/' },
  { url: '/trip/gokyo-lakes-luxury-trek', expectedTarget: '/trek/gokyo-lakes-luxury-trek/' },
  { url: '/trip/everest-chola-and-renjo-la-pass-trek', expectedTarget: '/trek/everest-three-passes-trek/' },
  { url: '/trip/gokyo-lake-with-renjo-la-pass-trek', expectedTarget: '/trek/gokyo-lakes-trek/' },
  { url: '/trip/ebc-chola-pass-gokyo-trek', expectedTarget: '/trek/everest-base-camp-via-gokyo-lakes/' },
  { url: '/trip/everest-view-trek', expectedTarget: '/trek/everest-view-trek/' },
  { url: '/trip/lobuche-peak-climbing', expectedTarget: '/trek/lobuche-peak-climbing/' },
  { url: '/trip/island-peak-climbing', expectedTarget: '/trek/island-peak-climbing/' },
  { url: '/trip/mera-peak-climbing', expectedTarget: '/trek/mera-peak-climbing/' },
  { url: '/trip/gokyo-lake-trek-with-helicopter-return', expectedTarget: '/trek/gokyo-lake-trek-with-helicopter-return/' },
  { url: '/trip/everest-base-camp-with-island-peak-climb', expectedTarget: '/trek/island-peak-climbing/' },
  { url: '/trip/everest-base-camp-16-days', expectedTarget: '/trek/everest-base-camp-trek/' },
  { url: '/trip/everest-three-passes-trek', expectedTarget: '/trek/everest-three-passes-trek/' },
  { url: '/trip/everest-base-camp-helicopter-tour', expectedTarget: '/tour/everest-base-camp-helicopter-tour/' },

  // Annapurna (18)
  { url: '/trip/ghorepani-poon-hill-with-mardi-himal-trek', expectedTarget: '/trek/ghorepani-poon-hill-with-mardi-himal-trek/' },
  { url: '/trip/annapurna-base-camp-trek', expectedTarget: '/trek/annapurna-base-camp/' },
  { url: '/trip/annapurna-circuit-trek', expectedTarget: '/trek/annapurna-circuit-trek/' },
  { url: '/trip/annapurna-scenic-trek', expectedTarget: '/trek/panchase-trek/' },
  { url: '/trip/classic-annapurna-circuit-trek', expectedTarget: '/trek/annapurna-circuit-trek/' },
  { url: '/trip/annapurna-base-camp-helicopter-return-trek', expectedTarget: '/trek/annapurna-base-camp-heli-return/' },
  { url: '/trip/khopra-ridge-trek', expectedTarget: '/trek/khopra-ridge-trek/' },
  { url: '/trip/abc-with-mardi-himal-trek', expectedTarget: '/trek/abc-with-mardi-himal-trek/' },
  { url: '/trip/annapurna-circuit-with-tilicho-lake', expectedTarget: '/trek/tilicho-lake-trek/' },
  { url: '/trip/annapurna-short-trek', expectedTarget: '/trek/annapurna-short-trek/' },
  { url: '/trip/mardi-himal-trek', expectedTarget: '/trek/mardi-himal-trek/' },
  { url: '/trip/panchase-trek', expectedTarget: '/trek/panchase-trek/' },
  { url: '/trip/ghorepani-poonhill-ghandruk-trek', expectedTarget: '/trek/ghorepani-poon-hill-trek/' },
  { url: '/trip/annapurna-circuit-luxury-trek', expectedTarget: '/trek/annapurna-circuit-luxury-trek/' },
  { url: '/trip/short-annapurna-base-camp-trek', expectedTarget: '/trek/short-annapurna-base-camp-trek/' },
  { url: '/trip/ghorepani-poon-hill-trek', expectedTarget: '/trek/ghorepani-poon-hill-trek/' },
  { url: '/trip/annapurna-base-camp-trek-heli-return', expectedTarget: '/trek/annapurna-base-camp-heli-return/' },
  { url: '/trip/annapurna-luxury-trek', expectedTarget: '/trek/annapurna-luxury-trek/' },

  // Master Hubs
  { url: '/nepal-trekking-packages/', expectedTarget: null },
  { url: '/', expectedTarget: null }
];

async function runAudit() {
  await new Promise(r => setTimeout(r, 1200));

  console.log(`Auditing all ${allUrls.length} routes against ${BASE}...`);
  let passed = 0;
  let failed = 0;

  for (const item of allUrls) {
    try {
      const res = await request(item.url);
      if (item.expectedTarget) {
        if (res.statusCode === 301 && res.location === item.expectedTarget) {
          const targetRes = await request(item.expectedTarget);
          if (targetRes.statusCode === 200 && targetRes.body.includes('<h1')) {
            console.log(`[PASS] ${item.url} -> 301 -> ${item.expectedTarget} -> 200 OK`);
            passed++;
          } else {
            console.error(`[FAIL] ${item.url} -> 301 -> ${item.expectedTarget} returned ${targetRes.statusCode}`);
            failed++;
          }
        } else {
          console.error(`[FAIL] ${item.url}: Expected 301 to ${item.expectedTarget}, got ${res.statusCode} to ${res.location}`);
          failed++;
        }
      } else {
        if (res.statusCode === 200 && res.body.includes('<h1')) {
          console.log(`[PASS] ${item.url} -> 200 OK`);
          passed++;
        } else {
          console.error(`[FAIL] ${item.url}: Expected 200 OK, got ${res.statusCode}`);
          failed++;
        }
      }
    } catch (e) {
      console.error(`[ERR] ${item.url}: ${e.message}`);
      failed++;
    }
  }

  console.log('\n==================================================');
  console.log('SUMMARY REPORT');
  console.log(`Total endpoints tested: ${allUrls.length}`);
  console.log(`Passed (200 / 301 followed to 200): ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log('==================================================');

  if (failed === 0) {
    console.log('>>> ALL ' + allUrls.length + ' ENDPOINTS OPERATIONAL!\n');
  }

  serverProc.kill();
  process.exit(failed > 0 ? 1 : 0);
}

runAudit();
