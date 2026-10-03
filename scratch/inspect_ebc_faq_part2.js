const fs = require('fs');
const html = fs.readFileSync('c:/Users/ASUS/Desktop/igloohimalayatreks/trek/everest-base-camp-trek/index.html', 'utf8');
const m = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
if (m) {
  const lines = m[0].split('\n').slice(40, 100);
  console.log(lines.join('\n'));
}
