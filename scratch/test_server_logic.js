const http = require('http');

// Test against port 3002 with child process running server.js
const { spawn } = require('child_process');
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

const env = Object.assign({}, process.env, { PORT: '3002' });
const srv = spawn('node', ['server.js', '--no-reload', '--port', '3002'], {
  cwd: path.resolve(__dirname, '..'),
  env
});

srv.stdout.on('data', d => {
  // console.log('server:', d.toString());
});

srv.stderr.on('data', d => {
  // console.error('server err:', d.toString());
});

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3002${urlPath}`, (res) => {
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
  console.log(`Testing all ${userUrls.length} routes against freshly spawned server (port 3002)...\n`);
  let passed = 0;
  let failed = 0;

  for (const url of userUrls) {
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

  console.log(`\nFinal Test Result: ${passed}/${userUrls.length} Passed!`);
  srv.kill();
  process.exit(failed === 0 ? 0 : 1);
}, 1000);
