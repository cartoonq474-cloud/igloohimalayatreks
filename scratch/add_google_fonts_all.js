const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === '.gemini') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const fontSnippet = `  <!-- Google Fonts: Inter, Outfit, Plus Jakarta Sans & Caveat -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap">
`;

const allHtml = walk('.');
let updatedCount = 0;
let skippedCount = 0;

allHtml.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Skip redirect stubs
  if (!content.includes('<header class="main-header"')) {
    skippedCount++;
    return;
  }

  // If already has font links, update if it doesn't have Caveat or Plus Jakarta Sans
  if (content.includes('fonts.googleapis.com/css2?family=')) {
    // Replace existing font link with the full new font link
    const oldFontRegex = /([ \t]*)<!--.*?Font.*?-->\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?[^">]+">/s;
    if (oldFontRegex.test(content)) {
      content = content.replace(oldFontRegex, fontSnippet.trimEnd());
      fs.writeFileSync(f, content, 'utf8');
      updatedCount++;
      console.log(`[UPDATED EXISTING FONT] ${f}`);
      return;
    }
  }

  // Otherwise, insert before index.css
  const indexCssIdx = content.search(/<link\s+rel="stylesheet"\s+href="[^"]*index\.css/);
  if (indexCssIdx !== -1) {
    const before = content.substring(0, indexCssIdx);
    const after = content.substring(indexCssIdx);
    const updatedContent = before + fontSnippet + '  ' + after;
    fs.writeFileSync(f, updatedContent, 'utf8');
    updatedCount++;
    console.log(`[INSERTED FONT] ${f}`);
  } else {
    // Fallback: insert before </head>
    const headCloseIdx = content.indexOf('</head>');
    if (headCloseIdx !== -1) {
      const before = content.substring(0, headCloseIdx);
      const after = content.substring(headCloseIdx);
      const updatedContent = before + fontSnippet + after;
      fs.writeFileSync(f, updatedContent, 'utf8');
      updatedCount++;
      console.log(`[INSERTED BEFORE </head>] ${f}`);
    } else {
      console.log(`[FAILED TO INSERT] ${f}`);
    }
  }
});

console.log('\n========================================');
console.log(`Total HTML files: ${allHtml.length}`);
console.log(`Successfully updated with Google Fonts: ${updatedCount}`);
console.log(`Skipped (redirect stubs): ${skippedCount}`);
console.log('========================================');
