const fs = require('fs');

const html = fs.readFileSync('trek/gokyo-lakes-trek/index.html', 'utf8');
const tags = ['div', 'section', 'article', 'main', 'form', 'table', 'ul', 'ol', 'p', 'h1', 'h2', 'h3', 'h4', 'button'];

let hasError = false;
tags.forEach(t => {
  const openRegex = new RegExp('<' + t + '(\\s+[^>]*)?>', 'gi');
  const closeRegex = new RegExp('</' + t + '>', 'gi');
  const open = (html.match(openRegex) || []).length;
  const close = (html.match(closeRegex) || []).length;
  const diff = open - close;
  console.log(`${t.padEnd(10)}: open = ${String(open).padStart(3)}, close = ${String(close).padStart(3)}, diff = ${diff}`);
  if (diff !== 0) hasError = true;
});

if (hasError) {
  console.error("❌ Tag divergence detected!");
  process.exit(1);
} else {
  console.log("✅ All tags balanced with exactly 0 divergence!");
}
