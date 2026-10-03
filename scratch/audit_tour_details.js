const fs = require('fs');
const path = require('path');

const tourDir = path.join(__dirname, '../tour');
const folders = fs.readdirSync(tourDir).filter(f => {
  const p = path.join(tourDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

console.log('=== DETAILED AUDIT OF ALL TOUR FAQS ===');

for (const f of folders) {
  const filePath = path.join(tourDir, f, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) continue;

  const section = (html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i) || [])[0];
  if (!section) {
    console.log(`[NO FAQ SECTION] ${f}`);
    continue;
  }

  const h2 = ((section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  const qMatches = [...section.matchAll(/<div class="faq-item-question">\s*<span>([\s\S]*?)<\/span>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // Check Schema
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  let schemaFaqCount = 0;
  for (const s of schemas) {
    try {
      const parsed = JSON.parse(s[1].trim());
      const g = parsed['@graph'] || [parsed];
      for (const item of g) {
        if (item['@type'] === 'FAQPage') {
          schemaFaqCount = item.mainEntity?.length || 0;
        }
      }
    } catch(e) {}
  }

  console.log(`\nTour: ${f}`);
  console.log(`  H2: ${h2}`);
  console.log(`  HTML FAQs: ${qMatches.length} | Schema FAQs: ${schemaFaqCount}`);
}
