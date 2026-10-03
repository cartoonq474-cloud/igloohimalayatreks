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

  // Get H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let pageTitle = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
  pageTitle = pageTitle.replace(/\s*\(\d+\s*Days?.*?\)/i, '').replace(/\s*\(\d+m\)/i, '').trim();

  console.log(`${f} =>\n   H1: "${pageTitle}"\n   H2: "${h2}"`);
});
