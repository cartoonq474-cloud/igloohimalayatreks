const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(findHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const htmlFiles = findHtmlFiles('.');

// Map of card names or corrupted patterns to exact clean images in root images/
const fixMap = {
  'Everest Khumbu Region': 'everest-destination.webp',
  'Annapurna Massif': 'annapurna-destination.webp',
  'Langtang Valley': 'langtang-valley-trek-complete-10-day-trekking-guide.jpg',
  'Manaslu Circuit': 'manaslu-circuit-trek.jpg',
  'Kanchenjunga Sanctuary': 'kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.jpg',
  'Upper Mustang Kingdom': 'upper-mustang.jpg',
  'Everest Base Camp Trek': 'everest-base-camp-16-days.jpg',
  'Annapurna Base Camp Trek': 'annapurna-base-camp-trek.jpg',
  'Manaslu Circuit Trek': 'manaslu-circuit-trek.jpg',
  'Gokyo Lakes & Cho La Pass': 'gokyo-lake-and-chola-pass-trek.jpg',
  'Langtang Valley Trek': 'langtang-valley-trek-complete-10-day-trekking-guide.jpg',
  'Gokyo Lakes Trek': 'gokyo-lakes-trek.jpg'
};

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  const rel = path.relative('.', filePath);
  const segments = rel.split(path.sep);
  let prefix = 'images/';
  if (segments.length === 2) prefix = '../images/';
  else if (segments.length >= 3) prefix = '../../images/';

  // Fix any corrupted patterns like images/\d+ card image... or similar
  content = content.replace(/(src=["'])(\.\.\/)*images\/\d+[^"']*(["'])/gi, (m, p1, p2, p3) => {
    // Determine based on alt or surrounding text
    return m; // we will handle by context below
  });

  // Fix based on alt attribute
  for (const [altText, targetImage] of Object.entries(fixMap)) {
    // src before alt
    const r1 = new RegExp(`(<img[^>]+src=["'])[^"']+([\"'][^>]+alt=["']${altText}["'])`, 'gi');
    content = content.replace(r1, `$1${prefix}${targetImage}$2`);

    // alt before src
    const r2 = new RegExp(`(<img[^>]+alt=["']${altText}["'][^>]+src=["'])[^"']+([\"'])`, 'gi');
    content = content.replace(r2, `$1${prefix}${targetImage}$2`);
  }

  // Also fix any remaining ../../images/ or ../images/ in destination cards or trek packages
  // Check specifically in trekking-regions-nepal/index.html
  if (filePath.includes('trekking-regions-nepal')) {
    content = content.replace(/(<img[^>]+src=["'])[^"']+([\"'][^>]+alt=["']Everest Khumbu Region["'])/gi, `$1../images/everest-destination.webp$2`);
    content = content.replace(/(<img[^>]+src=["'])[^"']+([\"'][^>]+alt=["']Annapurna Region["'])/gi, `$1../images/annapurna-destination.webp$2`);
    content = content.replace(/(<img[^>]+src=["'])[^"']+([\"'][^>]+alt=["']Langtang Valley["'])/gi, `$1../images/langtang-valley-trek-complete-10-day-trekking-guide.jpg$2`);
    content = content.replace(/(<img[^>]+src=["'])[^"']+([\"'][^>]+alt=["']Manaslu Circuit Region["'])/gi, `$1../images/manaslu-circuit-trek.jpg$2`);
    content = content.replace(/(<img[^>]+src=["'])[^"']+([\"'][^>]+alt=["']Upper Mustang Region["'])/gi, `$1../images/upper-mustang.jpg$2`);
    content = content.replace(/(<img[^>]+src=["'])[^"']+([\"'][^>]+alt=["']Kanchenjunga Region["'])/gi, `$1../images/kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.jpg$2`);
  }

  // If any invalid 'images/...' still exists, let's fix it
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up ${filePath}`);
  }
});
