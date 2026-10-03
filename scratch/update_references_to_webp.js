const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const imgDir = path.join(rootDir, 'images');

function walk(dir) {
  let res = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (['node_modules', '.git', 'scratch'].includes(item)) continue;
    const full = path.join(dir, item);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      res = res.concat(walk(full));
    } else {
      res.push(full);
    }
  }
  return res;
}

function updateFileReferences(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let replacedCount = 0;

  // Regex to match images/...xxx.jpg or images/...xxx.jpeg or ../images/... or ../../images/...
  const jpgRefRegex = /(?:(\.\.\/)+|(?:\/)?)(images\/[^"'?#\s)]+)\.(jpe?g)/gi;

  content = content.replace(jpgRefRegex, (match, prefix, imgPathWithoutExt, ext) => {
    const fileNameOnly = path.basename(imgPathWithoutExt);
    const webpPath = path.join(imgDir, fileNameOnly + '.webp');
    if (fs.existsSync(webpPath)) {
      replacedCount++;
      return match.substring(0, match.length - ext.length) + 'webp';
    }
    return match;
  });

  if (replacedCount > 0 && content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return replacedCount;
}

function main() {
  console.log('=== UPDATING CODEBASE REFERENCES TO WEBP ===');
  const allFiles = walk(rootDir);
  const targetFiles = allFiles.filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.html', '.css', '.js'].includes(ext);
  });

  console.log(`Scanning ${targetFiles.length} HTML, CSS, and JS files...`);
  let totalReplacements = 0;
  let modifiedFiles = 0;

  targetFiles.forEach(f => {
    const count = updateFileReferences(f);
    if (count > 0) {
      modifiedFiles++;
      totalReplacements += count;
      const rel = path.relative(rootDir, f);
      console.log(`  - ${rel}: ${count} references updated to .webp`);
    }
  });

  console.log('\n=== REFERENCE UPDATE SUMMARY ===');
  console.log(`Total files modified: ${modifiedFiles}`);
  console.log(`Total image references updated to .webp: ${totalReplacements}`);
}

main();
