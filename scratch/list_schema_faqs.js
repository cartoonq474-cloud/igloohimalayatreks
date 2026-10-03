const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
if (m) {
  const obj = JSON.parse(m[1]);
  const faq = obj['@graph'].find(x => x['@type'] === 'FAQPage');
  if (faq) {
    console.log('FAQ count in schema:', faq.mainEntity.length);
    faq.mainEntity.forEach((q, i) => console.log(`${i+1}. ${q.name}`));
  }
}
