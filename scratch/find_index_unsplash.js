const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all unsplash images in index.html with line numbers and surrounding context
const lines = html.split('\n');
const unsplashItems = [];

lines.forEach((line, idx) => {
  if (line.includes('images.unsplash.com')) {
    // get surrounding lines
    const start = Math.max(0, idx - 4);
    const end = Math.min(lines.length - 1, idx + 4);
    const context = lines.slice(start, end + 1).join('\n');
    unsplashItems.push({
      lineNum: idx + 1,
      line: line.trim(),
      context
    });
  }
});

console.log(`Found ${unsplashItems.length} Unsplash references in index.html:`);
unsplashItems.forEach((item, i) => {
  console.log(`\n--- [${i+1}] Line ${item.lineNum} ---`);
  console.log(item.line);
  // print key context lines
  const matchAlt = item.context.match(/alt=["']([^"']+)["']/i);
  const matchTitle = item.context.match(/<(h[1-6]|span|div|a)[^>]*class=["'][^"']*(title|name|heading|dest|tour|trek)[^"']*["'][^>]*>([^<]+)<\/\1>/i);
  console.log('Alt:', matchAlt ? matchAlt[1] : 'NONE');
  console.log('Title/Heading:', matchTitle ? matchTitle[3].trim() : 'NONE');
});
