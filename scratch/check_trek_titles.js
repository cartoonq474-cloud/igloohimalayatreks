const fs = require('fs');

const pages = [
  { name: 'manaslu_tsum', html: 'trek/manaslu-tsum-valley-trek/index.html' },
  { name: 'tiji', html: 'tour/upper-mustang-tiji-festival/index.html' },
  { name: 'jeep', html: 'tour/upper-mustang-jeep-tour/index.html' },
  { name: 'mustang_trek', html: 'trek/upper-mustang-trek/index.html' },
  { name: 'tsum', html: 'trek/tsum-valley-trek/index.html' },
  { name: 'manaslu12', html: 'trek/manaslu-circuit-trek-12-days/index.html' },
  { name: 'manaslu', html: 'trek/manaslu-circuit-trek/index.html' }
];

pages.forEach(p => {
  const html = fs.readFileSync(p.html, 'utf8');
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const titleAttr = html.match(/data-trek-title="([^"]+)"/i);
  console.log(`${p.name}:`);
  console.log(`  H1: ${h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE'}`);
  console.log(`  data-trek-title: ${titleAttr ? titleAttr[1] : 'NONE'}`);
});
