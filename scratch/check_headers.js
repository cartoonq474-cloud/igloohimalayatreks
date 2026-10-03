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
let hasHeader = 0;
let noHeader = [];

allHtml.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('class="main-header"') && content.includes('</header>')) {
    hasHeader++;
  } else {
    noHeader.push(f);
  }
});

console.log('Total files checked:', allHtml.length);
console.log('Has header:', hasHeader);
console.log('No header:', noHeader.length);
if (noHeader.length > 0) {
  console.log('Files without header:', noHeader);
}
