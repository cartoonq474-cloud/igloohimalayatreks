const http = require('http');

const urls = [
  '/trek/kanchenjunga-circuit-trek/',
  '/trek/makalu-base-camp-trek/',
  '/trek/dhaulagiri-circuit-trek/',
  '/trek/rolwaling-valley-trek/',
  '/trek/rara-lake-trek/',
  '/trek/ruby-valley-trek/',
  '/trek/chisapani-nagarkot-trek/',
  '/trek/pikey-peak-trek/',
  '/trek/everest-view-trek/',
  '/trek/everest-three-passes-trek/',
  '/trek/gokyo-lakes-trek/',
  '/trek/gokyo-lakes-and-cho-la-pass/',
  '/trek/island-peak-climbing/',
  '/trek/mera-peak-climbing/',
  '/trek/lobuche-peak-climbing/',
  '/trek/three-high-passes-with-island-peak-climb/'
];

function fetchUrl(u) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${u}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]+)<\/title>/);
        const itinCount = (data.match(/class=["']itinerary-card/g) || []).length;
        const incCount = (data.match(/class=["']inc-exc-card/g) || []).length;
        resolve({
          url: u,
          statusCode: res.statusCode,
          title: titleMatch ? titleMatch[1].slice(0, 40) : 'NO TITLE',
          itinDays: itinCount,
          incExcCards: incCount,
          sizeKB: Math.round(data.length / 1024)
        });
      });
    }).on('error', (err) => {
      resolve({ url: u, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing live local server responses for optimized pages:\n');
  for (const u of urls) {
    const r = await fetchUrl(u);
    if (r.error) {
      console.log(`FAIL [${u}]: ${r.error}`);
    } else {
      console.log(`OK [${r.statusCode}] ${r.url.padEnd(46, ' ')} | Days: ${String(r.itinDays).padStart(2, ' ')} | Inc/Exc: ${r.incExcCards} | ${r.sizeKB}KB | ${r.title}`);
    }
  }
}

run();
