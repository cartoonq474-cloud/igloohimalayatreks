const fs = require('fs');
const path = require('path');

const tourPages = [
  'tour/chitwan-national-park-safari/index.html',
  'tour/cycling-tour-around-kathmandu-valley/index.html',
  'tour/everest-base-camp-helicopter-tour/index.html',
  'tour/honeymoon-tour-in-nepal/index.html',
  'tour/jamacho-hike/index.html',
  'tour/kathmandu-cultural-heritage-tour/index.html',
  'tour/kathmandu-pokhara-chitwan-tour/index.html',
  'tour/nagarkot-sunrise-bhaktapur-tour/index.html',
  'tour/nepal-luxury-helicopter-tour/index.html',
  'tour/one-day-kathmandu-city-tour/index.html',
  'tour/pokhara-valley-nature-tour/index.html',
  'tour/rara-lake-jeep-tour/index.html'
];

tourPages.forEach(p => {
  const full = path.join(__dirname, '..', p);
  const html = fs.readFileSync(full, 'utf8');
  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) {
    console.log(`${p}: NO FAQ SECTION`);
    return;
  }
  const faqHtml = faqMatch[0];
  console.log(`\n=================== ${p} ===================`);
  console.log('FAQ section length:', faqHtml.length);
  // Extract questions
  const questions = [...faqHtml.matchAll(/<(?:h3|h4|strong|div|span)[^>]*class=["'][^"']*(?:question|title|card-header)[^"']*["'][^>]*>([\s\S]*?)<\/(?:h3|h4|strong|div|span)>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Questions found:', questions);
  if (questions.length === 0) {
    // print first 600 chars of faqHtml
    console.log('Sample FAQ markup:');
    console.log(faqHtml.slice(0, 600));
  }
});
