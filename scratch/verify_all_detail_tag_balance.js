const fs = require('fs');
const path = require('path');

function checkTagBalance(html) {
  const stack = [];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype']);
  const tagRegex = /<\/?([a-zA-Z0-9\-]+)(\s+[^>]*)?>/g;
  let match;
  let line = 1;
  let lastIndex = 0;
  const errors = [];

  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || voidTags.has(tagName);

    const substr = html.substring(lastIndex, match.index);
    line += (substr.match(/\n/g) || []).length;
    lastIndex = match.index;

    if (tagName.startsWith('!') || tagName === 'script' || tagName === 'style' || tagName === 'svg' || tagName === 'path' || tagName === 'polygon' || tagName === 'circle' || tagName === 'rect' || tagName === 'polyline' || tagName === 'line') {
      continue;
    }

    if (isClosing) {
      if (voidTags.has(tagName)) continue;
      if (stack.length === 0) {
        errors.push({ type: 'EXTRA_CLOSING', tag: tagName, line });
      } else {
        const top = stack.pop();
        if (top.tag !== tagName) {
          errors.push({ type: 'MISMATCH', expected: top.tag, found: tagName, line, openedAt: top.line });
        }
      }
    } else if (!isSelfClosing) {
      stack.push({ tag: tagName, line });
    }
  }

  return { errors, unclosed: stack };
}

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file === 'index.html') {
      results.push(fullPath);
    }
  });
  return results;
}

const trekFiles = getAllHtmlFiles(path.join(__dirname, '../trek'));
const tourFiles = getAllHtmlFiles(path.join(__dirname, '../tour'));
const allFiles = [...trekFiles, ...tourFiles];

let failedCount = 0;

allFiles.forEach(f => {
  const rel = path.relative(path.join(__dirname, '..'), f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');
  const res = checkTagBalance(html);
  if (res.errors.length > 0 || res.unclosed.length > 0) {
    console.error(`[TAG BALANCE ERROR] ${rel} -> errors: ${res.errors.length}, unclosed: ${res.unclosed.length}`);
    failedCount++;
  }
});

if (failedCount === 0) {
  console.log(`ALL ${allFiles.length} trek and tour pages have 100% PERFECT tag balance (0 errors, 0 unclosed tags)!`);
} else {
  console.log(`${failedCount} pages failed tag balance check.`);
}
