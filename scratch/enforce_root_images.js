const fs = require('fs');
const path = require('path');

const rootImagesDir = path.resolve('images');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(findHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const htmlFiles = findHtmlFiles('.');

let totalReplacements = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Determine prefix to root images directory based on file depth
  // Normalized relative path from root
  const rel = path.relative('.', filePath);
  const segments = rel.split(path.sep);
  let prefixToImages = 'images/';
  if (segments.length === 2) {
    prefixToImages = '../images/';
  } else if (segments.length >= 3) {
    prefixToImages = '../../images/';
  }

  // 1. Replace any references pointing to subfolder /images/
  // Patterns like:
  // (../)*([a-zA-Z0-9_-]+)/images/(.*?\.(jpg|jpeg|png|webp|avif|gif))
  // e.g. annapurna-region-treks/images/annapurna-destination card image.webp
  // ../annapurna-region-treks/images/annapurna-destination card image.webp
  // ../trek/everest-base-camp-trek/images/Everest Base Camp Trek.jpg
  // trek/everest-base-camp-trek/images/Everest Base Camp Trek.jpg
  
  // Specific known subfolder patterns:
  const subfolderPatterns = [
    // 2 levels of parent navigation to subfolder images
    /(\.\.\/)+trek\/[^\/]+\/images\/([^"'>)\s]+)/gi,
    /(\.\.\/)+[a-zA-Z0-9_-]+-treks\/images\/([^"'>)\s]+)/gi,
    /(\.\.\/)+[a-zA-Z0-9_-]+-packages\/images\/([^"'>)\s]+)/gi,
    /(\.\.\/)+tour\/[^\/]+\/images\/([^"'>)\s]+)/gi,
    
    // 1 level / root to subfolder images
    /trek\/[^\/]+\/images\/([^"'>)\s]+)/gi,
    /[a-zA-Z0-9_-]+-region-treks\/images\/([^"'>)\s]+)/gi,
    /[a-zA-Z0-9_-]+-packages\/images\/([^"'>)\s]+)/gi,
    /tour\/[^\/]+\/images\/([^"'>)\s]+)/gi,
    /team\/images\/([^"'>)\s]+)/gi
  ];

  subfolderPatterns.forEach(pattern => {
    content = content.replace(pattern, (match, p1, p2) => {
      const filename = p2 || p1; // depending on capture group
      return `${prefixToImages}${filename}`;
    });
  });

  // 2. In files inside subdirectories, handle local relative images/ references that were meant for their local subfolder
  // If the file is in e.g. annapurna-region-treks/index.html and has <img src="images/..."
  // It should be ../images/...
  if (segments.length === 2) {
    // replace any src="images/ with src="../images/
    content = content.replace(/(src=["'])images\/([^"']+)(["'])/gi, '$1../images/$2$3');
    content = content.replace(/(url\(['"]?)images\/([^"')]+)(['"]?\))/gi, '$1../images/$2$3');
  } else if (segments.length >= 3) {
    // If in trek/everest-base-camp-trek/index.html and has src="images/ or src="../images/
    content = content.replace(/(src=["'])images\/([^"']+)(["'])/gi, '$1../../images/$2$3');
    content = content.replace(/(src=["'])\.\.\/images\/([^"']+)(["'])/gi, '$1../../images/$2$3');
    content = content.replace(/(url\(['"]?)images\/([^"')]+)(['"]?\))/gi, '$1../../images/$2$3');
    content = content.replace(/(url\(['"]?)\.\.\/images\/([^"')]+)(['"]?\))/gi, '$1../../images/$2$3');
  }

  // 3. In root files, any ../images/ should be images/
  if (segments.length === 1) {
    content = content.replace(/(src=["'])\.\.\/images\/([^"']+)(["'])/gi, '$1images/$2$3');
    content = content.replace(/(url\(['"]?)\.\.\/images\/([^"')]+)(['"]?\))/gi, '$1images/$2$3');
  }

  // 4. Any remaining Unsplash in this file
  if (content.includes('images.unsplash.com')) {
    content = content.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, `${prefixToImages}hero-himalayas.jpg`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements++;
    console.log(`Updated image paths in: ${filePath}`);
  }
});

console.log(`Updated ${totalReplacements} HTML files to use ONLY root images/ folder!`);
