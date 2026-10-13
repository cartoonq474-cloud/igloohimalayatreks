const fs = require('fs');
const path = require('path');

const trekDir = path.resolve('trek/annapurna-base-camp-heli-return');
const html = fs.readFileSync(path.join(trekDir, 'index.html'), 'utf8');

const imgs = html.match(/src="[^"]+"/g) || [];
console.log('Resolving relative to trek/annapurna-base-camp-heli-return/ (' + imgs.length + ' references):');
let missing = 0;
imgs.forEach(i => {
  const p = i.replace('src="', '').replace('"', '').split('?')[0];
  const abs = path.resolve(trekDir, p);
  const exists = fs.existsSync(abs);
  if (!exists) {
    console.log('MISSING:', p, '->', abs);
    missing++;
  }
});
console.log('Total checked:', imgs.length, 'Missing:', missing);
