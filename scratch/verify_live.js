const http = require('http');

http.get('http://localhost:3000/blog/everest-base-camp-vs-annapurna-circuit/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status Code:', res.statusCode);
    console.log('Total HTML Response Length:', data.length);
    console.log('Dhaulagiri layout container:', data.includes('class="faq-layout-container"'));
    console.log('Dhaulagiri sidebar card:', data.includes('class="faq-sidebar-card"'));
    console.log('Category buttons count:', (data.match(/class="faq-category-btn[^"]*"/g) || []).length);
    console.log('Main panel header:', data.includes('id="faq-current-category-title"'));
    console.log('Expand All button:', data.includes('id="faq-expand-all-btn"'));
    console.log('Category panels count:', (data.match(/class="faq-category-content[^"]*"/g) || []).length);
    console.log('FAQ items count:', (data.match(/class="faq-item"/g) || []).length);
    console.log('Toggle circle count:', (data.match(/class="faq-toggle-circle"/g) || []).length);
    console.log('Image dimensions check:', data.includes('class="related-guide-thumb" width="600" height="400" loading="lazy" decoding="async"'));
    console.log('Footer headings check:', data.includes('<h3>Main Pages</h3>') && data.includes('<h3>Essential Info</h3>') && data.includes('<h3 class="footer-cta-title">') && data.includes('<h3>Social Media</h3>'));
    console.log('Buttons type="button" count:', (data.match(/<button[^>]*type="button"/gi) || []).length);
    console.log('Buttons type="submit" count:', (data.match(/<button[^>]*type="submit"/gi) || []).length);
    console.log('Buttons with missing type count:', (data.match(/<button(?![^>]*type=)[^>]*>/gi) || []).length);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
