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
const copiedEbcItinerary = [];

trekFiles.forEach(file => {
  const rel = path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return;

  const folder = path.basename(path.dirname(file));
  // If not in everest region
  const isEverest = folder.includes('everest') || folder.includes('gokyo') || folder.includes('island-peak') || folder.includes('lobuche') || folder.includes('mera-peak') || folder.includes('three-high-passes');

  const itineraryMatch = html.match(/<section[^>]*id=["']section-itinerary["'][\s\S]*?<\/section>/i);
  if (!itineraryMatch) return;

  const itText = itineraryMatch[0];
  if (!isEverest && (itText.includes('Lukla') || itText.includes('Namche Bazaar'))) {
    copiedEbcItinerary.push({
      folder,
      rel
    });
  }
});

console.log(`Found ${copiedEbcItinerary.length} non-Everest trek pages that have copied Everest (Lukla/Namche) itinerary:`);
copiedEbcItinerary.forEach(p => console.log(' - ' + p.folder));
