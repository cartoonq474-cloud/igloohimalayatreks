const fs = require('fs');
const html = fs.readFileSync('trek/everest-base-camp-luxury-trek/index.html', 'utf8');
const subnavMatch = html.match(/<div class="trek-sub-nav-wrapper">([\s\S]*?)<\/div>\s*<\/div>/i);
if (subnavMatch) {
  console.log('Subnav in EBC luxury trek:');
  const links = [...subnavMatch[0].matchAll(/<a[^>]*href=["'](#[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  console.log(links.map(l => `${l[1]} -> ${l[2].replace(/<[^>]+>/g, '').trim()}`));
}
