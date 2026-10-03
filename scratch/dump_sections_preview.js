const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

function showSection(id) {
  const re = new RegExp('<section\\s+id=["\']' + id + '["\'][\\s\\S]*?<\\/section>', 'i');
  const m = html.match(re);
  if (!m) {
    console.log('--- ' + id + ' NOT FOUND ---');
    return;
  }
  console.log('=== ' + id + ' (total ' + m[0].length + ' chars) ===');
  console.log(m[0].substring(0, 1000));
  console.log('...\n');
}

showSection('section-includes');
showSection('section-packing');
showSection('section-altitude-profile');
showSection('section-weather');
showSection('section-map');
