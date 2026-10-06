const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');
const { exec } = require('child_process');

const ROOT = path.resolve(__dirname);

// Parse CLI options
const args = process.argv.slice(2);
const shouldOpen = args.includes('--open');
const disableReload = args.includes('--no-reload');
let requestedPort = parseInt(process.env.PORT, 10);
const portArgIndex = args.indexOf('--port');
if (portArgIndex !== -1 && args[portArgIndex + 1]) {
  requestedPort = parseInt(args[portArgIndex + 1], 10);
}
if (isNaN(requestedPort)) {
  requestedPort = 3000;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const COMPRESSIBLE_EXTS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.xml', '.txt']);

// Live reload client connections
const liveReloadClients = new Set();

function broadcastReload() {
  for (const client of liveReloadClients) {
    try {
      client.write('data: reload\n\n');
    } catch {
      liveReloadClients.delete(client);
    }
  }
}

// Watch directory for changes
if (!disableReload) {
  let debounceTimer = null;
  const ignoredPatterns = ['.git', 'node_modules', 'scratch', '.vscode', '.idea'];

  try {
    fs.watch(ROOT, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      for (const pattern of ignoredPatterns) {
        if (filename.startsWith(pattern) || filename.includes(path.sep + pattern)) {
          return;
        }
      }
      const ext = path.extname(filename).toLowerCase();
      if (['.html', '.css', '.js', '.json', '.svg'].includes(ext)) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          broadcastReload();
        }, 120);
      }
    });
  } catch (err) {
    // If recursive watch is not supported on some platforms, continue gracefully
  }
}

const LIVE_RELOAD_SCRIPT = `
<!-- Development Live-Reload Client -->
<script>
(() => {
  if (window.__DEV_RELOAD_INITED__) return;
  window.__DEV_RELOAD_INITED__ = true;
  let retryCount = 0;
  function connect() {
    const es = new EventSource('/__live_reload');
    es.onmessage = (event) => {
      if (event.data === 'reload') {
        window.location.reload();
      }
    };
    es.onerror = () => {
      es.close();
      retryCount++;
      const delay = Math.min(3000, 500 * Math.pow(1.5, retryCount));
      setTimeout(connect, delay);
    };
  }
  connect();
})();
</script>
`;

function resolveFilePath(reqUrl) {
  let reqPath = decodeURI(reqUrl.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  let fullPath = path.normalize(path.join(ROOT, reqPath));

  // Security: prevent path traversal attacks outside project root
  if (!fullPath.startsWith(ROOT)) {
    return null;
  }

  // Exact file match
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    return fullPath;
  }

  // Try appending .html
  if (fs.existsSync(fullPath + '.html') && fs.statSync(fullPath + '.html').isFile()) {
    return fullPath + '.html';
  }

  // Directory with index.html
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    const indexPath = path.join(fullPath, 'index.html');
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
      return indexPath;
    }
  }

  // Path might be a directory missing trailing slash
  const nestedIndexPath = path.join(fullPath, 'index.html');
  if (fs.existsSync(nestedIndexPath) && fs.statSync(nestedIndexPath).isFile()) {
    return nestedIndexPath;
  }

  return null;
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Live Reload SSE endpoint
  if (req.url === '/__live_reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Connection': 'keep-alive'
    });
    res.write('data: connected\n\n');
    liveReloadClients.add(res);

    req.on('close', () => {
      liveReloadClients.delete(res);
    });
    return;
  }

  // 301 Permanent Redirects for /trip/ and alias URLs
  const URL_REDIRECTS = {
    '/trip/annapurna-base-camp-helicopter-return-trek': '/trek/annapurna-base-camp-heli-return/',
    '/trip/annapurna-base-camp-trek-heli-return': '/trek/annapurna-base-camp-heli-return/',
    '/trek/annapurna-base-camp-helicopter-return-trek': '/trek/annapurna-base-camp-heli-return/',
    '/trek/annapurna-base-camp-helicopter-return-trek/': '/trek/annapurna-base-camp-heli-return/',
    '/trip/annapurna-base-camp-trek': '/trek/annapurna-base-camp/',
    '/trek/annapurna-base-camp-trek': '/trek/annapurna-base-camp/',
    '/trek/annapurna-base-camp/': '/trek/annapurna-base-camp/',
    '/trip/annapurna-circuit-trek': '/trek/annapurna-circuit-trek/',
    '/trip/classic-annapurna-circuit-trek': '/trek/annapurna-circuit-trek/',
    '/trip/annapurna-circuit-with-tilicho-lake': '/trek/tilicho-lake-trek/',
    '/trip/ghorepani-poon-hill-trek': '/trek/ghorepani-poon-hill-trek/',
    '/trip/ghorepani-poonhill-ghandruk-trek': '/trek/ghorepani-poon-hill-trek/',
    '/trip/mardi-himal-trek': '/trek/mardi-himal-trek/',
    '/trip/khopra-ridge-trek': '/trek/khopra-ridge-trek/',
    '/trip/panchase-trek': '/trek/panchase-trek/',
    '/trip/annapurna-scenic-trek': '/trek/panchase-trek/',
    '/trip/short-annapurna-base-camp-trek': '/trek/short-annapurna-base-camp-trek/',
    '/trip/annapurna-short-trek': '/trek/annapurna-short-trek/',
    '/trip/ghorepani-poon-hill-with-mardi-himal-trek': '/trek/ghorepani-poon-hill-with-mardi-himal-trek/',
    '/trip/abc-with-mardi-himal-trek': '/trek/abc-with-mardi-himal-trek/',
    '/trip/annapurna-luxury-trek': '/trek/annapurna-luxury-trek/',
    '/trip/annapurna-circuit-luxury-trek': '/trek/annapurna-circuit-luxury-trek/',
        // Everest & Peak Climbing /trip/ and alias redirects
    '/trip/everest-base-camp-luxury-trek': '/trek/everest-base-camp-luxury-trek/',
    '/trip/lobuche-peak-climbing-trek': '/trek/lobuche-peak-climbing/',
    '/trip/ebc-trek-with-island-peak': '/trek/island-peak-climbing/',
    '/trip/everest-base-camp-trek-road-based': '/trek/everest-base-camp-trek-without-flight/',
    '/trip/tengbuche-trek': '/trek/everest-view-trek/',
    '/trip/everest-base-camp-trek': '/trek/everest-base-camp-trek/',
    '/trip/three-high-passes-with-island-peak-climb': '/trek/three-high-passes-with-island-peak-climb/',
    '/trip/everest-view-mini-trek': '/trek/everest-view-trek/',
    '/trip/gokyo-lake-helicopter-tour': '/tour/everest-base-camp-helicopter-tour/',
    '/trip/everest-base-camp-with-cho-la-and-renjo-la-pass-trek': '/trek/everest-three-passes-trek/',
    '/trip/gokyo-lake-with-ranjo-la-pass-trek': '/trek/gokyo-lakes-trek/',
    '/trip/everest-base-camp-heli-tour': '/tour/everest-base-camp-helicopter-tour/',
    '/trip/mera-peak': '/trek/mera-peak-climbing/',
    '/trip/everest-base-camp-with-chola-pass-gokyo-trek': '/trek/everest-base-camp-via-gokyo-lakes/',
    '/trip/pikey-peak-trek': '/trek/pikey-peak-trek/',
    '/trip/everest-base-camp-trek-without-flight': '/trek/everest-base-camp-trek-without-flight/',
    '/trip/gokyo-lakes-trek': '/trek/gokyo-lakes-trek/',
    '/trip/gokyo-lakes-luxury-trek': '/trek/gokyo-lakes-luxury-trek/',
    '/trip/everest-chola-and-renjo-la-pass-trek': '/trek/everest-three-passes-trek/',
    '/trip/gokyo-lake-with-renjo-la-pass-trek': '/trek/gokyo-lakes-trek/',
    '/trip/ebc-chola-pass-gokyo-trek': '/trek/everest-base-camp-via-gokyo-lakes/',
    '/trip/everest-view-trek': '/trek/everest-view-trek/',
    '/trip/lobuche-peak-climbing': '/trek/lobuche-peak-climbing/',
    '/trip/island-peak-climbing': '/trek/island-peak-climbing/',
    '/trip/mera-peak-climbing': '/trek/mera-peak-climbing/',
    '/trip/gokyo-lake-trek-with-helicopter-return': '/trek/gokyo-lake-trek-with-helicopter-return/',
    '/trip/everest-base-camp-with-island-peak-climb': '/trek/island-peak-climbing/',
    '/trip/everest-base-camp-16-days': '/trek/everest-base-camp-trek/',
    '/trip/everest-three-passes-trek': '/trek/everest-three-passes-trek/',
    '/trip/everest-base-camp-helicopter-tour': '/tour/everest-base-camp-helicopter-tour/',
    // Direct /trek/ and /tour/ alias redirects
    '/trek/lobuche-peak-climbing-trek': '/trek/lobuche-peak-climbing/',
    '/trek/ebc-trek-with-island-peak': '/trek/island-peak-climbing/',
    '/trek/everest-base-camp-with-island-peak-climb': '/trek/island-peak-climbing/',
    '/trek/mera-peak': '/trek/mera-peak-climbing/',
    '/trek/everest-base-camp-trek-road-based': '/trek/everest-base-camp-trek-without-flight/',
    '/trek/everest-chola-and-renjo-la-pass-trek': '/trek/everest-three-passes-trek/',
    '/trek/gokyo-lake-with-renjo-la-pass-trek': '/trek/gokyo-lakes-trek/',
    '/tour/everest-base-camp-heli-tour': '/tour/everest-base-camp-helicopter-tour/',
    '/tour/gokyo-lake-helicopter-tour': '/tour/everest-base-camp-helicopter-tour/',
    // Langtang & Helambu /trip/ and alias redirects
    '/trip/tamang-heritage-trail-with-langtang-valley-trek': '/trek/tamang-heritage-trail-with-langtang-valley-trek/',
    '/trip/langtang-valley-with-gosaikunda-pass-trek': '/trek/langtang-gosaikunda-trek/',
    '/trip/langtang-valley-trek': '/trek/langtang-valley-trek/',
    '/trip/tamang-heritage-trail': '/trek/tamang-heritage-trail-trek/',
    '/trip/yala-peak-climbing': '/trek/yala-peak-climbing/',
    '/trip/langtang-gosaikunda-helambu-trek': '/trek/langtang-gosaikunda-helambu-trek/',
    '/trip/gosaikunda-trek': '/trek/gosaikunda-lake-trek/',
    '/trip/tamang-heritage-trail-langtang-valley': '/trek/tamang-heritage-trail-with-langtang-valley-trek/',
    // Direct Langtang /trek/ alias redirects
    '/trek/tamang-heritage-trail': '/trek/tamang-heritage-trail-trek/',
    '/trek/tamang-heritage-trail-langtang-valley': '/trek/tamang-heritage-trail-with-langtang-valley-trek/',
    '/trek/helambu-circuit-trek': '/trek/helambu-trek/',
    // Manaslu Region /trip/ and alias redirects
    '/trip/manaslu-circuit-trek': '/trek/manaslu-circuit-trek/',
    '/trip/manaslu-circuit-trek-12-days': '/trek/manaslu-circuit-trek-12-days/',
    '/trip/manaslu-tsum-valley-trek': '/trek/manaslu-tsum-valley-trek/',
    '/trip/tsum-valley-trek': '/trek/tsum-valley-trek/',
    '/trip/manaslu-circuit-with-tsum-valley-trek': '/trek/manaslu-tsum-valley-trek/',
    '/trek/manaslu-circuit-with-tsum-valley-trek': '/trek/manaslu-tsum-valley-trek/',
    '/trek/manaslu-circuit-with-tsum-valley-trek/': '/trek/manaslu-tsum-valley-trek/',
    // Kanchenjunga Region /trip/ and alias redirects
    '/trip/kanchenjunga-circuit-trek': '/trek/kanchenjunga-circuit-trek/',
    '/trip/kanchenjunga-trek-without-flight': '/trek/kanchenjunga-trek-without-flight/',
    '/trip/kanchenjunga-circuit-trek-nepal': '/trek/kanchenjunga-circuit-trek/',
    '/trek/kanchenjunga-circuit-trek-nepal': '/trek/kanchenjunga-circuit-trek/',
    '/trek/kanchenjunga-circuit-trek-nepal/': '/trek/kanchenjunga-circuit-trek/',
    // Mustang Region /trip/ and alias redirects
    '/trip/upper-mustang-trek': '/trek/upper-mustang-trek/',
    '/trip/upper-mustang-jeep-tour': '/trek/upper-mustang-jeep-tour/',
    '/trip/upper-mustang-tiji-festival': '/trek/upper-mustang-tiji-festival/',
    '/tour/upper-mustang-jeep-tour': '/trek/upper-mustang-jeep-tour/',
    '/tour/upper-mustang-jeep-tour/': '/trek/upper-mustang-jeep-tour/',
    // Dolpo Region /trip/ redirects
    '/trip/lower-dolpo-trek': '/trek/lower-dolpo-trek/',
    '/trip/upper-dolpo-trek': '/trek/upper-dolpo-trek/',
    // Day Tours, Cycling, Valley Hikes & Cultural /trip/ redirects
    '/trip/one-day-kathmandu-city-tour': '/tour/one-day-kathmandu-city-tour/',
    '/trip/day-cycling-tour-kathmandu': '/tour/cycling-tour-around-kathmandu-valley/',
    '/trip/cycling-tour-around-kathmandu-valley': '/tour/cycling-tour-around-kathmandu-valley/',
    '/trip/kathmandu-heritage-tour': '/tour/kathmandu-cultural-heritage-tour/',
    '/trip/jamacho-hike': '/tour/jamacho-hike/',
    '/trip/rara-lake-jeep-tour': '/tour/rara-lake-jeep-tour/',
    '/trip/honeymoon-tour-in-nepal': '/tour/honeymoon-tour-in-nepal/',
    '/trip/chisapani-nagarkot-trek': '/trek/chisapani-nagarkot-trek/',
    '/trip/chitwan-jungle-safari-tour': '/tour/chitwan-national-park-safari/',
    // Company & Policy URLs from old site
    '/about-us': '/about.html',
    '/about-us/': '/about.html',
    '/contact-us': '/contact.html',
    '/contact-us/': '/contact.html',
    '/our-teams': '/team.html',
    '/our-teams/': '/team.html',
    '/privacy-policy': '/privacy-policy.html',
    '/privacy-policy/': '/privacy-policy.html',
    '/terms-and-conditions': '/terms-and-conditions.html',
    '/terms-and-conditions/': '/terms-and-conditions.html',
    '/blog': '/blogs.html',
    '/blog/': '/blogs.html',
    '/blog-on-trekking-travelling-in-nepal': '/blogs.html',
    '/blog-on-trekking-travelling-in-nepal/': '/blogs.html',
    '/blog/everest-packing-checklist': '/blog/ultimate-everest-packing-checklist-2026/',
    '/blog/everest-packing-checklist/': '/blog/ultimate-everest-packing-checklist-2026/',
    // Travel Guides from old site
    '/travel-guide': '/nepal-travel-guide/',
    '/travel-guide/': '/nepal-travel-guide/',
    '/travel-guide/trekking-gears-list': '/equipment-checklist/',
    '/travel-guide/trekking-gears-list/': '/equipment-checklist/',
    '/travel-guide/nepal-travel-visa': '/nepal-visa/',
    '/travel-guide/nepal-travel-visa/': '/nepal-visa/',
    '/travel-guide/travel-insurance-in-nepal': '/travel-insurance/',
    '/travel-guide/travel-insurance-in-nepal/': '/travel-insurance/',
    '/travel-guide/medical-kit-for-trekking-in-nepal': '/recommended-medical-kit/',
    '/travel-guide/medical-kit-for-trekking-in-nepal/': '/recommended-medical-kit/',
    '/travel-guide/best-season-to-trek-in-nepal': '/nepal-travel-guide/',
    '/travel-guide/best-season-to-trek-in-nepal/': '/nepal-travel-guide/',
    // Regional Destinations from old site
    '/destinations': '/trekking-regions-nepal/',
    '/destinations/': '/trekking-regions-nepal/',
    '/destinations/nepal': '/nepal-trekking-packages/',
    '/destinations/nepal/': '/nepal-trekking-packages/',
    '/destinations/nepal/annapurna-region': '/annapurna-region-treks/',
    '/destinations/nepal/annapurna-region/': '/annapurna-region-treks/',
    '/destinations/nepal/dolpa-region': '/dolpo-region-treks/',
    '/destinations/nepal/dolpa-region/': '/dolpo-region-treks/',
    '/destinations/nepal/everest-region': '/everest-region-treks/',
    '/destinations/nepal/everest-region/': '/everest-region-treks/',
    '/destinations/nepal/kangchenjunga-region': '/kanchenjunga-region-treks/',
    '/destinations/nepal/kangchenjunga-region/': '/kanchenjunga-region-treks/',
    '/destinations/nepal/langtang-region': '/langtang-region-treks/',
    '/destinations/nepal/langtang-region/': '/langtang-region-treks/',
    '/destinations/nepal/manaslu-region': '/manaslu-region-treks/',
    '/destinations/nepal/manaslu-region/': '/manaslu-region-treks/',
    '/destinations/nepal/upper-mustang': '/mustang-region-treks/',
    '/destinations/nepal/upper-mustang/': '/mustang-region-treks/',
    // Activities from old site
    '/activities': '/nepal-trekking-packages/',
    '/activities/': '/nepal-trekking-packages/',
    '/activities/trekking': '/nepal-trekking-packages/',
    '/activities/trekking/': '/nepal-trekking-packages/',
    '/activities/peak-climbing': '/peak-climbing-nepal/',
    '/activities/peak-climbing/': '/peak-climbing-nepal/',
    '/activities/tour': '/nepal-tour-packages/',
    '/activities/tour/': '/nepal-tour-packages/',
    '/activities/heli-tour': '/tour/nepal-luxury-helicopter-tour/',
    '/activities/heli-tour/': '/tour/nepal-luxury-helicopter-tour/',
    '/activities/heli-service': '/tour/everest-base-camp-helicopter-tour/',
    '/activities/heli-service/': '/tour/everest-base-camp-helicopter-tour/',
    '/activities/cycling': '/tour/cycling-tour-around-kathmandu-valley/',
    '/activities/cycling/': '/tour/cycling-tour-around-kathmandu-valley/',
    '/activities/jungle-safari': '/tour/chitwan-national-park-safari/',
    '/activities/jungle-safari/': '/tour/chitwan-national-park-safari/',
    '/activities/hiking': '/tour/jamacho-hike/',
    '/activities/hiking/': '/tour/jamacho-hike/',
    '/activities/rafting': '/tour/one-day-kathmandu-city-tour/',
    '/activities/rafting/': '/tour/one-day-kathmandu-city-tour/',
  };
const cleanReqUrl = req.url.split('?')[0].replace(/\/+$/, '');
  const cleanReqUrlWithSlash = cleanReqUrl + '/';
  const targetRedirect = URL_REDIRECTS[req.url] || URL_REDIRECTS[cleanReqUrl] || URL_REDIRECTS[cleanReqUrlWithSlash];
  if (targetRedirect) {
    res.writeHead(301, { 'Location': targetRedirect });
    res.end();
    return;
  }

  const filePath = resolveFilePath(req.url);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>404 Not Found — Igloo Himalaya Treks</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
          .card { text-align: center; max-width: 500px; padding: 40px; background: #1e293b; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          h1 { font-size: 3rem; margin: 0 0 10px; color: #f97316; }
          p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; }
          a { display: inline-block; margin-top: 20px; padding: 10px 24px; background: #f97316; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
          a:hover { background: #ea580c; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The requested URL <code>${req.url}</code> could not be found on this server.</p>
          <a href="/">← Return to Homepage</a>
        </div>
      </body>
      </html>
    `);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(filePath);

  // Set smart caching headers
  if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.ico', '.woff', '.woff2'].includes(ext)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  } else if (['.css', '.js', '.mjs'].includes(ext)) {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  }

  // Video and audio partial content streaming
  const range = req.headers.range;
  if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mp3')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;

    if (start >= stat.size || end >= stat.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
      res.end();
      return;
    }

    const chunksize = end - start + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType
    });
    fileStream.pipe(res);
    return;
  }

  // Determine compression support
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const canCompress = COMPRESSIBLE_EXTS.has(ext);

  // Inject live-reload script into HTML documents
  if (ext === '.html' && !disableReload) {
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      let modified = htmlContent;
      if (modified.includes('</body>')) {
        modified = modified.replace('</body>', `${LIVE_RELOAD_SCRIPT}\n</body>`);
      } else if (modified.includes('</html>')) {
        modified = modified.replace('</html>', `${LIVE_RELOAD_SCRIPT}\n</html>`);
      } else {
        modified += LIVE_RELOAD_SCRIPT;
      }
      const buffer = Buffer.from(modified, 'utf8');

      if (acceptEncoding.includes('br')) {
        const compressed = zlib.brotliCompressSync(buffer);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'br',
          'Content-Length': compressed.length,
          'Vary': 'Accept-Encoding'
        });
        res.end(compressed);
      } else if (acceptEncoding.includes('gzip')) {
        const compressed = zlib.gzipSync(buffer);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Content-Length': compressed.length,
          'Vary': 'Accept-Encoding'
        });
        res.end(compressed);
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': buffer.length,
          'Accept-Ranges': 'bytes'
        });
        res.end(buffer);
      }
    });
    return;
  }

  // Static compressible files (CSS, JS, SVG, JSON) with Brotli/Gzip
  if (canCompress) {
    fs.readFile(filePath, (err, buffer) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      if (acceptEncoding.includes('br')) {
        const compressed = zlib.brotliCompressSync(buffer);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'br',
          'Content-Length': compressed.length,
          'Vary': 'Accept-Encoding'
        });
        res.end(compressed);
      } else if (acceptEncoding.includes('gzip')) {
        const compressed = zlib.gzipSync(buffer);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Content-Length': compressed.length,
          'Vary': 'Accept-Encoding'
        });
        res.end(compressed);
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': buffer.length,
          'Accept-Ranges': 'bytes'
        });
        res.end(buffer);
      }
    });
    return;
  }

  // Binary static file serving (images, videos, fonts)
  res.writeHead(200, {
    'Content-Length': stat.size,
    'Content-Type': contentType,
    'Accept-Ranges': 'bytes'
  });
  fs.createReadStream(filePath).pipe(res);
});

function getNetworkAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

function openBrowser(url) {
  const platform = process.platform;
  let command = '';
  if (platform === 'win32') {
    command = `start "" "${url}"`;
  } else if (platform === 'darwin') {
    command = `open "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }
  exec(command, () => {});
}

function startServer(port, attemptsLeft = 10) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      console.log(`\x1b[33mPort ${port} is in use, trying port ${port + 1}...\x1b[0m`);
      startServer(port + 1, attemptsLeft - 1);
    } else {
      console.error('\x1b[31mFailed to start server:\x1b[0m', err.message);
      process.exit(1);
    }
  });

  server.listen(port, () => {
    const networkIp = getNetworkAddress();
    const localUrl = `http://localhost:${port}/`;
    const networkUrl = networkIp ? `http://${networkIp}:${port}/` : null;

    console.log('\n\x1b[36m  🏔️  IGLOO HIMALAYA TREKS — Optimized Local Dev Server\x1b[0m\n');
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mLocal:\x1b[0m    \x1b[36m${localUrl}\x1b[0m`);
    if (networkUrl) {
      console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mNetwork:\x1b[0m  \x1b[36m${networkUrl}\x1b[0m`);
    }
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mCompression:\x1b[0m \x1b[32mBrotli + Gzip active\x1b[0m`);
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mLive Reload:\x1b[0m ${disableReload ? '\x1b[33mdisabled\x1b[0m' : '\x1b[32menabled\x1b[0m'}`);
    console.log('\n  \x1b[90mPress \x1b[1mCtrl+C\x1b[0m\x1b[90m to stop\x1b[0m\n');

    if (shouldOpen) {
      openBrowser(localUrl);
    }
  });
}

startServer(requestedPort);
