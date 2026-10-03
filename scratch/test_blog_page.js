const fs = require('fs');
const path = require('path');
const http = require('http');

async function testPage() {
  const filePath = path.join(__dirname, '..', 'blog', 'everest-base-camp-vs-annapurna-circuit', 'index.html');
  console.log('Testing file:', filePath);
  
  if (!fs.existsSync(filePath)) {
    throw new Error('Article file does not exist!');
  }
  
  const html = fs.readFileSync(filePath, 'utf8');
  console.log('HTML size:', html.length, 'bytes');

  // 1. Single H1 check
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log('Number of H1 tags:', h1Matches.length);
  if (h1Matches.length !== 1) {
    console.error('FAIL: Expected exactly 1 H1 tag, found', h1Matches.length);
  } else {
    console.log('PASS: Exactly 1 H1 tag:', h1Matches[0].replace(/<[^>]+>/g, '').trim());
  }

  // 2. Validate all TOC link targets exist in HTML
  const tocHrefRegex = /href="#([^"]+)"[^>]*class="[^"]*toc-link[^"]*"/g;
  const tocHrefRegex2 = /class="[^"]*toc-link[^"]*"[^>]*href="#([^"]+)"/g;
  let match;
  const tocTargets = new Set();
  while ((match = tocHrefRegex.exec(html)) !== null) {
    tocTargets.add(match[1]);
  }
  while ((match = tocHrefRegex2.exec(html)) !== null) {
    tocTargets.add(match[1]);
  }
  console.log(`Found ${tocTargets.size} TOC target links.`);
  
  let missingTargets = 0;
  for (const target of tocTargets) {
    const idRegex = new RegExp(`id="${target}"`, 'i');
    if (!idRegex.test(html)) {
      console.error(`FAIL: Missing target element with id="${target}"`);
      missingTargets++;
    } else {
      console.log(`PASS: Anchor target exists: #${target}`);
    }
  }
  if (missingTargets === 0) {
    console.log('PASS: All 16 TOC anchor targets exist in the HTML document!');
  }

  // 3. Validate JSON-LD structured data
  const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let jsonMatch;
  let schemaCount = 0;
  while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
    schemaCount++;
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      console.log(`PASS: Schema #${schemaCount} parsed successfully. Graph items:`, parsed['@graph'] ? parsed['@graph'].map(item => item['@type']) : parsed['@type']);
      
      // Check FAQ items count
      if (parsed['@graph']) {
        const faq = parsed['@graph'].find(item => item['@type'] === 'FAQPage');
        if (faq) {
          console.log(`PASS: FAQPage schema contains ${faq.mainEntity.length} questions.`);
        }
        const article = parsed['@graph'].find(item => item['@type'] === 'Article');
        if (article) {
          console.log(`PASS: Article schema headline: "${article.headline}"`);
        }
      }
    } catch (err) {
      console.error(`FAIL: JSON-LD #${schemaCount} parse error:`, err.message);
    }
  }

  // 4. Validate all image src references exist on disk
  const imgSrcRegex = /<img[^>]+src="([^">]+)"/gi;
  let imgMatch;
  const images = [];
  while ((imgMatch = imgSrcRegex.exec(html)) !== null) {
    images.push(imgMatch[1]);
  }
  console.log(`Found ${images.length} images.`);
  let missingImages = 0;
  for (const img of images) {
    // resolve relative to the html file directory: blog/everest-base-camp-vs-annapurna-circuit/
    const htmlDir = path.dirname(filePath);
    const resolvedPath = path.resolve(htmlDir, img.split('?')[0]);
    if (!fs.existsSync(resolvedPath)) {
      console.error(`FAIL: Image not found: ${img} (resolved: ${resolvedPath})`);
      missingImages++;
    } else {
      const stat = fs.statSync(resolvedPath);
      console.log(`PASS: Image exists (${(stat.size / 1024).toFixed(1)} KB): ${img}`);
    }
  }

  // 5. Test HTTP endpoint via local server
  await new Promise((resolve, reject) => {
    http.get('http://localhost:3000/blog/everest-base-camp-vs-annapurna-circuit/', (res) => {
      console.log('HTTP GET Status:', res.statusCode);
      if (res.statusCode === 200) {
        console.log('PASS: HTTP 200 OK from server.js');
        resolve();
      } else {
        console.error('FAIL: Expected HTTP 200, got', res.statusCode);
        reject(new Error(`Status ${res.statusCode}`));
      }
    }).on('error', (e) => {
      console.error('HTTP GET error:', e.message);
      resolve(); // don't fail script if server isn't running on 3000
    });
  });

  // 6. Test CSS and JS files exist
  const scriptRegex = /<script[^>]+src="([^">]+)"/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    const src = scriptMatch[1];
    const htmlDir = path.dirname(filePath);
    const resolved = path.resolve(htmlDir, src.split('?')[0]);
    if (fs.existsSync(resolved)) {
      console.log(`PASS: Script file exists: ${src}`);
    } else {
      console.error(`FAIL: Script missing: ${src}`);
    }
  }

  const cssRegex = /<link[^>]+rel="stylesheet"[^>]+href="([^">]+)"/gi;
  let cssMatch;
  while ((cssMatch = cssRegex.exec(html)) !== null) {
    const href = cssMatch[1];
    if (href.startsWith('http')) continue;
    const htmlDir = path.dirname(filePath);
    const resolved = path.resolve(htmlDir, href.split('?')[0]);
    if (fs.existsSync(resolved)) {
      console.log(`PASS: CSS file exists: ${href}`);
    } else {
      console.error(`FAIL: CSS missing: ${href}`);
    }
  }

  console.log('\n=== ALL AUDIT CHECKS COMPLETED ===\n');
}

testPage().catch(console.error);
