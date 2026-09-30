const fs = require('fs');
const path = require('path');

const rootImagesDir = path.resolve('images');

function copySubfolderImages(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file === 'images' && path.resolve(fullPath) !== rootImagesDir) {
        console.log(`Copying images from ${fullPath} to root images/...`);
        const subFiles = fs.readdirSync(fullPath);
        subFiles.forEach(sf => {
          if (sf === '.gitkeep') return;
          const srcPath = path.join(fullPath, sf);
          const destPath = path.join(rootImagesDir, sf);
          fs.copyFileSync(srcPath, destPath);
          console.log(`  Copied ${sf}`);
        });
      } else {
        copySubfolderImages(fullPath);
      }
    }
  });
}

copySubfolderImages('.');
console.log('Finished copying all subfolder images into root images/ folder.');
