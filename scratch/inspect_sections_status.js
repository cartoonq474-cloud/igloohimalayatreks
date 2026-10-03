const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const sections = [...html.matchAll(/<section\s+id=["']([^"']+)["'][^>]*>/g)].map(m => m[1]);
console.log('Sections found in act_temp.html:', sections);

const checkIds = ['section-includes', 'section-details', 'section-altitude-profile', 'section-weather', 'section-map', 'section-faqs'];

checkIds.forEach(id => {
  const re = new RegExp('<section\\s+id=["\']' + id + '["\'][\\s\\S]*?<\\/section>', 'i');
  const m = html.match(re);
  if (m) {
    const isEbc = /lukla|namche|kala patthar|everest base camp|solukhumbu/i.test(m[0]);
    console.log(id, 'length:', m[0].length, 'contains EBC mentions:', isEbc);
  } else {
    console.log(id, 'NOT FOUND');
  }
});
