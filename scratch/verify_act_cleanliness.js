const fs = require('fs');

const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

console.log('Total file length:', html.length);

const ebcRegex = /(lukla|namche\s+bazaar|kala\s+patthar|everest\s+base\s+camp|solukhumbu|sagarmatha)/gi;
const matches = [...html.matchAll(ebcRegex)];

console.log('Total EBC keyword matches found:', matches.length);
matches.forEach((m, idx) => {
  const start = Math.max(0, m.index - 50);
  const end = Math.min(html.length, m.index + 50);
  console.log(`${idx + 1}. [${m[0]}] context: "${html.substring(start, end).replace(/\n/g, ' ')}"`);
});

const sections = [...html.matchAll(/<section\s+id="([^"]+)"[^>]*>/g)].map(m => m[1]);
console.log('All sections in act_temp.html:', sections);
