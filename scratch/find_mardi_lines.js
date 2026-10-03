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
  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) return;
  const lines = faqMatch[0].split('\n');
  console.log(`\n=== ${folder} ===`);
  lines.forEach(line => {
    if (line.includes('Mardi Himal')) {
      console.log('  ' + line.trim());
    }
  });
});
