const fs = require('fs');
const path = require('path');
const { getNavbarHtml } = require('./generate_navbar');

function determineMenuState(filePath) {
  const norm = filePath.replace(/\\/g, '/');
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
    console.log('Skipping (no header):', filePath);
    return false;
  }
  const headerEnd = content.indexOf('</header>', headerStart);
  if (headerEnd === -1) {
    console.log('Skipping (no closing header):', filePath);
    return false;
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
  console.log(`Updated [${filePath}] with prefix '${prefix}' and active '${activeMenu}'`);
  return true;
}

// Test on index.html and tour/one-day-kathmandu-city-tour/index.html
updateFileHeader('index.html');
updateFileHeader(path.join('tour', 'one-day-kathmandu-city-tour', 'index.html'));
