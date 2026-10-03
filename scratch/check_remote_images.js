const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images');
const files = fs.readdirSync(imgDir);

const terms = ['kanchenjunga', 'makalu', 'dhaulagiri', 'rolwaling', 'rara', 'ruby', 'chisapani', 'nagarkot', 'pikey', 'gokyo', 'passes', 'three-passes', 'island-peak', 'mera-peak', 'lobuche', 'everest-view'];

terms.forEach(t => {
  const matches = files.filter(f => f.toLowerCase().includes(t));
  console.log(`\n=== Keyword: ${t} (${matches.length} images) ===`);
  matches.slice(0, 8).forEach(m => console.log('  ' + m));
});
