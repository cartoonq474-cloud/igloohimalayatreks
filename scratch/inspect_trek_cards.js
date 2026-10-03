const fs = require('fs');

function inspectFile(filePath) {
  console.log('=== Inspecting', filePath, '===');
  const content = fs.readFileSync(filePath, 'utf8');

  const startMarker = 'id="treks-container"';
  const startIdx = content.indexOf(startMarker);
  const endMarker = '<!-- Footer -->';
  const endIdx = content.indexOf(endMarker, startIdx);

  if (startIdx === -1 || endIdx === -1) {
    console.log('Markers not found!');
    return;
  }

  const section = content.slice(startIdx, endIdx);
  const lines = section.split('\n');

  let cardCount = 0;
  lines.forEach((line, idx) => {
    if (line.includes('class="card trek-item"')) {
      cardCount++;
    }
    if (line.includes('id="treks-container"') && idx > 0) {
      console.log(`[Line ${idx}] Nested treks-container:`, line.trim());
    }
    if (line.includes(',690') || line.includes(',990') || line.includes(',490') || line.includes(',290')) {
      if (!line.includes('$')) {
        console.log(`[Line ${idx}] Price missing $:`, line.trim());
      }
    }
    if (line.includes('<a href=') && line.includes('Starting from')) {
      console.log(`[Line ${idx}] Corrupted link in starting from:`, line.trim());
    }
  });

  console.log('Total cards found in section:', cardCount);
}

inspectFile('nepal-trekking-packages/index.html');
if (fs.existsSync('nepal-trekking-packages.html')) {
  inspectFile('nepal-trekking-packages.html');
}
