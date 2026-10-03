const fs = require('fs');

function inspectSectionStructure(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const m = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!m) return;
  console.log(`=== ${filePath} ===`);
  // print first 50 lines of section
  const lines = m[0].split('\n').slice(0, 45);
  console.log(lines.join('\n'));
}

inspectSectionStructure('c:/Users/ASUS/Desktop/igloohimalayatreks/trek/everest-base-camp-trek/index.html');
