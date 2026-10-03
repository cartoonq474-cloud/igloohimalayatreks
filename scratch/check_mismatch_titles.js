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
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let title = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : folder;
  // Clean up duration like "(14 Days)" or badges if present
  title = title.replace(/\s*\(\d+\s*Days?\)/i, '').trim();
  console.log(`${folder} => "${title}"`);
});
