const fs = require('fs');
const html = fs.readFileSync('trek/abc-with-mardi-himal-trek/index.html', 'utf8');

const matches = [...html.matchAll(/class="[^"]*trek-sub-nav[^"]*"/g)];
matches.forEach(m => {
  console.log('Match index:', m.index);
  console.log(html.slice(m.index, m.index + 800));
});
