const { allAnnapurnaPackages } = require('./all_annapurna_data.js');

console.log(`Checking ${allAnnapurnaPackages.length} Annapurna packages:`);
allAnnapurnaPackages.forEach(p => {
  const missing = [];
  ['slug', 'title', 'seoTitle', 'metaDesc', 'canonical', 'duration', 'difficulty', 'maxAlt', 'maxAltNum', 'price', 'transport', 'accommodation', 'region', 'heroBadge', 'highlights', 'gallery', 'itinerary'].forEach(field => {
    if (!p[field]) missing.push(field);
  });
  if (missing.length > 0) {
    console.log(`[${p.slug}] MISSING FIELDS:`, missing);
  } else {
    console.log(`✓ [${p.slug}] valid: ${p.itinerary.length} days, ${p.highlights.length} highlights, ${p.gallery.length} photos`);
  }
});
