const fs = require('fs');
const html = fs.readFileSync('blog/everest-base-camp-vs-annapurna-circuit/index.html', 'utf8');
const imgRegex = /<img\s+[^>]*src="([^"]*)"[^>]*>/gi;
let m;
while ((m = imgRegex.exec(html)) !== null) {
  const tag = m[0];
  if (!tag.includes('width=') || !tag.includes('height=')) {
    console.log('Missing width/height in:', tag);
  }
}
