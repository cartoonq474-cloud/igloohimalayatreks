const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Process all HTML files for global link / phone / address replacements
function walkHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === '.gemini') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allHtml = walkHtmlFiles(ROOT_DIR);
console.log(`Found ${allHtml.length} HTML files to process.`);

let globalReplacementsCount = 0;

for (const filePath of allHtml) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace WhatsApp links
  content = content.replace(/https:\/\/wa\.me\/9779800000000/g, 'https://wa.me/9779860843980');

  // Replace footer generic LinkedIn links
  content = content.replace(/href=["']https:\/\/linkedin\.com\/?["']/g, 'href="https://www.linkedin.com/in/igloo-himalaya-treks-268269433/"');
  content = content.replace(/href=["']https:\/\/www\.linkedin\.com\/?["']/g, 'href="https://www.linkedin.com/in/igloo-himalaya-treks-268269433/"');

  // Replace old placeholder phone in text
  content = content.replace(/\+977-9800000000/g, '+977 9860843980');
  content = content.replace(/\+977 980 000 0000/g, '+977 9860843980');
  content = content.replace(/\+977 9800000000/g, '+977 9860843980');

  // Replace old addresses if present
  content = content.replace(/Chaksibari Marg, Thamel, Ward-26<br>\s*Kathmandu 44600, Nepal/g, 'Aja Swan Marg, Geetanjali Chowk, Ward 16<br>Kathmandu, Nepal');
  content = content.replace(/Paknajol Marg, Thamel-16, Kathmandu, Nepal/g, 'Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu, Nepal');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    globalReplacementsCount++;
  }
}

console.log(`Global link & contact updates applied to ${globalReplacementsCount} files.`);
