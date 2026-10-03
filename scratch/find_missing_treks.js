const fs = require('fs');
const content = fs.readFileSync('nepal-trekking-packages/index.html', 'utf8');
const trekDirs = fs.readdirSync('trek').filter(d => fs.statSync('trek/' + d).isDirectory() && d !== 'images');

const usedHrefs = [];
const matches = content.matchAll(/href="(?:\.\.\/)?trek\/([^/"]+)\/?"/g);
for (const m of matches) {
  usedHrefs.push(m[1]);
}
const uniqueUsedHrefs = [...new Set(usedHrefs)];

console.log('Total unique /trek/ links in page:', uniqueUsedHrefs.length);
console.log('Treks in /trek/ NOT linked in cards:');
const missing = trekDirs.filter(d => !uniqueUsedHrefs.includes(d));
console.log(missing.join('\n'));
