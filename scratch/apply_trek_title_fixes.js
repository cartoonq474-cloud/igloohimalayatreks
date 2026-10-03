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

const fixes = [
  { folder: 'annapurna-base-camp-heli-return', title: 'Annapurna Base Camp Trek with Helicopter Return' },
  { folder: 'annapurna-circuit-luxury-trek', title: 'Annapurna Circuit Luxury Trek' },
  { folder: 'annapurna-luxury-trek', title: 'Annapurna Luxury Lodge Trek' },
  { folder: 'annapurna-short-trek', title: 'Annapurna Short Trek' },
  { folder: 'chisapani-nagarkot-trek', title: 'Chisapani Nagarkot Trek' },
  { folder: 'everest-base-camp-luxury-trek', title: 'Everest Base Camp Luxury Lodge Trek' },
  { folder: 'everest-base-camp-trek-without-flight', title: 'Everest Base Camp Trek Without Flight (Road-Based)' },
  { folder: 'gokyo-lake-trek-with-helicopter-return', title: 'Gokyo Lake Trek with Helicopter Return' },
  { folder: 'gokyo-lakes-luxury-trek', title: 'Gokyo Lakes Luxury Lodge Trek' },
  { folder: 'island-peak-climbing', title: 'Island Peak Climbing with Everest Base Camp (6,189m)' },
  { folder: 'kanchenjunga-base-camp-trek', title: 'Kanchenjunga Base Camp Trek' },
  { folder: 'kanchenjunga-circuit-trek', title: 'Kanchenjunga Circuit Trek' },
  { folder: 'kanchenjunga-trek-without-flight', title: 'Kanchenjunga Trek Without Flight (Road-Based 24 Days)' },
  { folder: 'langtang-gosaikunda-helambu-trek', title: 'Langtang Gosaikunda Helambu Trek' },
  { folder: 'lobuche-peak-climbing', title: 'Lobuche East Peak Climbing with Everest Base Camp (6,119m)' },
  { folder: 'lower-dolpo-trek', title: 'Lower Dolpo Trek' },
  { folder: 'manaslu-circuit-trek-12-days', title: 'Manaslu Circuit Trek 12 Days' },
  { folder: 'mera-peak-climbing', title: 'Mera Peak Climbing Expedition (6,476m)' },
  { folder: 'short-annapurna-base-camp-trek', title: 'Short Annapurna Base Camp Trek' },
  { folder: 'tamang-heritage-trail-with-langtang-valley-trek', title: 'Tamang Heritage Trail with Langtang Valley Trek' },
  { folder: 'three-high-passes-with-island-peak-climb', title: 'Three High Passes with Island Peak Climb' },
  { folder: 'upper-dolpo-trek', title: 'Upper Dolpo Trek' },
  { folder: 'upper-mustang-jeep-tour', title: 'Upper Mustang Jeep Tour' },
  { folder: 'upper-mustang-tiji-festival', title: 'Upper Mustang Tiji Festival Trek' },
  { folder: 'yala-peak-climbing', title: 'Yala Peak Climbing' }
];

fixes.forEach(item => {
  const filePath = path.join(__dirname, '../trek', item.folder, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace H2
  // Match <h2 class="faq-section-accent-title">\s*<span class="faq-accent-bar"></span>\s*Frequently Asked Questions for [^<]+</h2>
  const newH2 = `<h2 class="faq-section-accent-title">\n              <span class="faq-accent-bar"></span>\n              Frequently Asked Questions for ${item.title}\n            </h2>`;
  
  html = html.replace(/<h2[^>]*class=["']faq-section-accent-title["'][^>]*>[\s\S]*?Frequently Asked Questions for[\s\S]*?<\/h2>/i, newH2);

  // Replace permit question if it mentions Mardi Himal or Everest Base Camp
  html = html.replace(/<span>What permits are required for Mardi Himal Trek\?<\/span>/g, `<span>What permits are required for ${item.title}?</span>`);
  html = html.replace(/<span>What permits are required for Everest Base Camp Trek\?<\/span>/g, `<span>What permits are required for ${item.title}?</span>`);

  const balance = checkTagBalance(html);
  if (balance.errors.length > 0 || balance.unclosed.length > 0) {
    console.error(`ERROR: Tag balance issue in ${item.folder}:`, balance.errors, balance.unclosed);
    return;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${item.folder} -> Frequently Asked Questions for ${item.title}`);
});

console.log('\nAll 25 trek FAQ titles and permit questions successfully updated.');
