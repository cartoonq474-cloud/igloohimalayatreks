const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('images');
console.log(`Total images in images/: ${files.length}`);

// Categorize images by keywords
const categories = {
  logo: [],
  everest: [],
  annapurna: [],
  langtang: [],
  manaslu: [],
  mustang: [],
  kanchenjunga: [],
  dolpo: [],
  gokyo: [],
  mardi: [],
  chitwan: [],
  kathmandu: [],
  pokhara: [],
  safari: [],
  tour: [],
  peak_climbing: [],
  team_guide_user: [],
  hero_bg: [],
  gallery: [],
  destination: [],
  blog: [],
  food: [],
  festival: [],
  map: []
};

files.forEach(f => {
  const lower = f.toLowerCase();
  if (lower.includes('logo') || lower.includes('brand') || lower.includes('icon') || lower.includes('asset')) categories.logo.push(f);
  if (lower.includes('everest') || lower.includes('ebc')) categories.everest.push(f);
  if (lower.includes('annapurna') || lower.includes('abc')) categories.annapurna.push(f);
  if (lower.includes('langtang')) categories.langtang.push(f);
  if (lower.includes('manaslu')) categories.manaslu.push(f);
  if (lower.includes('mustang')) categories.mustang.push(f);
  if (lower.includes('kanchenjunga')) categories.kanchenjunga.push(f);
  if (lower.includes('dolpo')) categories.dolpo.push(f);
  if (lower.includes('gokyo')) categories.gokyo.push(f);
  if (lower.includes('mardi')) categories.mardi.push(f);
  if (lower.includes('chitwan')) categories.chitwan.push(f);
  if (lower.includes('kathmandu')) categories.kathmandu.push(f);
  if (lower.includes('pokhara')) categories.pokhara.push(f);
  if (lower.includes('safari')) categories.safari.push(f);
  if (lower.includes('tour')) categories.tour.push(f);
  if (lower.includes('peak') || lower.includes('climbing') || lower.includes('island') || lower.includes('mera') || lower.includes('yala') || lower.includes('lobuche')) categories.peak_climbing.push(f);
  if (lower.includes('team') || lower.includes('guide') || lower.includes('user') || lower.includes('client') || lower.includes('rep') || lower.includes('representative') || lower.includes('avatar')) categories.team_guide_user.push(f);
  if (lower.includes('hero') || lower.includes('bg') || lower.includes('banner')) categories.hero_bg.push(f);
  if (lower.includes('gallery')) categories.gallery.push(f);
  if (lower.includes('destination')) categories.destination.push(f);
  if (lower.includes('blog')) categories.blog.push(f);
  if (lower.includes('food') || lower.includes('dal-bhat') || lower.includes('eating')) categories.food.push(f);
  if (lower.includes('festival') || lower.includes('dashain') || lower.includes('gai-jatra') || lower.includes('tiji')) categories.festival.push(f);
  if (lower.includes('map')) categories.map.push(f);
});

console.log('Category Counts:');
for (const [k, v] of Object.entries(categories)) {
  console.log(`  ${k}: ${v.length} images`);
}

console.log('\n--- Logo candidates ---');
console.log(categories.logo);

console.log('\n--- Team/Guide/User candidates ---');
console.log(categories.team_guide_user);

console.log('\n--- Hero/BG candidates ---');
console.log(categories.hero_bg);

console.log('\n--- Gallery candidates ---');
console.log(categories.gallery);

console.log('\n--- Destination candidates ---');
console.log(categories.destination);

console.log('\n--- Map candidates ---');
console.log(categories.map);
