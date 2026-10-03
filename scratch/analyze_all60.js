const fs = require('fs');
const cards = JSON.parse(fs.readFileSync('scratch/all60_cards.json', 'utf8'));

console.log('Total cards in all60_cards.json:', cards.length);

const byRegion = {};
cards.forEach(c => {
  const reg = c.region || 'other';
  if (!byRegion[reg]) byRegion[reg] = [];
  byRegion[reg].push(c);
});

Object.keys(byRegion).forEach(reg => {
  console.log(`\nRegion [${reg}]: ${byRegion[reg].length} packages`);
  byRegion[reg].forEach(c => {
    const slug = c.link.replace('../trek/', '').replace('/', '');
    console.log(`  - ${slug} (${c.days}, ${c.altitude}, ${c.difficultyText}, ${c.price})`);
  });
});
