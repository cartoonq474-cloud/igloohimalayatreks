const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const folders = fs.readdirSync(trekDir).filter(f => {
  const p = path.join(trekDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

const packages = [];

for (const f of folders) {
  const filePath = path.join(trekDir, f, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) continue;

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/—.*$/, '').replace(/\|.*$/, '').trim() : f;

  // Extract duration from badge or facts
  const durationMatch = html.match(/(\d+)\s*(?:Days|Day)/i);
  const duration = durationMatch ? parseInt(durationMatch[1]) : 14;

  // Extract max altitude
  const altMatch = html.match(/(\d{1,2},\d{3})\s*m/i) || html.match(/(\d{4})\s*m/i);
  const altitude = altMatch ? altMatch[1] + 'm' : '5,000m';

  // Extract region from key facts
  const regionMatch = html.match(/<span class="fact-label">Trek Region<\/span>\s*<span class="fact-val">([^<]+)<\/span>/i) ||
                      html.match(/<span class="fact-label">Region<\/span>\s*<span class="fact-val">([^<]+)<\/span>/i);
  let region = regionMatch ? regionMatch[1].trim() : 'Himalaya';

  // Classify type
  const isPeak = /climbing|peak/i.test(f);
  const isLuxury = /luxury/i.test(f);
  const isHeli = /heli/i.test(f);
  const isRoad = /without-flight|road-based|jeep/i.test(f);

  packages.push({
    slug: f,
    title,
    duration,
    altitude,
    region,
    isPeak,
    isLuxury,
    isHeli,
    isRoad
  });
}

console.log(`Found ${packages.length} active packages.`);
console.log(JSON.stringify(packages.slice(0, 10), null, 2));
fs.writeFileSync(path.join(__dirname, 'packages_metadata.json'), JSON.stringify(packages, null, 2), 'utf8');
console.log('Saved to scratch/packages_metadata.json');
