const fs = require('fs');
const path = require('path');

const tourDir = path.join(__dirname, '../tour');
const tourFiles = fs.readdirSync(tourDir).filter(f => {
  return fs.statSync(path.join(tourDir, f)).isDirectory() && fs.existsSync(path.join(tourDir, f, 'index.html'));
});

tourFiles.forEach(tour => {
  const html = fs.readFileSync(path.join(tourDir, tour, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log(`${tour}: scripts => ${scripts.join(', ')}`);
});
