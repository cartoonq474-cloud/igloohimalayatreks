const fs = require('fs');

function inspectSchemaFaqPage(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const ms = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const m of ms) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const graph = parsed['@graph'] || [parsed];
      for (const item of graph) {
        if (item['@type'] === 'FAQPage') {
          console.log(`\n=== ${filePath} FAQPage schema ===`);
          console.log(`Questions count: ${item.mainEntity ? item.mainEntity.length : 0}`);
          if (item.mainEntity && item.mainEntity.length > 0) {
            item.mainEntity.slice(0, 3).forEach((q, i) => console.log(`  ${i+1}. ${q.name}`));
          }
        }
      }
    } catch(e) {}
  }
}

inspectSchemaFaqPage('trek/kanchenjunga-circuit-trek/index.html');
inspectSchemaFaqPage('trek/island-peak-climbing/index.html');
inspectSchemaFaqPage('trek/manaslu-circuit-trek/index.html');
inspectSchemaFaqPage('tour/chitwan-national-park-safari/index.html');
