const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../trek/kanchenjunga-circuit-trek/index.html'), 'utf8');

// 1. Overview text before rich-highlights
const overviewMatch = html.match(/<section id=["']section-overview["'][\s\S]*?<\/section>/i) || 
                      html.match(/<div class=["']trek-overview["'][\s\S]*?<\/div>/i) ||
                      html.match(/<h2 class=["']trek-section-title["'][^>]*>Overview[\s\S]*?(?=<div class="rich-highlights)/i);

console.log('--- Overview snippet ---');
console.log(overviewMatch ? overviewMatch[0].slice(0, 500) : 'Not found');

// 2. Sidebar booking widget
const sidebarMatch = html.match(/<div class=["']booking-sidebar[\s\S]*?<\/div>\s*<\/aside>/i) ||
                     html.match(/<div class=["']trek-sidebar["'][\s\S]*?<\/aside>/i) ||
                     html.match(/<div class=["']quick-booking-card["'][\s\S]*?<\/div>/i);
console.log('\n--- Sidebar snippet ---');
console.log(sidebarMatch ? sidebarMatch[0].slice(0, 500) : 'Not found');

// 3. Dates & Availability heading
const datesMatch = html.match(/Booking Dates & Availability[^<]*/i);
console.log('\n--- Dates heading ---');
console.log(datesMatch ? datesMatch[0] : 'Not found');

// 4. Region occurrences
const regionOccurrences = [...html.matchAll(/Region[\s\S]{0,100}/gi)].map(m => m[0]);
console.log('\n--- Region occurrences (first 5) ---');
console.log(regionOccurrences.slice(0, 5));
