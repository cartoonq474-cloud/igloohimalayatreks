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

const results = {};

tourPages.forEach(p => {
  const full = path.join(__dirname, '..', p);
  const html = fs.readFileSync(full, 'utf8');
  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) return;

  const faqs = [];
  const cardRegex = /<div class="itinerary-card">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  // Or match itinerary-header and itinerary-content
  const headerRegex = /<h4[^>]*class=["'][^"']*itinerary-day-title-new[^"']*["'][^>]*>([\s\S]*?)<\/h4>[\s\S]*?<div class="itinerary-content">[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
  
  let m;
  while ((m = headerRegex.exec(faqMatch[0])) !== null) {
    faqs.push({
      q: m[1].replace(/<[^>]+>/g, '').trim(),
      a: m[2].replace(/<[^>]+>/g, '').trim()
    });
  }

  // Get Page Title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  
  results[p] = {
    title: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : (titleMatch ? titleMatch[1].split('—')[0].trim() : p),
    faqs
  };
});

fs.writeFileSync(path.join(__dirname, 'tour_existing_faqs.json'), JSON.stringify(results, null, 2), 'utf8');
console.log('Saved existing tour FAQs to scratch/tour_existing_faqs.json');
Object.keys(results).forEach(k => {
  console.log(`${k} (${results[k].title}): ${results[k].faqs.length} FAQs`);
});
