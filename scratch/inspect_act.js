const fs = require('fs');
const html = fs.readFileSync('trek/annapurna-circuit-trek/index.html', 'utf8');

const revPos = html.indexOf('id="section-reviews"');
console.log('section-reviews pos:', revPos);
if (revPos !== -1) {
  console.log(html.substring(revPos - 100, revPos + 300));
}
