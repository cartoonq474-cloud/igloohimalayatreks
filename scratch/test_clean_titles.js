const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const dirs = fs.readdirSync(trekDir).filter(f => {
  const p = path.join(trekDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

function getCleanTitle(html, slug) {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const rawH1 = h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (rawH1.length > 5 && !rawH1.toLowerCase().includes('redirect')) return rawH1;
  }
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    let t = titleMatch[1].replace(/—.*$/, '').replace(/\|.*$/, '').trim();
    t = t.replace(/\s*\([^)]*$/, '').trim();
    return t;
  }
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

dirs.forEach(f => {
  const html = fs.readFileSync(path.join(trekDir, f, 'index.html'), 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) return;
  const t = getCleanTitle(html, f);
  console.log(`${f.padEnd(46)} -> "${t}"`);
});
