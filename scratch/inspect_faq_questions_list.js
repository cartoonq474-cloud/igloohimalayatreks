const fs = require('fs');

function checkFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const section = (html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i) || [])[0];
  if (!section) return;

  const h2 = (section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '';
  console.log(`\n======================================================`);
  console.log(`FILE: ${filePath}`);
  console.log(`H2: ${h2.replace(/<[^>]+>/g, '').trim()}`);

  const itemRegex = /<div class="faq-item">[\s\S]*?<div class="faq-item-question">\s*<span>([\s\S]*?)<\/span>[\s\S]*?<div class="faq-item-answer">([\s\S]*?)<\/div>\s*<\/div>/gi;
  let m;
  let idx = 1;
  while ((m = itemRegex.exec(section)) !== null) {
    const q = m[1].replace(/<[^>]+>/g, '').trim();
    const a = m[2].replace(/<[^>]+>/g, '').trim();
    const isEbc = /\b(everest|ebc|lukla|kala patthar|namche)\b/i.test(q + ' ' + a);
    if (isEbc) {
      console.log(`  [EBC DETECTED] #${idx}: Q: "${q}"`);
      console.log(`      A: "${a.slice(0, 150)}..."`);
    }
    idx++;
  }
  console.log(`Total FAQs: ${idx - 1}`);
}

checkFile('trek/kanchenjunga-circuit-trek/index.html');
checkFile('trek/kanchenjunga-base-camp-trek/index.html');
checkFile('trek/island-peak-climbing/index.html');
checkFile('trek/annapurna-circuit-trek/index.html');
checkFile('trek/manaslu-circuit-trek/index.html');
checkFile('tour/kathmandu-pokhara-chitwan-tour/index.html');
