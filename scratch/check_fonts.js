const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === '.gemini') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const allHtml = walk('.');
let hasFont = 0;
let missingFont = [];

allHtml.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Check if it's a redirect stub
  if (!content.includes('<header class="main-header"')) return;

  if (content.includes('fonts.googleapis.com') || content.includes('fonts.gstatic.com')) {
    hasFont++;
  } else {
    missingFont.push(f);
  }
});

console.log('Total content pages:', hasFont + missingFont.length);
console.log('Pages WITH Google Font link:', hasFont);
console.log('Pages MISSING Google Font link:', missingFont.length);
console.log('Sample missing:', missingFont.slice(0, 10));
