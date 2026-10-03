const fs = require('fs');
const html = fs.readFileSync('trek/annapurna-base-camp/index.html', 'utf8');
const faqMatch = html.match(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i);
if (faqMatch) {
  console.log('FAQ section found! Length:', faqMatch[0].length);
  const titles = [...faqMatch[0].matchAll(/<h4[^>]*class=["'][^"']*faq-question[^"']*["'][^>]*>([\s\S]*?)<\/h4>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Total FAQs:', titles.length);
  console.log('Sample questions:', titles.slice(0, 5));
} else {
  console.log('No section-faqs found');
}
