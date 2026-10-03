const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images');
const files = fs.readdirSync(imgDir);

const terms = ['barun', 'tsho', 'rolpa', 'gauri', 'ganesh', 'himal', 'remote', 'glacier', 'pass', 'circuit', 'valley', 'lake', 'peak'];

terms.forEach(t => {
  const matches = files.filter(f => f.toLowerCase().includes(t) && f.endsWith('.webp'));
  console.log(`\n=== Keyword: ${t} (${matches.length} webp images) ===`);
  matches.slice(0, 5).forEach(m => console.log('  ' + m));
});
