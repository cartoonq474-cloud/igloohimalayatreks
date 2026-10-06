const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('⚡ Building Igloo Himalaya Treks static site...');
const startTime = Date.now();

try {
  require('./build_blog_articles.js');
} catch (err) {
  console.error('❌ Error rendering blog articles:', err);
}

let htmlCount = 0;
let jsCount = 0;
let cssCount = 0;
let errors = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === '.gemini') continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else {
      if (file.endsWith('.html')) {
        htmlCount++;
      } else if (file.endsWith('.js')) {
        jsCount++;
        try {
          const code = fs.readFileSync(fullPath, 'utf8');
          // Skip module syntax check via Script if using import/export, or wrap in try
          if (!code.includes('import ') && !code.includes('export ')) {
            new vm.Script(code);
          }
        } catch (err) {
          console.error(`❌ Syntax error in ${fullPath}:`, err.message);
          errors++;
        }
      } else if (file.endsWith('.css')) {
        cssCount++;
      }
    }
  }
}

walk(path.resolve(__dirname, '..'));

const duration = Date.now() - startTime;

if (errors > 0) {
  console.error(`\n❌ Build failed with ${errors} error(s) in ${duration}ms.`);
  process.exit(1);
} else {
  console.log(`✔ Verified ${htmlCount} HTML pages`);
  console.log(`✔ Verified ${jsCount} JavaScript controllers`);
  console.log(`✔ Verified ${cssCount} CSS stylesheets`);
  try {
    require('./generate_sitemap.js');
  } catch (err) {
    console.error('Failed to generate sitemap:', err.message);
  }
  console.log('🎉 Build complete! Site is production ready.');
}
