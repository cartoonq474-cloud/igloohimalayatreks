const fs = require('fs');
const files = [
  'blog/teahouse-food-lodging-nepal-trails/index.html',
  'blog/how-to-prevent-altitude-sickness/index.html',
  'blog/ultimate-everest-packing-checklist-2026/index.html',
  'blog/everest-base-camp-vs-annapurna-circuit/index.html'
];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const content = fs.readFileSync(f, 'utf8');
  const sections = content.match(/<section id="[^"]+"[^>]*>[\s\S]*?<\/section>/g) || [];
  console.log('=== FILE:', f, 'Total sections:', sections.length);
  sections.forEach((s, idx) => {
    const h2 = (s.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || 'no h2';
    const cleanH2 = h2.replace(/<[^>]+>/g, '').trim();
    const afterH2 = s.replace(/^[\s\S]*?<\/h2>\s*/, '').trim();
    const firstTag = afterH2.substring(0, 40).replace(/\n/g, ' ');
    const isFigure = afterH2.startsWith('<figure');
    console.log(`  Sec ${idx+1}: [${isFigure ? 'FIG FIRST' : 'TEXT FIRST'}] ${cleanH2.substring(0, 40)} -> ${firstTag}`);
  });
}
