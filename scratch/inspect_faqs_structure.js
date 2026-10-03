const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');
const m = html.match(/<section id="section-faqs"[\s\S]*?<\/section>/i);
if (m) {
  const categories = [...m[0].matchAll(/<button[^>]*class="[^"]*faq-tab-btn[^"]*"[^>]*>([\s\S]*?)<\/button>/gi)].map(x => x[1].replace(/<[^>]+>/g, '').trim());
  console.log('FAQ Categories:', categories);
  const questions = [...m[0].matchAll(/<h[34][^>]*class="[^"]*faq-question-title[^"]*"[^>]*>([\s\S]*?)<\/h[34]>/gi)].map(x => x[1].replace(/<[^>]+>/g, '').trim());
  console.log('FAQ Questions count:', questions.length);
  questions.slice(0, 10).forEach((q, i) => console.log(`${i+1}. ${q}`));
} else {
  console.log('section-faqs not found');
}
