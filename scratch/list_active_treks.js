const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const dirs = fs.readdirSync(trekDir);

const activeTreks = [];
const redirectTreks = [];

dirs.forEach(d => {
  const index = path.join(trekDir, d, 'index.html');
  if (fs.existsSync(index)) {
    const html = fs.readFileSync(index, 'utf8');
    if (html.includes('<meta http-equiv="refresh"') || html.includes('Redirecting to')) {
      redirectTreks.push(d);
    } else {
      const title = html.match(/<title>([\s\S]*?)<\/title>/i);
      activeTreks.push({
        slug: d,
        title: title ? title[1] : 'No Title',
        size: html.length
      });
    }
  }
});

console.log(`Active Trek Pages: ${activeTreks.length}`);
console.log(`Redirect Stubs: ${redirectTreks.length}`);

console.log('\n--- Active Trek Pages ---');
activeTreks.forEach((t, i) => console.log(`${i+1}. [${t.slug}] ${t.title}`));
