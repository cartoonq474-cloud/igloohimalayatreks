const fs = require('fs');
const cards = JSON.parse(fs.readFileSync('scratch/all60_cards.json', 'utf8'));

// Group by region
const groups = {};
cards.forEach(c => {
  const reg = c.region || 'Other';
  if (!groups[reg]) groups[reg] = [];
  groups[reg].push(c);
});

console.log('Total packages in all60_cards.json:', cards.length);
Object.keys(groups).forEach(reg => {
  console.log(`\n=== REGION: ${reg} (${groups[reg].length} packages) ===`);
  groups[reg].forEach(p => console.log(`- [${p.slug}] ${p.title} (${p.duration}, ${p.maxAlt})`));
});
