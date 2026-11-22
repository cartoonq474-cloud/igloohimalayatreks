const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    if (file === "node_modules" || file === ".git" || file === "scratch" || file === ".gemini") return;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith(".html")) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = walk(ROOT);
let totalBroken = 0;
const brokenByFile = {};

htmlFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes("mega-menu-dropdown")) return;

  const fileDir = path.dirname(filePath);
  
  const megaMatch = content.match(/<div class="mega-menu-dropdown">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/i) ||
    content.match(/<div class="mega-menu-dropdown">([\s\S]*?)<\/li>/i);
  const tourMatch = content.match(/<div class="nav-dropdown-menu tour-dropdown-menu">([\s\S]*?)<\/div>\s*<\/li>/i) ||
    content.match(/<div class="nav-dropdown-menu tour-dropdown-menu">([\s\S]*?)<\/li>/i);

  const combined = (megaMatch ? megaMatch[0] : "") + (tourMatch ? tourMatch[0] : "");

  const regex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = regex.exec(combined)) !== null) {
    const href = m[1];
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) continue;

    const resolved = path.resolve(fileDir, href.split("#")[0].split("?")[0]);
    let testPath = resolved;
    if (!fs.existsSync(testPath)) {
      if (fs.existsSync(path.join(resolved, "index.html"))) {
        testPath = path.join(resolved, "index.html");
      }
    }

    if (!fs.existsSync(testPath)) {
      totalBroken++;
      if (!brokenByFile[filePath]) brokenByFile[filePath] = [];
      brokenByFile[filePath].push({ href, resolved });
    }
  }
});

if (totalBroken === 0) {
  console.log("🎉 AUDIT PASSED 100%! All HTML files have ZERO broken links in their navigation menus!");
} else {
  console.log(`❌ Found ${totalBroken} broken links across ${Object.keys(brokenByFile).length} files:`);
  console.log(JSON.stringify(brokenByFile, null, 2));
}
