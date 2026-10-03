const fs = require('fs');
const html = fs.readFileSync('blog/everest-base-camp-vs-annapurna-circuit/index.html', 'utf8');
console.log("Section tags with ID:", (html.match(/<section id=/g) || []).length);
console.log("H2 tags with ID:", (html.match(/<h2 id=/g) || []).length);
