const fs = require('fs');
const path = require('path');

// 1. Analyze images directory
const imagesDir = path.join(__dirname, '..', 'images');
const videoDir = path.join(__dirname, '..', 'video');

function getFiles(dir) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      res = res.concat(getFiles(full));
    } else {
      res.push({ path: full, size: st.size, ext: path.extname(item).toLowerCase() });
    }
  }
  return res;
}

const allImages = getFiles(imagesDir);
const allVideos = getFiles(videoDir);

console.log('=== ASSET AUDIT ===');
console.log('Total images in /images:', allImages.length);
const totalImgBytes = allImages.reduce((sum, f) => sum + f.size, 0);
console.log('Total image size:', (totalImgBytes / (1024 * 1024)).toFixed(2), 'MB');

const imgByExt = {};
allImages.forEach(img => {
  imgByExt[img.ext] = (imgByExt[img.ext] || 0) + 1;
});
console.log('Images by format:', imgByExt);

const largeImages = allImages.filter(f => f.size > 300 * 1024).sort((a, b) => b.size - a.size);
console.log(`Images > 300KB (${largeImages.length} files):`);
largeImages.slice(0, 15).forEach(img => {
  console.log(`  - ${path.relative(path.join(__dirname, '..'), img.path)}: ${(img.size / 1024).toFixed(1)} KB`);
});

console.log('\n=== VIDEO AUDIT ===');
allVideos.forEach(v => {
  console.log(`  - ${path.relative(path.join(__dirname, '..'), v.path)}: ${(v.size / (1024 * 1024)).toFixed(2)} MB`);
});

// 2. HTML Audit for index.html
console.log('\n=== HOMEPAGE (index.html) AUDIT ===');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
console.log('HTML size:', (Buffer.byteLength(indexHtml, 'utf8') / 1024).toFixed(1), 'KB');
console.log('HTML line count:', indexHtml.split('\n').length);

// Count tags
const imgTags = indexHtml.match(/<img[^>]*>/gi) || [];
console.log('Total <img> tags in index.html:', imgTags.length);

let imgWithoutLazy = 0;
let imgWithoutDims = 0;
let imgWithoutAsyncDecoding = 0;

imgTags.forEach(t => {
  if (!t.includes('loading="lazy"') && !t.includes("loading='lazy'")) {
    imgWithoutLazy++;
  }
  if (!t.includes('width=') || !t.includes('height=')) {
    imgWithoutDims++;
  }
  if (!t.includes('decoding="async"') && !t.includes("decoding='async'")) {
    imgWithoutAsyncDecoding++;
  }
});
console.log(`  - <img> missing loading="lazy": ${imgWithoutLazy} / ${imgTags.length}`);
console.log(`  - <img> missing width or height (CLS risk): ${imgWithoutDims} / ${imgTags.length}`);
console.log(`  - <img> missing decoding="async": ${imgWithoutAsyncDecoding} / ${imgTags.length}`);

// SVGs
const svgTags = indexHtml.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];
console.log('Total inline <svg> tags in index.html:', svgTags.length);
const totalSvgBytes = svgTags.reduce((sum, s) => sum + Buffer.byteLength(s, 'utf8'), 0);
console.log('Total inline SVG byte size:', (totalSvgBytes / 1024).toFixed(1), 'KB');

// Scripts
const scriptTags = indexHtml.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
console.log('Total <script> tags in index.html:', scriptTags.length);
scriptTags.forEach((s, idx) => {
  const srcMatch = s.match(/src=["']([^"']+)["']/i);
  const typeMatch = s.match(/type=["']([^"']+)["']/i);
  const isDefer = s.includes('defer');
  const isAsync = s.includes('async');
  if (srcMatch) {
    console.log(`  [Script ${idx+1}] src: ${srcMatch[1]}, type: ${typeMatch ? typeMatch[1] : 'text/javascript'}, defer: ${isDefer}, async: ${isAsync}`);
  } else {
    console.log(`  [Script ${idx+1}] inline script (${Buffer.byteLength(s, 'utf8')} bytes), type: ${typeMatch ? typeMatch[1] : 'text/javascript'}`);
  }
});

// CSS Link tags
const cssLinks = indexHtml.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
console.log('Stylesheet links:', cssLinks);

// 3. CSS Audit
console.log('\n=== CSS AUDIT (index.css) ===');
const cssPath = path.join(__dirname, '..', 'index.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');
console.log('index.css size:', (Buffer.byteLength(cssContent, 'utf8') / 1024).toFixed(1), 'KB');
console.log('index.css line count:', cssContent.split('\n').length);
const fontImports = cssContent.match(/@import\s+url\([^)]+\);?/gi) || [];
console.log('@import rules in CSS:', fontImports);

// 4. Trek Pages Overview
console.log('\n=== TREK PAGES OVERVIEW ===');
const trekDir = path.join(__dirname, '..', 'trek');
if (fs.existsSync(trekDir)) {
  const treks = fs.readdirSync(trekDir);
  let totalTrekHtmlBytes = 0;
  treks.forEach(t => {
    const p = path.join(trekDir, t, 'index.html');
    if (fs.existsSync(p)) {
      const sz = fs.statSync(p).size;
      totalTrekHtmlBytes += sz;
    }
  });
  console.log(`Total trek subdirectories: ${treks.length}`);
  console.log(`Total HTML size for all trek pages: ${(totalTrekHtmlBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Average trek page HTML size: ${(totalTrekHtmlBytes / (treks.length * 1024)).toFixed(1)} KB`);
}
