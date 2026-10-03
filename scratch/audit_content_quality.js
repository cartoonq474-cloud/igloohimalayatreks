const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file === 'index.html') {
      results.push(fullPath);
    }
  });
  return results;
}

const trekFiles = getAllHtmlFiles(path.join(__dirname, '../trek'));
const tourFiles = getAllHtmlFiles(path.join(__dirname, '../tour'));
const allFiles = [...trekFiles, ...tourFiles];

const pageReports = [];

allFiles.forEach(file => {
  const rel = path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return; // skip redirects

  const isTour = rel.startsWith('tour/');

  // Title & H1
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'No Title';
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Overview length
  let overviewText = '';
  const overviewMatch = html.match(/<section[^>]*id=["']section-overview["'][\s\S]*?<\/section>/i);
  if (overviewMatch) {
    overviewText = overviewMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Itinerary days
  const itineraryMatch = html.match(/<section[^>]*id=["']section-itinerary["'][\s\S]*?<\/section>/i);
  let daysCount = 0;
  let itineraryWords = 0;
  if (itineraryMatch) {
    const days = [...itineraryMatch[0].matchAll(/<div[^>]*class=["'][^"']*itinerary-(?:card|day|item)[^"']*["']/gi)];
    daysCount = days.length;
    itineraryWords = itineraryMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
  }

  // Highlights
  const highlightsCount = (html.match(/class=["'][^"']*(?:highlight|trip-highlight)[^"']*["']/gi) || []).length;

  // Includes / Excludes
  const hasIncludes = html.includes('section-includes') || html.includes('Price Includes') || html.includes('Cost Includes');
  
  // Packing List / Gear
  const hasGear = html.includes('section-gear') || html.includes('section-packing') || html.includes('Packing List') || html.includes('Gear Checklist');

  // FAQ
  const hasFaq = html.includes('section-faqs');
  const faqItemsCount = (html.match(/class=["'][^"']*faq-item[^"']*["']/gi) || []).length;

  // Schema
  const hasTouristTrip = html.includes('"@type": "TouristTrip"');
  const hasFAQPage = html.includes('"@type": "FAQPage"');

  pageReports.push({
    rel,
    type: isTour ? 'Tour' : 'Trek',
    title,
    metaDescLength: metaDesc.length,
    overviewLength: overviewText.length,
    daysCount,
    itineraryWords,
    hasIncludes,
    hasGear,
    faqItemsCount,
    hasTouristTrip,
    hasFAQPage,
    fileSizeKB: Math.round(html.length / 1024)
  });
});

fs.writeFileSync(path.join(__dirname, 'content_audit_report.json'), JSON.stringify(pageReports, null, 2), 'utf8');

console.log(`Audited ${pageReports.length} active pages.`);
console.log('\n--- TOP 10 LARGEST PAGES (by content/size) ---');
pageReports.sort((a,b) => b.fileSizeKB - a.fileSizeKB).slice(0, 10).forEach(p => {
  console.log(`${p.rel}: ${p.fileSizeKB}KB | Days: ${p.daysCount} | Itinerary words: ${p.itineraryWords} | FAQs: ${p.faqItemsCount}`);
});

console.log('\n--- PAGES WITH THINNEST CONTENT (lowest itinerary words / overview) ---');
pageReports.sort((a,b) => a.itineraryWords - b.itineraryWords).slice(0, 15).forEach(p => {
  console.log(`${p.rel} (${p.type}): ${p.fileSizeKB}KB | Days: ${p.daysCount} | Itinerary words: ${p.itineraryWords} | FAQs: ${p.faqItemsCount}`);
});
