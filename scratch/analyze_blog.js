const fs = require('fs');
const http = require('http');

async function analyzeBlogPage() {
  const filePath = 'blog/everest-base-camp-vs-annapurna-circuit/index.html';
  const html = fs.readFileSync(filePath, 'utf8');

  console.log('=== STARTING DEEP ANALYSIS OF BLOG ARTICLE PAGE ===\n');

  const issues = [];
  const warnings = [];

  // 1. Heading Hierarchy
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) issues.push('Missing H1 heading');
  if (h1Matches.length > 1) issues.push(`Multiple H1 headings found (${h1Matches.length})`);

  // Check all headings
  const allHeadings = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
  console.log(`Total headings: ${allHeadings.length} (H1: ${h1Matches.length})`);

  // 2. Links Audit
  const linkMatches = [...html.matchAll(/<a\s+[^>]*href="([^"]*)"[^>]*>/gi)];
  console.log(`Total links found: ${linkMatches.length}`);

  const brokenAnchors = [];
  const brokenLocalLinks = [];

  linkMatches.forEach(match => {
    const href = match[1];
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (!html.includes(`id="${id}"`) && !html.includes(`name="${id}"`)) {
        brokenAnchors.push(href);
      }
    } else if (href.startsWith('../../') || href.startsWith('./') || href.startsWith('/')) {
      // Check local relative file link
      let cleanPath = href.split('?')[0].split('#')[0];
      let resolvedPath;
      if (cleanPath.startsWith('../../')) {
        resolvedPath = cleanPath.replace('../../', '');
      } else if (cleanPath.startsWith('/')) {
        resolvedPath = cleanPath.slice(1);
      } else {
        resolvedPath = 'blog/everest-base-camp-vs-annapurna-circuit/' + cleanPath;
      }

      // If it's a directory link, expect index.html
      if (resolvedPath.endsWith('/')) {
        resolvedPath += 'index.html';
      } else if (!resolvedPath.includes('.')) {
        resolvedPath += '/index.html';
      }

      if (!fs.existsSync(resolvedPath)) {
        brokenLocalLinks.push({ href, resolvedPath });
      }
    }
  });

  if (brokenAnchors.length > 0) {
    issues.push(`Broken in-page anchor links: ${brokenAnchors.join(', ')}`);
  }
  if (brokenLocalLinks.length > 0) {
    brokenLocalLinks.forEach(b => {
      warnings.push(`Local link may not exist on disk: ${b.href} -> ${b.resolvedPath}`);
    });
  }

  // 3. Image Audit
  const imgMatches = [...html.matchAll(/<img\s+[^>]*src="([^"]*)"[^>]*>/gi)];
  console.log(`Total images found: ${imgMatches.length}`);
  const brokenImages = [];
  const missingAlt = [];
  const missingDimensions = [];

  imgMatches.forEach(match => {
    const fullTag = match[0];
    const src = match[1];

    if (!fullTag.includes('alt="')) {
      missingAlt.push(src);
    }
    if (!fullTag.includes('width="') || !fullTag.includes('height="')) {
      missingDimensions.push(src);
    }

    let localPath;
    if (src.startsWith('../../')) {
      localPath = src.replace('../../', '');
    } else if (src.startsWith('/')) {
      localPath = src.slice(1);
    } else {
      localPath = 'blog/everest-base-camp-vs-annapurna-circuit/' + src;
    }

    if (!fs.existsSync(localPath)) {
      brokenImages.push(src);
    }
  });

  if (brokenImages.length > 0) issues.push(`Broken image sources: ${brokenImages.join(', ')}`);
  if (missingAlt.length > 0) issues.push(`Images missing alt text: ${missingAlt.join(', ')}`);
  if (missingDimensions.length > 0) warnings.push(`Images missing width/height (CLS risk): ${missingDimensions.length} images`);

  // 4. Schema Validation
  const schemaMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  console.log(`Structured Data schemas found: ${schemaMatches.length}`);
  schemaMatches.forEach((s, idx) => {
    try {
      const parsed = JSON.parse(s[1]);
      console.log(`Schema #${idx + 1} valid JSON. Type/Graph:`, parsed['@type'] || (parsed['@graph'] ? parsed['@graph'].map(g => g['@type']) : 'Unknown'));
    } catch (e) {
      issues.push(`Schema #${idx + 1} JSON parse error: ${e.message}`);
    }
  });

  // 5. Check meta tags
  if (!html.includes('<meta name="description"')) issues.push('Missing meta description');
  if (!html.includes('<link rel="canonical"')) issues.push('Missing canonical link');
  if (!html.includes('<title>')) issues.push('Missing <title> tag');

  // 6. Interactive Modal Buttons
  const inquiryButtons = html.match(/open-inquiry-btn/g) || [];
  console.log(`Inquiry modal trigger buttons found: ${inquiryButtons.length}`);
  if (inquiryButtons.length === 0) warnings.push('No inquiry modal trigger buttons found');

  // Summary
  console.log('\n--- ANALYSIS RESULTS ---');
  console.log(`Issues found (${issues.length}):`);
  issues.forEach(i => console.log('  [ERROR]', i));
  console.log(`Warnings found (${warnings.length}):`);
  warnings.forEach(w => console.log('  [WARN]', w));

  if (issues.length === 0 && warnings.length === 0) {
    console.log('✓ All core static audits passed cleanly!');
  }
}

analyzeBlogPage();
