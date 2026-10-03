const fs = require('fs');

const liveUrls = JSON.parse(fs.readFileSync('scratch/live_scraped_urls.json', 'utf8'));

// Filter URLs that look like blog posts (not /trip/, not /activities/, not /page/)
const posts = liveUrls.filter(u => {
  const p = new URL(u).pathname;
  if (p === '/' || p.startsWith('/trip/') || p.startsWith('/activities/') || p.startsWith('/team/')) return false;
  if (['/about-us/', '/contact-us/', '/terms-and-conditions/', '/privacy-policy/', '/our-team/', '/why-us/', '/legal-documents/', '/faq/', '/reviews/'].includes(p)) return false;
  if (['/equipment-checklist/', '/nepal-travel-guide/', '/nepal-visa/', '/travel-insurance/', '/recommended-medical-kit/'].includes(p)) return false;
  return true;
});

console.log(`Found ${posts.length} potential blog posts / informational articles:`);
posts.slice(0, 25).forEach((p, i) => console.log(`${i+1}. ${p}`));
