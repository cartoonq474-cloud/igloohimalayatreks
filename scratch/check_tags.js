const fs = require('fs');

const files = [
  'trek/mera-peak-climbing/index.html',
  'trek/everest-base-camp-trek-heli-return/index.html',
  'trek/pikey-peak-trek/index.html',
  'trek/gokyo-lake-trek-with-helicopter-return/index.html'
];

const tagsToCheck = ['div', 'section', 'article', 'main', 'form', 'table', 'ul'];

files.forEach(file => {
  console.log('=== ' + file + ' ===');
  const c = fs.readFileSync(file, 'utf8');
  tagsToCheck.forEach(tag => {
    const openRegex = new RegExp('<' + tag + '(\\s+[^>]*)?>', 'gi');
    const closeRegex = new RegExp('</' + tag + '>', 'gi');
    const openCount = (c.match(openRegex) || []).length;
    const closeCount = (c.match(closeRegex) || []).length;
    const diff = openCount - closeCount;
    if (diff !== 0) {
      console.log(`  MISMATCH in <${tag}>: open=${openCount}, close=${closeCount}, diff=${diff}`);
    } else {
      console.log(`  <${tag}> balanced: ${openCount}`);
    }
  });
});
