const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const startMarker = '<!-- Section: Interactive Platform & Client Reviews Switcher -->';
const endMarker = '<!-- Section 4.5: Resources Related to Himalayan Trekking (Webinars, Blogs, Checklists, E-Books) -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

const updated = before + after;
fs.writeFileSync(indexPath, updated, 'utf8');

console.log('Successfully removed duplicate reviews section!');
console.log('Old size:', (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1), 'KB');
console.log('New size:', (Buffer.byteLength(updated, 'utf8') / 1024).toFixed(1), 'KB');
console.log('Lines before:', content.split('\n').length);
console.log('Lines after:', updated.split('\n').length);
