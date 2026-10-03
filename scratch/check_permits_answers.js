const fs = require('fs');
const path = require('path');

const mismatches = [
  'annapurna-base-camp-heli-return',
  'annapurna-circuit-luxury-trek',
  'annapurna-luxury-trek',
  'annapurna-short-trek',
  'everest-base-camp-luxury-trek',
  'everest-base-camp-trek-without-flight',
  'gokyo-lake-trek-with-helicopter-return',
  'gokyo-lakes-luxury-trek',
  'island-peak-climbing',
  'lobuche-peak-climbing',
  'mera-peak-climbing',
  'short-annapurna-base-camp-trek',
  'three-high-passes-with-island-peak-climb'
];

mismatches.forEach(folder => {
  const filePath = path.join(__dirname, '../trek', folder, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const faqMatch = html.match(/<div[^>]*id=["']faq-cat-permits["'][\s\S]*?<\/div>\s*<\/div>/i);
  console.log(`\n=== ${folder} Permits Answer ===`);
  if (faqMatch) {
    console.log(faqMatch[0].slice(0, 350).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  }
});
