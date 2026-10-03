const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Rules for dimensions & loading
function getImgAttributes(fullTag, src) {
  let width = null;
  let height = null;
  let loading = 'lazy';
  let fetchpriority = null;

  // 1. Logo
  if (src.includes('logo.png')) {
    width = 85;
    height = 70;
    loading = 'eager';
    fetchpriority = 'high';
  }
  // 2. Hero client avatars
  else if (src.includes('clients-home-') || src.includes('avatar-brenna.png')) {
    width = 36;
    height = 36;
    loading = 'lazy';
  }
  // 3. Skyline mountain graphic
  else if (src.includes('himalayan-peaks-skyline-exact.png')) {
    width = 1200;
    height = 180;
    loading = 'lazy';
  }
  // 4. Region destination cards
  else if (fullTag.includes('dest-card-img') || fullTag.includes('dest-package-card')) {
    width = 328;
    height = 220;
    loading = 'lazy';
  }
  // 5. Activity cards (.act-card-img)
  else if (fullTag.includes('act-card-img') || fullTag.includes('act-pack-card')) {
    width = 380;
    height = 240;
    loading = 'lazy';
  }
  // 6. Exotic trek cards & carousel items
  else if (fullTag.includes('exotic-trek-card') || fullTag.includes('exotic-img-wrapper') || fullTag.includes('peak-pack-card') || fullTag.includes('tour-pack-card')) {
    width = 380;
    height = 240;
    loading = 'lazy';
  }
  // 7. Video avatars & review avatars
  else if (fullTag.includes('video-avatar') || src.includes('avatar-sagar.png') || src.includes('video-thumb-chad.png')) {
    width = 44;
    height = 44;
    loading = 'lazy';
  }
  // 8. Founder / specialist avatars
  else if (fullTag.includes('founder-avatar-img') || src.includes('sonam-dorji-sherpa')) {
    width = 96;
    height = 96;
    loading = 'lazy';
  }
  else if (fullTag.includes('support-avatar-img') || src.includes('elise-yuan')) {
    width = 72;
    height = 72;
    loading = 'lazy';
  }
  // 9. Laptop screen mockup
  else if (fullTag.includes('laptop-screen-img') || src.includes('destinations-igloo')) {
    width = 640;
    height = 380;
    loading = 'lazy';
  }
  // Default fallback for any other trek/tour card images
  else {
    width = 380;
    height = 240;
    loading = 'lazy';
  }

  return { width, height, loading, fetchpriority };
}

let modifiedCount = 0;
const newHtml = html.replace(/<img\s+([^>]+)>/gi, (match, attrs) => {
  const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
  if (!srcMatch) return match;
  const src = srcMatch[1];

  const config = getImgAttributes(match, src);

  let updatedAttrs = attrs;

  // Width & Height
  if (!updatedAttrs.includes('width=') && config.width) {
    updatedAttrs += ` width="${config.width}"`;
  }
  if (!updatedAttrs.includes('height=') && config.height) {
    updatedAttrs += ` height="${config.height}"`;
  }

  // Loading
  if (!updatedAttrs.includes('loading=')) {
    updatedAttrs += ` loading="${config.loading}"`;
  }

  // Decoding
  if (!updatedAttrs.includes('decoding=')) {
    updatedAttrs += ` decoding="async"`;
  }

  // Fetchpriority
  if (config.fetchpriority && !updatedAttrs.includes('fetchpriority=')) {
    updatedAttrs += ` fetchpriority="${config.fetchpriority}"`;
  }

  modifiedCount++;
  return `<img ${updatedAttrs}>`;
});

fs.writeFileSync(indexPath, newHtml, 'utf8');
console.log(`Updated ${modifiedCount} <img> tags on index.html with explicit dimensions and async decoding!`);
