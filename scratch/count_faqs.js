const fs = require('fs');
const html = fs.readFileSync('blog/everest-base-camp-vs-annapurna-circuit/index.html', 'utf8');
const faqs = html.match(/class="faq-accordion-item"/g);
console.log('Count of faq-accordion-item:', faqs ? faqs.length : 0);

const questions = [...html.matchAll(/<span>(\d+\.\s+[^<]+)<\/span>/g)];
questions.forEach(q => console.log('  -', q[1]));
