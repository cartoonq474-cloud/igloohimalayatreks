const fs = require('fs');
const path = require('path');

const ebcMismatchFolders = [
  'chisapani-nagarkot-trek',
  'kanchenjunga-base-camp-trek',
  'kanchenjunga-circuit-trek',
  'kanchenjunga-trek-without-flight',
  'langtang-gosaikunda-helambu-trek',
  'lower-dolpo-trek',
  'manaslu-circuit-trek-12-days',
  'tamang-heritage-trail-with-langtang-valley-trek',
  'upper-dolpo-trek',
  'upper-mustang-jeep-tour',
  'upper-mustang-tiji-festival',
  'yala-peak-climbing'
];

ebcMismatchFolders.forEach(f => {
  const filePath = path.join(__dirname, '../trek', f, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const catMatch = html.match(/id=["']faq-cat-permits["']([\s\S]*?)<\/div>\s*<\/div>/i);
  if (catMatch) {
    const qMatches = [...catMatch[1].matchAll(/<div class="faq-item-question">([\s\S]*?)<\/div>/gi)];
    console.log(`${f}:`);
    qMatches.forEach(qm => {
      console.log('  ' + qm[1].replace(/<[^>]+>/g, '').trim());
    });
  } else {
    console.log(`${f}: NO faq-cat-permits`);
  }
});
