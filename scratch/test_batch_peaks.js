const http = require('http');

const urls = [
  { url: '/trip/lobuche-peak-climbing', expected: '/trek/lobuche-peak-climbing/' },
  { url: '/trip/lobuche-peak-climbing-trek', expected: '/trek/lobuche-peak-climbing/' },
  { url: '/trip/island-peak-climbing', expected: '/trek/island-peak-climbing/' },
  { url: '/trip/mera-peak', expected: '/trek/mera-peak-climbing/' },
  { url: '/trip/mera-peak-climbing', expected: '/trek/mera-peak-climbing/' },
  { url: '/trip/yala-peak-climbing', expected: '/trek/yala-peak-climbing/' },
  { url: '/trip/three-high-passes-with-island-peak-climb', expected: '/trek/three-high-passes-with-island-peak-climb/' }
];

function check(item) {
  return new Promise(resolve => {
    http.get(`http://localhost:3000${item.url}`, res => {
      const loc = res.headers.location;
      const isRedirectOk = res.statusCode === 301 && loc === item.expected;
      if (!isRedirectOk) {
        return resolve({ ...item, pass: false, error: `Got ${res.statusCode} -> ${loc}` });
      }

      http.get(`http://localhost:3000${loc}`, targetRes => {
        let body = '';
        targetRes.on('data', c => body += c);
        targetRes.on('end', () => {
          const targetOk = targetRes.statusCode === 200 && body.includes('<h1');
          resolve({ ...item, pass: targetOk, targetStatus: targetRes.statusCode });
        });
      });
    }).on('error', err => resolve({ ...item, pass: false, error: err.message }));
  });
}

async function run() {
  console.log(`Checking 7 peak climbing URLs against http://localhost:3000...\n`);
  let allPass = true;
  for (const u of urls) {
    const res = await check(u);
    if (res.pass) {
      console.log(`[PASS] ${u.url} -> 301 -> ${u.expected} -> 200 OK`);
    } else {
      allPass = false;
      console.log(`[FAIL] ${u.url} : ${res.error || ('Target returned ' + res.targetStatus)}`);
    }
  }

  console.log(`\nResult: ${allPass ? 'ALL PASS' : 'SOME FAILED'}`);
}

run();
