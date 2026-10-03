const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'scratch') return;
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('.html')) res.push(p);
  });
  return res;
}

const htmls = walk(path.join(__dirname, '..'));
const externalScripts = new Set();
const externalStyles = new Set();
const preconnects = new Set();

htmls.forEach(h => {
  const content = fs.readFileSync(h, 'utf8');
  
  // Scripts
  const scripts = content.match(/<script[^>]+src=["']([^"']+)["']/gi) || [];
  scripts.forEach(s => {
    const src = (s.match(/src=["']([^"']+)["']/) || [])[1];
    if (src && (src.startsWith('http') || src.startsWith('//'))) {
      externalScripts.add(src);
    }
  });

  // Styles
  const styles = content.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
  styles.forEach(s => {
    const href = (s.match(/href=["']([^"']+)["']/) || [])[1];
    if (href && (href.startsWith('http') || href.startsWith('//'))) {
      externalStyles.add(href);
    }
  });

  // Preconnect
  const pre = content.match(/<link[^>]+rel=["']preconnect["'][^>]*>/gi) || [];
  pre.forEach(p => preconnects.add(p));
});

console.log('=== EXTERNAL RESOURCES AUDIT ===');
console.log('External Scripts:', Array.from(externalScripts));
console.log('External Styles:', Array.from(externalStyles));
console.log('Preconnects:', Array.from(preconnects));
