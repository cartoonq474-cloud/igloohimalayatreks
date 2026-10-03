const fs = require('fs');
const path = require('path');

function checkSchemaFaqs(dir, type) {
  const folders = fs.readdirSync(dir).filter(f => {
    const p = path.join(dir, f);
    return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
  });

  const res = [];
  for (const f of folders) {
    const filePath = path.join(dir, f, 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');
    if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) continue;

    // HTML FAQ count
    const htmlFaqCount = (html.match(/<div class="faq-item-question">/gi) || []).length;

    // Schema FAQ count
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    let schemaFaqCount = 0;
    let schemaFirstQ = '';
    for (const s of schemas) {
      if (s[1].includes('FAQPage')) {
        try {
          const parsed = JSON.parse(s[1].trim());
          if (parsed['@type'] === 'FAQPage' && parsed.mainEntity) {
            schemaFaqCount = parsed.mainEntity.length;
            schemaFirstQ = parsed.mainEntity[0]?.name || '';
          }
        } catch(e) {}
      }
    }

    res.push({
      slug: f,
      type,
      htmlFaqCount,
      schemaFaqCount,
      schemaFirstQ: schemaFirstQ.slice(0, 50)
    });
  }
  return res;
}

const tourSchemas = checkSchemaFaqs('tour', 'tour');
const trekSchemas = checkSchemaFaqs('trek', 'trek');

console.log('=== TOUR SCHEMAS ===');
tourSchemas.forEach(t => console.log(`${t.slug.padEnd(40)} | HTML: ${t.htmlFaqCount} | Schema: ${t.schemaFaqCount} | Q1: ${t.schemaFirstQ}`));

console.log('\n=== TREK SCHEMAS (Sample 15) ===');
trekSchemas.slice(0, 15).forEach(t => console.log(`${t.slug.padEnd(40)} | HTML: ${t.htmlFaqCount} | Schema: ${t.schemaFaqCount} | Q1: ${t.schemaFirstQ}`));
