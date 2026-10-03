const fs = require('fs');
const html = fs.readFileSync('trek/everest-base-camp-trek/index.html', 'utf8');
const ms = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
console.log('Total JSON-LD schemas in EBC:', ms.length);
ms.forEach((m, i) => {
  try {
    const parsed = JSON.parse(m[1].trim());
    console.log(`Schema #${i + 1}: @type = ${parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown')}`);
    if (parsed['@graph']) {
      parsed['@graph'].forEach((g, gi) => console.log(`   Graph item ${gi+1}: ${g['@type']}`));
    }
  } catch(e) {
    console.log(`Schema #${i + 1}: Parse error: ${e.message}`);
  }
});
