const fs = require('fs');

['trek/upper-mustang-trek/index.html', 'trek/lower-dolpo-trek/index.html'].forEach(p => {
  const html = fs.readFileSync(p, 'utf8');
  const details = html.match(/<section id=["']section-details["'][\s\S]*?<\/section>/i)[0];
  console.log(`${p}: Lukla mentions in details: ${(details.match(/Lukla/gi) || []).length}, EBC mentions: ${(details.match(/Everest/gi) || []).length}`);
});
