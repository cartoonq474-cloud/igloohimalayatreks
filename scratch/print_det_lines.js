const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../trek/dhaulagiri-circuit-trek/index.html'), 'utf8');
const det = html.match(/<section id=["']section-details["'][\s\S]*?<\/section>/i)[0];
det.split('\n').filter(l => /EBC/i.test(l)).forEach(l => console.log(l.trim()));
