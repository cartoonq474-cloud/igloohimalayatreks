const fs = require('fs');
const html = fs.readFileSync('trek/everest-base-camp-trek/index.html', 'utf8');
const subnavIdx = html.indexOf('trek-sub-nav');
if (subnavIdx !== -1) {
  console.log('Subnav in EBC:');
  console.log(html.substring(subnavIdx, subnavIdx + 1500));
} else {
  console.log('No trek-sub-nav in EBC, checking subnav:');
  const subIdx = html.indexOf('subnav');
  console.log(html.substring(subIdx - 50, subIdx + 500));
}
