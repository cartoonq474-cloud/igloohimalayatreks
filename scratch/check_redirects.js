const fs = require('fs');
const path = require('path');

const noFaqPages = [
  'trek/annapurna-base-camp-helicopter-return-trek/index.html',
  'trek/ebc-trek-with-island-peak/index.html',
  'trek/everest-base-camp-chola-pass-gokyo-trek/index.html',
  'trek/everest-base-camp-trek-road-based/index.html',
  'trek/everest-base-camp-with-island-peak-climb/index.html',
  'trek/everest-chola-and-renjo-la-pass-trek/index.html',
  'trek/gokyo-lake-with-renjo-la-pass-trek/index.html',
  'trek/kanchenjunga-circuit-trek-nepal/index.html',
  'trek/lobuche-peak-climbing-trek/index.html',
  'trek/manaslu-circuit-with-tsum-valley-trek/index.html',
  'trek/mera-peak/index.html',
  'trek/tamang-heritage-trail-langtang-valley/index.html',
  'tour/everest-base-camp-heli-tour/index.html',
  'tour/gokyo-lake-helicopter-tour/index.html',
  'tour/upper-mustang-jeep-tour/index.html'
];

noFaqPages.forEach(p => {
  const full = path.join(__dirname, '..', p);
  const html = fs.readFileSync(full, 'utf8');
  const isRedirect = /http-equiv=["']refresh["']/i.test(html) || /window\.location/i.test(html);
  const lineCount = html.split('\n').length;
  console.log(`${p}: ${lineCount} lines | isRedirect = ${isRedirect}`);
  if (isRedirect) {
    const target = html.match(/url=([^"'>]+)/i);
    console.log(`   -> redirects to: ${target ? target[1] : 'unknown'}`);
  }
});
