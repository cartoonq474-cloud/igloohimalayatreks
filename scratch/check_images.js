const fs = require('fs');
const path = require('path');

const images = fs.readdirSync(path.join(__dirname, '../images'));
console.log('Matching images:', images.filter(img => img.includes('poon') || img.includes('mardi') || img.includes('annapurna')));
