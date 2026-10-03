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
  const filePath = path.join(__dirname, '..', p);
  const html = fs.readFileSync(filePath, 'utf8');
  const match = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (match) {
    console.log(`${p}: found section-faqs (${match[0].length} chars)`);
  } else {
    console.error(`ERROR: ${p} missing section-faqs`);
  }
});
