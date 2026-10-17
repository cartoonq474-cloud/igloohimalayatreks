const fs = require('fs');
const html = fs.readFileSync('trek/ghorepani-poon-hill-with-mardi-himal-trek/index.html', 'utf8');

const regex = /<\/?section\b[^>]*>/g;
let match;
let stack = [];
let errors = [];

while ((match = regex.exec(html)) !== null) {
  const tag = match[0];
  const index = match.index;
  const line = html.substring(0, index).split('\n').length;
  if (tag.startsWith('</')) {
    if (stack.length === 0) {
      errors.push({ type: 'unexpected_close', line, tag });
    } else {
      const last = stack.pop();
    }
  } else {
    const id = (tag.match(/id="([^"]+)"/) || [])[1] || 'no-id';
    stack.push({ line, id, tag: tag.substring(0, 50) });
  }
}

console.log('Unclosed sections count:', stack.length);
stack.forEach(s => console.log('Unclosed:', s));
console.log('Unexpected close count:', errors.length);
errors.forEach(e => console.log('Unexpected close:', e));
