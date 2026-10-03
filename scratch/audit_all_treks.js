const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const treks = fs.readdirSync(trekDir).filter(f => fs.existsSync(path.join(trekDir, f, 'index.html')));

console.log('Total trek pages:', treks.length);

const results = [];

treks.forEach(slug => {
  const file = path.join(trekDir, slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  
  const itin = html.match(/<section id=["']section-itinerary["'][\s\S]*?<\/section>/i);
  let ebcItin = false;
  if (itin) {
    ebcItin = /namche|lukla|kala patthar|everest base camp/i.test(itin[0]);
  }
  
  const isEverestTrek = slug.includes('everest') || slug.includes('gokyo') || slug.includes('three-passes') || slug.includes('island-peak') || slug.includes('lobuche') || slug.includes('mera-peak');
  
  results.push({ slug, isEverestTrek, ebcItin, size: html.length });
});

const copiedNonEverest = results.filter(r => !r.isEverestTrek && r.ebcItin);
console.log(`\n--- Non-Everest treks with copied EBC itinerary (${copiedNonEverest.length}) ---`);
copiedNonEverest.forEach(r => console.log(' - ' + r.slug));

const authenticNonEverest = results.filter(r => !r.isEverestTrek && !r.ebcItin);
console.log(`\n--- Non-Everest treks with authentic itinerary (${authenticNonEverest.length}) ---`);
authenticNonEverest.forEach(r => console.log(' + ' + r.slug));

const everestTreks = results.filter(r => r.isEverestTrek);
console.log(`\n--- Everest treks (${everestTreks.length}) ---`);
everestTreks.forEach(r => console.log(' * ' + r.slug));
