const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../trek/annapurna-circuit-trek/index.html'), 'utf8');
const detailsMatch = html.match(/<section[^>]*id=["']section-details["'][\s\S]*?<\/section>/i);
if (detailsMatch) {
  const sec = detailsMatch[0];
  const items = [...sec.matchAll(/<button[^>]*class=["']([^"']+)["'][^>]*>([\s\S]*?)<\/button>/gi)];
  console.log('Buttons inside section-details (' + items.length + '):');
  items.forEach(it => console.log('  ' + it[1] + ' => ' + it[2].replace(/<[^>]+>/g, '').trim()));
  
  const headers = [...sec.matchAll(/<div[^>]*class=["']([^"']*(?:header|accordion)[^"']*)["'][^>]*>([\s\S]*?)<\/div>/gi)];
  console.log('Headers count:', headers.length);
  headers.slice(0, 15).forEach(h => console.log('  ' + h[1] + ' => ' + h[2].replace(/<[^>]+>/g, '').trim().slice(0, 60)));
}
