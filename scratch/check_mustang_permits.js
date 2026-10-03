const fs = require('fs');
const html = fs.readFileSync('trek/upper-mustang-trek/index.html', 'utf8');
const m = html.match(/id=["']faq-cat-permits["'][\s\S]*?<\/div>\s*<\/div>/i);
if (m) console.log(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300));
