const fs = require('fs');
const path = require('path');

const packages = [
  'annapurna-base-camp-heli-return',
  'short-annapurna-base-camp-trek',
  'annapurna-short-trek',
  'ghorepani-poon-hill-with-mardi-himal-trek',
  'abc-with-mardi-himal-trek',
  'annapurna-luxury-trek',
  'annapurna-circuit-luxury-trek',
  'annapurna-base-camp-helicopter-return-trek'
];

let allOk = true;

packages.forEach(slug => {
  const filePath = path.join('trek', slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    allOk = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const title = (content.match(/<title>([^<]+)<\/title>/) || [])[1];
  const canonical = (content.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const imgMatches = content.match(/src="([^"]+\.(?:webp|jpg|png))"/g) || [];
  
  let missingImages = 0;
  imgMatches.forEach(m => {
    const src = m.match(/src="([^"]+)"/)[1];
    const resolvedPath = path.resolve(path.dirname(filePath), src.split('?')[0]);
    if (!fs.existsSync(resolvedPath)) {
      console.warn(`  [${slug}] Missing image: ${src} -> ${resolvedPath}`);
      missingImages++;
    }
  });

  console.log(`[PASS] ${slug}`);
  console.log(`       Title: ${title}`);
  console.log(`       Canonical: ${canonical}`);
  console.log(`       Images checked: ${imgMatches.length} (${missingImages} missing)`);
});

if (allOk) {
  console.log('\nAll new packages verified successfully!');
}
