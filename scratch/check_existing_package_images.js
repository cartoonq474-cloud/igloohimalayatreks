const fs = require('fs');
const path = require('path');

const slugs = [
  'makalu-base-camp-trek',
  'dhaulagiri-circuit-trek',
  'rolwaling-valley-trek',
  'ruby-valley-trek',
  'rara-lake-trek',
  'kanchenjunga-base-camp-trek'
];

slugs.forEach(s => {
  const p = path.join(__dirname, '../trek', s, 'index.html');
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    const imgs = [...html.matchAll(/src=["'](?:\.\.\/\.\.\/)?images\/([^"']+)["']/gi)].map(m => m[1]);
    const ogImg = html.match(/og:image["']\s+content=["'][^"']*images\/([^"']+)["']/i);
    console.log(`\n=== ${s} ===`);
    console.log('OG Image:', ogImg ? ogImg[1] : 'none');
    console.log('Unique images in page:', [...new Set(imgs)].slice(0, 10));
  }
});
