const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const trekFolders = fs.readdirSync(trekDir).filter(f => {
  return fs.statSync(path.join(trekDir, f)).isDirectory() && fs.existsSync(path.join(trekDir, f, 'index.html'));
});

const catSets = {};

trekFolders.forEach(folder => {
  const filePath = path.join(trekDir, folder, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return;

  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) return;

  const buttons = [...faqMatch[0].matchAll(/data-category=["']([^"']+)["']/gi)].map(m => m[1]);
  const key = buttons.join(',');
  catSets[key] = (catSets[key] || 0) + 1;
});

console.log('Category sets across trek pages:');
console.log(catSets);
