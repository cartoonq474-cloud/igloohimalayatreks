const fs = require('fs');
const path = require('path');

// Inspect reference everest-base-camp-luxury-trek
const ebcPath = path.join(__dirname, '../trek/everest-base-camp-luxury-trek/index.html');
const ebcHtml = fs.readFileSync(ebcPath, 'utf8');

const ebcFaqMatch = ebcHtml.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
if (ebcFaqMatch) {
  fs.writeFileSync(path.join(__dirname, 'reference_faq.html'), ebcFaqMatch[0], 'utf8');
  console.log('Saved reference FAQ section to scratch/reference_faq.html');
}

// Inspect the 60 pages with faq-layout-container
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

const layoutCheck = [];

allFiles.forEach(file => {
  const relPath = path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  
  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) return;
  
  const secHtml = faqMatch[0];
  const h2Match = secHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const h2Text = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : 'NO H2';
  
  const hasContainer = secHtml.includes('faq-layout-container');
  const hasSidebarCard = secHtml.includes('faq-sidebar-card');
  const hasCategoryNav = secHtml.includes('faq-category-nav');
  const hasMainPanel = secHtml.includes('faq-main-panel');
  const hasActiveTitle = secHtml.includes('faq-current-category-title');
  const hasExpandAll = secHtml.includes('faq-expand-all-btn');
  
  // Count category buttons
  const catButtons = [...secHtml.matchAll(/<button[^>]*class=["'][^"']*faq-category-btn[^"']*["'][^>]*data-category=["']([^"']+)["']/gi)].map(m => m[1]);
  // Count category contents
  const catContents = [...secHtml.matchAll(/<div[^>]*class=["'][^"']*faq-category-content[^"']*["'][^>]*id=["']([^"']+)["']/gi)].map(m => m[1]);
  
  // Total faq items
  const faqItemsCount = (secHtml.match(/class=["'][^"']*faq-item[^"']*["']/gi) || []).length;
  
  layoutCheck.push({
    relPath,
    h2Text,
    hasContainer,
    hasSidebarCard,
    hasCategoryNav,
    hasMainPanel,
    hasActiveTitle,
    hasExpandAll,
    catButtons,
    catContents,
    faqItemsCount
  });
});

console.log(`Audited ${layoutCheck.length} pages that contain section-faqs.`);

// Check for discrepancies among the pages that have faq-layout-container
const containerPages = layoutCheck.filter(p => p.hasContainer);
const nonContainerPages = layoutCheck.filter(p => !p.hasContainer);

console.log(`\nPages with faq-layout-container: ${containerPages.length}`);
console.log(`Pages with section-faqs but NOT faq-layout-container: ${nonContainerPages.length}`);

// Check h2 titles in containerPages
const titleIssues = containerPages.filter(p => {
  const pageBase = path.basename(path.dirname(p.relPath)).replace(/-/g, ' ');
  // Check if Mardi Himal is mentioned on a non-mardi-himal page
  if (p.relPath !== 'trek/mardi-himal-trek/index.html' && p.h2Text.toLowerCase().includes('mardi himal')) {
    return true;
  }
  return false;
});

console.log(`\nContainer pages where H2 title mistakenly says Mardi Himal: ${titleIssues.length}`);
titleIssues.slice(0, 10).forEach(p => console.log(` - ${p.relPath}: "${p.h2Text}"`));

// Check missing parts in containerPages
const missingParts = containerPages.filter(p => !p.hasSidebarCard || !p.hasCategoryNav || !p.hasMainPanel || !p.hasActiveTitle || !p.hasExpandAll);
console.log(`\nContainer pages missing sidebar/nav/panel/title/expandAll: ${missingParts.length}`);
missingParts.forEach(p => console.log(` - ${p.relPath}`));
