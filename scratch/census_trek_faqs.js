const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const folders = fs.readdirSync(trekDir).filter(f => {
  const p = path.join(trekDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

const census = [];

for (const f of folders) {
  const filePath = path.join(trekDir, f, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) continue;

  const section = (html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i) || [])[0];
  if (!section) {
    census.push({ slug: f, status: 'NO_FAQ_SECTION' });
    continue;
  }

  const h2 = ((section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  
  // Count questions
  const qMatches = [...section.matchAll(/<div class="faq-item-question">\s*<span>([\s\S]*?)<\/span>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // Check specific issues
  const hasWrongH2 = h2.includes('Annapurna Base Camp') && !f.includes('annapurna-base-camp');
  const hasLuklaQ = qMatches.some(q => /flights to lukla/i.test(q) || /lukla flights/i.test(q));
  const hasBesidesEverestQ = qMatches.some(q => /besides everest/i.test(q));
  const hasLuklaInAnswer = /lukla/i.test(section);
  const hasNamcheInAnswer = /namche/i.test(section);
  const hasKalaPattharInAnswer = /kala patthar/i.test(section);

  const isEverestTrek = /everest|gokyo|island-peak|lobuche|mera-peak|three-high-passes/.test(f);

  census.push({
    slug: f,
    h2,
    qCount: qMatches.length,
    hasWrongH2,
    hasLuklaQ,
    hasBesidesEverestQ,
    hasLuklaInAnswer: !isEverestTrek && hasLuklaInAnswer,
    hasNamcheInAnswer: !isEverestTrek && hasNamcheInAnswer,
    hasKalaPattharInAnswer: !isEverestTrek && hasKalaPattharInAnswer,
    isEverestTrek
  });
}

console.log('=== CENSUS OF ALL 60 ACTIVE TREK FAQS ===');
const problemTreks = census.filter(c => c.hasWrongH2 || c.hasLuklaQ && !c.isEverestTrek || c.hasBesidesEverestQ && !c.isEverestTrek || c.hasLuklaInAnswer || c.hasNamcheInAnswer || c.hasKalaPattharInAnswer);

console.log(`Total Active Treks: ${census.length}`);
console.log(`Treks with FAQ mismatches: ${problemTreks.length}\n`);

problemTreks.forEach(t => {
  const flags = [];
  if (t.hasWrongH2) flags.push(`WRONG_H2("${t.h2}")`);
  if (t.hasLuklaQ && !t.isEverestTrek) flags.push('LUKLA_Q');
  if (t.hasBesidesEverestQ && !t.isEverestTrek) flags.push('BESIDES_EVEREST_Q');
  if (t.hasLuklaInAnswer) flags.push('LUKLA_IN_ANS');
  if (t.hasNamcheInAnswer) flags.push('NAMCHE_IN_ANS');
  if (t.hasKalaPattharInAnswer) flags.push('KALA_PATTHAR_IN_ANS');
  console.log(`${t.slug.padEnd(46)} | FAQs: ${t.qCount} | Flags: ${flags.join(', ')}`);
});
