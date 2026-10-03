const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
if (m) {
  m.forEach((s, idx) => {
    console.log(`Script ${idx + 1}:`);
    const clean = s.replace(/<\/?script[^>]*>/gi, '').trim();
    try {
      const obj = JSON.parse(clean);
      console.log(`  Type: ${obj['@type'] || (obj['@graph'] ? obj['@graph'].map(g => g['@type']).join(', ') : 'unknown')}`);
      if (obj['@type'] === 'FAQPage') {
        console.log(`  FAQ count: ${obj.mainEntity.length}`);
        obj.mainEntity.slice(0, 3).forEach(q => console.log(`   - ${q.name}`));
      }
    } catch (e) {
      console.log('  JSON parse error:', e.message);
    }
  });
}
