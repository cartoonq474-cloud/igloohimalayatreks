const fs = require('fs');

const yalaHtml = fs.readFileSync('trek/yala-peak-climbing/index.html', 'utf8');
const ebcHtml = fs.readFileSync('trek/everest-base-camp-trek/index.html', 'utf8');

const yalaItineraryMatch = yalaHtml.match(/<section[^>]*id=["']section-itinerary["'][\s\S]*?<\/section>/i);
if (yalaItineraryMatch) {
  const yalaItinerary = yalaItineraryMatch[0];
  console.log('Does Yala Peak Climbing itinerary mention Namche or Lukla?');
  console.log('Contains Namche:', yalaItinerary.includes('Namche'));
  console.log('Contains Lukla:', yalaItinerary.includes('Lukla'));
  console.log('Sample Day 1 in Yala Peak:');
  const d1 = yalaItinerary.match(/<h4[^>]*class=["'][^"']*itinerary-day-title-new[^"']*["'][^>]*>([\s\S]*?)<\/h4>/i);
  console.log('Day 1 title:', d1 ? d1[1].replace(/<[^>]+>/g, '').trim() : 'none');
}

const langtangHelambuHtml = fs.readFileSync('trek/langtang-gosaikunda-helambu-trek/index.html', 'utf8');
const langtangItinerary = langtangHelambuHtml.match(/<section[^>]*id=["']section-itinerary["'][\s\S]*?<\/section>/i);
if (langtangItinerary) {
  console.log('\nDoes Langtang Gosaikunda Helambu mention Lukla or Namche?');
  console.log('Contains Namche:', langtangItinerary[0].includes('Namche'));
  console.log('Contains Lukla:', langtangItinerary[0].includes('Lukla'));
}
