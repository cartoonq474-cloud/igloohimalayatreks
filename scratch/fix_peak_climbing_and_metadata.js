const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. Fix peak-climbing-nepal/index.html broken HTML
const peakHubPath = path.join(ROOT, 'peak-climbing-nepal', 'index.html');
if (fs.existsSync(peakHubPath)) {
  let content = fs.readFileSync(peakHubPath, 'utf8');

  const brokenPattern = /<strong style="display: block; font-size: 1\.25rem; color: var\(--color-primary-navy\);"><a href="\.\.\/trek\/three-high-passes-with-island-peak-climb\/"[\s\S]*?<\/div>,290<\/strong>/;
  if (brokenPattern.test(content)) {
    content = content.replace(brokenPattern, '<strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,290</strong>');
    fs.writeFileSync(peakHubPath, content, 'utf8');
    console.log('Fixed broken card in peak-climbing-nepal/index.html');
  }
}

// 2. Fix metadata in yala-peak-climbing
const yalaPath = path.join(ROOT, 'trek', 'yala-peak-climbing', 'index.html');
if (fs.existsSync(yalaPath)) {
  let content = fs.readFileSync(yalaPath, 'utf8');
  content = content.replace(
    /<meta name="twitter:title" content="Everest Base Camp Trek \(14 Days\) — Igloo Himalaya Treks">/,
    '<meta name="twitter:title" content="Yala Peak Climbing (5,500m / 11 Days) — Igloo Himalaya Treks">'
  );
  content = content.replace(
    /<meta name="twitter:description" content="Detailed 14 Days Everest Base Camp Trek Itinerary with altitude profile, included services, and local guide expertise\.">/,
    '<meta name="twitter:description" content="Summit Yala Peak (5,500m) in Langtang, Nepal. The ideal beginner-friendly 11-day mountaineering expedition featuring Kyanjin Gompa, high camp training, and views of Shishapangma (8,027m).">'
  );
  content = content.replace(
    /<meta name="twitter:image" content="https:\/\/igloohimalayatreks\.com\/images\/hero-himalayas\.webp">/,
    '<meta name="twitter:image" content="https://igloohimalayatreks.com/images/yala-peak-climbing.webp">'
  );
  fs.writeFileSync(yalaPath, content, 'utf8');
  console.log('Fixed twitter metadata in yala-peak-climbing/index.html');
}

// 3. Fix metadata in tamang-heritage-trail-with-langtang-valley-trek
const tamangComboPath = path.join(ROOT, 'trek', 'tamang-heritage-trail-with-langtang-valley-trek', 'index.html');
if (fs.existsSync(tamangComboPath)) {
  let content = fs.readFileSync(tamangComboPath, 'utf8');
  content = content.replace(
    /<meta name="twitter:title" content="Everest Base Camp Trek \(14 Days\) — Igloo Himalaya Treks">/,
    '<meta name="twitter:title" content="Tamang Heritage Trail with Langtang Valley Trek (14 Days) — Igloo Himalaya Treks">'
  );
  content = content.replace(
    /<meta name="twitter:description" content="Detailed 14 Days Everest Base Camp Trek Itinerary with altitude profile, included services, and local guide expertise\.">/,
    '<meta name="twitter:description" content="Immerse in indigenous Tamang culture, hot springs of Tatopani, and panoramic views from Nagthali and Kyanjin Ri on this 14-day combined Langtang journey.">'
  );
  content = content.replace(
    /<meta name="twitter:image" content="https:\/\/igloohimalayatreks\.com\/images\/hero-himalayas\.webp">/,
    '<meta name="twitter:image" content="https://igloohimalayatreks.com/images/tamang-heritage-trail-with-langtang-valley-trek.webp">'
  );
  fs.writeFileSync(tamangComboPath, content, 'utf8');
  console.log('Fixed twitter metadata in tamang-heritage-trail-with-langtang-valley-trek/index.html');
}

// 4. Fix metadata in langtang-gosaikunda-helambu-trek
const langtangHelambuPath = path.join(ROOT, 'trek', 'langtang-gosaikunda-helambu-trek', 'index.html');
if (fs.existsSync(langtangHelambuPath)) {
  let content = fs.readFileSync(langtangHelambuPath, 'utf8');
  content = content.replace(
    /<meta name="twitter:title" content="Everest Base Camp Trek \(14 Days\) — Igloo Himalaya Treks">/,
    '<meta name="twitter:title" content="Langtang Gosaikunda Helambu Circuit Trek (16 Days) — Igloo Himalaya Treks">'
  );
  content = content.replace(
    /<meta name="twitter:description" content="Detailed 14 Days Everest Base Camp Trek Itinerary with altitude profile, included services, and local guide expertise\.">/,
    '<meta name="twitter:description" content="The grand grand traverse connecting Langtang Valley, sacred high alpine lakes of Gosaikunda (4,380m), Laurebina Pass (4,610m), and Sherpa villages of Helambu.">'
  );
  content = content.replace(
    /<meta name="twitter:image" content="https:\/\/igloohimalayatreks\.com\/images\/hero-himalayas\.webp">/,
    '<meta name="twitter:image" content="https://igloohimalayatreks.com/images/langtang-gosaikunda-helambu-trek.webp">'
  );
  fs.writeFileSync(langtangHelambuPath, content, 'utf8');
  console.log('Fixed twitter metadata in langtang-gosaikunda-helambu-trek/index.html');
}
