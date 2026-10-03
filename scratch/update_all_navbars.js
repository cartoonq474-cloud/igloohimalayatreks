const fs = require('fs');
const path = require('path');
const { getNavbarHtml } = require('./generate_navbar');

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

function determineMenuState(filePath) {
  const norm = filePath.replace(/\\/g, '/').toLowerCase();
  if (norm === 'index.html') return '';
  if (norm.startsWith('trek/') || norm.includes('nepal-trekking-packages')) return 'treks';
  if (norm.startsWith('tour/') || norm.includes('nepal-tour-packages')) return 'tours';
  if (norm.includes('-region-treks') || norm.includes('trekking-regions-nepal')) return 'regions';
  if (norm.includes('travel-guide') || norm.includes('nepal-visa') || norm.includes('equipment-checklist') || norm.includes('travel-insurance') || norm.includes('recommended-medical-kit')) return 'guide';
  if (norm.includes('about.html') || norm.includes('team.html') || norm.includes('careers.html') || norm.includes('reviews.html') || norm.includes('custom-plan.html')) return 'company';
  if (norm.includes('blogs.html')) return 'blog';
  if (norm.includes('contact.html')) return 'contact';
  return '';
}

function getPrefix(filePath) {
  const segments = filePath.split(path.sep);
  const depth = segments.length - 1;
  if (depth === 0) return '';
  if (depth === 1) return '../';
  if (depth === 2) return '../../';
  return '';
}

function updateFileHeader(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const headerStart = content.indexOf('<header class="main-header"');
  if (headerStart === -1) {
    return { status: 'skipped_no_header', path: filePath };
  }
  const headerEnd = content.indexOf('</header>', headerStart);
  if (headerEnd === -1) {
    return { status: 'skipped_no_header_end', path: filePath };
  }

  const prefix = getPrefix(filePath);
  const activeMenu = determineMenuState(filePath);
  const newHeader = getNavbarHtml(prefix, activeMenu);

  const before = content.substring(0, headerStart);
  const after = content.substring(headerEnd + '</header>'.length);

  // Preserve <!-- Header Navigation --> comment if it was right before
  let finalBefore = before;
  const commentIdx = before.lastIndexOf('<!-- Header Navigation -->');
  if (commentIdx !== -1 && before.substring(commentIdx).trim() === '<!-- Header Navigation -->') {
    finalBefore = before.substring(0, commentIdx).trimEnd() + '\n\n';
  }

  const updatedContent = finalBefore + newHeader + after;
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  return { status: 'updated', path: filePath, prefix, activeMenu };
}

const allHtml = walk('.');
console.log(`Found ${allHtml.length} HTML files.`);

let updatedCount = 0;
let skippedCount = 0;
const results = allHtml.map(f => {
  const res = updateFileHeader(f);
  if (res.status === 'updated') {
    updatedCount++;
    console.log(`[UPDATED] ${f} (prefix: '${res.prefix}', active: '${res.activeMenu}')`);
  } else {
    skippedCount++;
    console.log(`[SKIPPED] ${f} (${res.status})`);
  }
  return res;
});

console.log('\n========================================');
console.log(`Total HTML files: ${allHtml.length}`);
console.log(`Successfully updated: ${updatedCount}`);
console.log(`Skipped (stubs / no header): ${skippedCount}`);
console.log('========================================');
