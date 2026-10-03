const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const folders = fs.readdirSync(trekDir).filter(f => {
  return fs.statSync(path.join(trekDir, f)).isDirectory() && fs.existsSync(path.join(trekDir, f, 'index.html'));
});

folders.forEach(f => {
  const html = fs.readFileSync(path.join(trekDir, f, 'index.html'), 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return;

  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) return;

  const h2Match = faqMatch[0].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const h2 = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : '';

  // Check if H2 title doesn't contain a key word from the folder
  const keywords = f.split('-').filter(k => k.length > 3 && k !== 'trek' && k !== 'with' && k !== 'nepal');
  const matched = keywords.some(k => h2.toLowerCase().includes(k));
  if (!matched) {
    console.log(`Potential mismatch: folder="${f}" | h2="${h2}"`);
  }
});
