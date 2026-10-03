const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images');
const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.webp'));

const categories = {
  view: files.filter(f => f.includes('everest-view')),
  threePasses: files.filter(f => f.includes('three-passes') || f.includes('high-passes')),
  gokyo: files.filter(f => f.includes('gokyo')),
  chola: files.filter(f => f.includes('chola') || f.includes('cho-la')),
  ebc: files.filter(f => f.includes('everest-base-camp'))
};

for (const [k, v] of Object.entries(categories)) {
  console.log(`\n=== Category: ${k} (${v.length} webp) ===`);
  v.slice(0, 6).forEach(img => console.log('  ' + img));
}
