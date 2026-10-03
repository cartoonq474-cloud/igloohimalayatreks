const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images');
const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.webp'));

const general = files.filter(f => 
  f.includes('himalaya') || 
  f.includes('gallery') || 
  f.includes('mountain') || 
  f.includes('peak') || 
  f.includes('trek') ||
  f.includes('hero')
);

console.log('Sample high-res general mountain images:');
console.log(general.slice(0, 30));
