const fs = require('fs');
const path = require('path');

const tourDir = path.join(__dirname, '../tour');
const folders = fs.readdirSync(tourDir).filter(f => {
  const p = path.join(tourDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

for (const f of folders) {
  const filePath = path.join(tourDir, f, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) continue;

  const section = (html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i) || [])[0];
  if (!section) {
    console.log(`[NO FAQS] ${f}`);
    continue;
  }

  const h2 = ((section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  const itemRegex = /<div class="faq-item">[\s\S]*?<div class="faq-item-question">\s*<span>([\s\S]*?)<\/span>[\s\S]*?<div class="faq-item-answer">([\s\S]*?)<\/div>\s*<\/div>/gi;
  const items = [];
  let m;
  while ((m = itemRegex.exec(section)) !== null) {
    items.push({
      q: m[1].replace(/<[^>]+>/g, '').trim(),
      a: m[2].replace(/<[^>]+>/g, '').trim()
    });
  }

  console.log(`\n=== TOUR: ${f} (${items.length} FAQs) ===`);
  console.log(`  H2: ${h2}`);
  items.forEach((it, i) => {
    console.log(`   #${i+1}: ${it.q}`);
  });
}
