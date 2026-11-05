const fs = require('fs');
const path = require('path');

const list = fs.readdirSync('trek');
const activeTreks = [];
list.forEach(f => {
  const idx = path.join('trek', f, 'index.html');
  if (fs.existsSync(idx)) {
    const content = fs.readFileSync(idx, 'utf8');
    if (!content.includes('Redirecting') && content.includes('id="section-reviews"')) {
      activeTreks.push(f);
    }
  }
});

console.log('Active treks count:', activeTreks.length);
console.log(activeTreks);
