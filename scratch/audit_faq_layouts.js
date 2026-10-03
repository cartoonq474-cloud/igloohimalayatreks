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

console.log(`Found ${trekFiles.length} trek pages and ${tourFiles.length} tour pages.`);

const stats = {
  hasFaqLayoutContainer: [],
  missingFaqLayoutContainer: [],
  noFaqSectionAtAll: [],
  hasOtherFaqStructure: []
};

[...trekFiles, ...tourFiles].forEach(filePath => {
  const relPath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  const hasFaqSection = /id=["']section-faqs["']/i.test(html) || /class=["'][^"']*faq[^"']*["']/i.test(html);
  const hasLayoutContainer = /faq-layout-container/i.test(html);

  if (!hasFaqSection) {
    stats.noFaqSectionAtAll.push(relPath);
  } else if (hasLayoutContainer) {
    // Check if it has categories and items
    const hasCategoryNav = /faq-category-nav/i.test(html);
    const hasMainPanel = /faq-main-panel/i.test(html);
    stats.hasFaqLayoutContainer.push({
      relPath,
      hasCategoryNav,
      hasMainPanel
    });
  } else {
    stats.missingFaqLayoutContainer.push(relPath);
  }
});

console.log('\n--- AUDIT SUMMARY ---');
console.log(`Total Pages: ${trekFiles.length + tourFiles.length}`);
console.log(`Pages with .faq-layout-container: ${stats.hasFaqLayoutContainer.length}`);
console.log(`Pages MISSING .faq-layout-container: ${stats.missingFaqLayoutContainer.length}`);
console.log(`Pages with NO FAQ at all: ${stats.noFaqSectionAtAll.length}`);

if (stats.missingFaqLayoutContainer.length > 0) {
  console.log('\n--- PAGES MISSING FAQ-LAYOUT-CONTAINER ---');
  stats.missingFaqLayoutContainer.forEach(p => console.log(' - ' + p));
}

if (stats.noFaqSectionAtAll.length > 0) {
  console.log('\n--- PAGES WITH NO FAQ AT ALL ---');
  stats.noFaqSectionAtAll.forEach(p => console.log(' - ' + p));
}
