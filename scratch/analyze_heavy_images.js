const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'images');
const files = fs.readdirSync(imgDir);

const imageDetails = [];

files.forEach(f => {
  const full = path.join(imgDir, f);
  const st = fs.statSync(full);
  if (!st.isFile()) return;

  const ext = path.extname(f).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
    imageDetails.push({
      file: f,
      ext,
      sizeBytes: st.size,
      sizeKB: (st.size / 1024).toFixed(1)
    });
  }
});

imageDetails.sort((a, b) => b.sizeBytes - a.sizeBytes);

console.log('=== HEAVIEST 30 IMAGES IN /images ===');
imageDetails.slice(0, 30).forEach((img, i) => {
  console.log(`[${i + 1}] ${img.file} (${img.sizeKB} KB) [${img.ext}]`);
});

// Calculate total size by format
const formatSummary = {};
imageDetails.forEach(img => {
  if (!formatSummary[img.ext]) formatSummary[img.ext] = { count: 0, totalBytes: 0 };
  formatSummary[img.ext].count++;
  formatSummary[img.ext].totalBytes += img.sizeBytes;
});

console.log('\n=== FORMAT SUMMARY ===');
Object.entries(formatSummary).forEach(([ext, data]) => {
  console.log(`${ext}: ${data.count} files | ${(data.totalBytes / (1024 * 1024)).toFixed(2)} MB (avg ${(data.totalBytes / data.count / 1024).toFixed(1)} KB)`);
});
