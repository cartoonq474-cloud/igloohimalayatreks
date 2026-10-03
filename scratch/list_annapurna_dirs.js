const fs = require('fs');
const path = require('path');
const dirs = fs.readdirSync(path.join(__dirname, '../trek')).filter(f => f.startsWith('annapurna') || f.includes('abc'));
console.log('Annapurna folders:', dirs);
