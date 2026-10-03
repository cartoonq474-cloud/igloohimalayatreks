const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/tour/one-day-kathmandu-city-tour/'
];

urls.forEach(url => {
  http.get(url, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('URL:', url, 'Status:', res.statusCode, 'Bytes:', data.length);
      console.log('  Has tab-peaks:', data.includes('data-target="tab-peaks"'));
      console.log('  Has 1-Day Kathmandu link:', data.includes('tour/one-day-kathmandu-city-tour/'));
      console.log('  Has Chisapani Nagarkot link:', data.includes('trek/chisapani-nagarkot-trek/'));
      console.log('  Has tour-dropdown-menu:', data.includes('tour-dropdown-menu'));
    });
  });
});
