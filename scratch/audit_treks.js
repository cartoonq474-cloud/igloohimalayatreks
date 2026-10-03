const fs = require('fs');

const urls = JSON.parse(fs.readFileSync('scratch/live_scraped_urls.json', 'utf8'));
const serverJs = fs.readFileSync('server.js', 'utf8');
const redirectBlock = serverJs.match(/const URL_REDIRECTS = {([\s\S]*?)};/);
const serverRedirects = {};
if (redirectBlock) {
  redirectBlock[1].split('\n').forEach(line => {
    const m = line.match(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/);
    if (m) serverRedirects[m[1]] = m[2];
  });
}

const trekDirs = fs.readdirSync('trek');
const results = [];
trekDirs.forEach(td => {
  if (td === 'images') return;
  const stat = fs.statSync('trek/' + td);
  if (!stat.isDirectory()) return;
  const indexPath = 'trek/' + td + '/index.html';
  if (!fs.existsSync(indexPath)) return;
  const content = fs.readFileSync(indexPath, 'utf8');
  const isStub = content.includes('http-equiv="refresh"');
  if (isStub) return;

  const urlPath = '/trek/' + td + '/';
  let oldUrl = null;

  if (urls.some(u => u.includes('/trip/' + td))) {
    oldUrl = 'https://igloohimalayatreks.com/trip/' + td + '/';
  } else if (urls.some(u => u.includes('/trek/' + td))) {
    oldUrl = 'https://igloohimalayatreks.com/trek/' + td + '/';
  } else {
    for (const [k, v] of Object.entries(serverRedirects)) {
      if (v === urlPath || v === urlPath.replace(/\/$/, '')) {
        oldUrl = 'https://igloohimalayatreks.com' + k;
        break;
      }
    }
  }

  results.push({
    dir: td,
    url: urlPath,
    isNew: !oldUrl,
    oldUrl: oldUrl || 'None'
  });
});

console.log('Total Canonical Active Treks: ' + results.length);
console.log('Migrated Treks: ' + results.filter(r => !r.isNew).length);
console.log('Brand New Treks: ' + results.filter(r => r.isNew).length);
console.log('\n--- BRAND NEW TREKS ---');
results.filter(r => r.isNew).forEach((r, i) => console.log(`${i+1}. ${r.dir}`));
