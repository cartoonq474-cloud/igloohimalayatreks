const fs = require('fs');
const html = fs.readFileSync('tour/chitwan-national-park-safari/index.html', 'utf8');
console.log('Chitwan has #section-faqs link:', html.includes('href="#section-faqs"'));
const links = [...html.matchAll(/<a[^>]*href=["'](#[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Subnav links:', links.map(l => `${l[1]} -> ${l[2].replace(/<[^>]+>/g, '').trim()}`));
