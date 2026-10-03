const http = require('http');

const start = Date.now();
http.get('http://localhost:3000/', (res) => {
  let size = 0;
  res.on('data', chunk => { size += chunk.length; });
  res.on('end', () => {
    const time = Date.now() - start;
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    console.log(`Transferred: ${(size / 1024).toFixed(1)} KB in ${time} ms`);
  });
}).on('error', err => {
  console.error('Fetch error:', err.message);
});
