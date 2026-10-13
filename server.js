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

  // Canonical URL normalization: redirect any URL with consecutive slashes
  const [urlPath, queryString] = req.url.split('?');
  if (/\/{2,}/.test(urlPath)) {
    const cleanPath = urlPath.replace(/\/{2,}/g, '/');
    const target = queryString !== undefined ? `${cleanPath}?${queryString}` : cleanPath;
    res.writeHead(301, { 'Location': target });
    res.end();
    return;
  }

  // 301 Permanent Redirects for /trip/ and alias URLs
  const URL_REDIRECTS = {
    '/xmlrpc.php/': '/blogs.html',
    '/xmlrpc.php': '/blogs.html',
    '/blog/xmlrpc.php/': '/blogs.html',
    '/blog/xmlrpc.php': '/blogs.html',
    '/wp-travel-dashboard/': '/blogs.html',
    '/wp-travel-dashboard': '/blogs.html',
    '/blog/wp-travel-dashboard/': '/blogs.html',
    '/blog/wp-travel-dashboard': '/blogs.html',
    '/wp-travel-checkout/': '/blogs.html',
    '/wp-travel-checkout': '/blogs.html',
    '/blog/wp-travel-checkout/': '/blogs.html',
    '/blog/wp-travel-checkout': '/blogs.html',
    '/everest-chola-and-renjo-la-pass-trek': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/everest-chola-and-renjo-la-pass-trek/': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/trip/everest-chola-and-renjo-la-pass-trek': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/trip/everest-chola-and-renjo-la-pass-trek/': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/trip/everest-base-camp-with-cho-la-and-renjo-la-pass-trek': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/trip/everest-base-camp-with-cho-la-and-renjo-la-pass-trek/': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/wp-json/wp/v2/pages/3381/': '/blogs.html',
    '/wp-json/wp/v2/pages/3381': '/blogs.html',
    '/blog/wp-json/wp/v2/pages/3381/': '/blogs.html',
    '/blog/wp-json/wp/v2/pages/3381': '/blogs.html',
    '/wp-json/oembed/1.0/embed/': '/blogs.html',
    '/wp-json/oembed/1.0/embed': '/blogs.html',
    '/blog/wp-json/oembed/1.0/embed/': '/blogs.html',
    '/blog/wp-json/oembed/1.0/embed': '/blogs.html',
    '/wp-json/': '/blogs.html',
    '/wp-json': '/blogs.html',
    '/blog/wp-json/': '/blogs.html',
    '/blog/wp-json': '/blogs.html',
    '/what-your-first-day-in-nepal-really-feels-like/': '/blogs.html',
    '/what-your-first-day-in-nepal-really-feels-like': '/blogs.html',
    '/blog/what-your-first-day-in-nepal-really-feels-like/': '/blogs.html',
    '/blog/what-your-first-day-in-nepal-really-feels-like': '/blogs.html',
    '/what-you-will-experience-during-the-everest-base-camp-trek/': '/everest-region-treks/',
    '/what-you-will-experience-during-the-everest-base-camp-trek': '/everest-region-treks/',
    '/blog/what-you-will-experience-during-the-everest-base-camp-trek/': '/everest-region-treks/',
    '/blog/what-you-will-experience-during-the-everest-base-camp-trek': '/everest-region-treks/',
    '/what-nobody-tells-you-about-trekking-to-everest-base-camp/': '/everest-region-treks/',
    '/what-nobody-tells-you-about-trekking-to-everest-base-camp': '/everest-region-treks/',
    '/blog/what-nobody-tells-you-about-trekking-to-everest-base-camp/': '/everest-region-treks/',
    '/blog/what-nobody-tells-you-about-trekking-to-everest-base-camp': '/everest-region-treks/',
    '/what-nobody-tells-you-about-annapurna-base-camp-trek/': '/annapurna-region-treks/',
    '/what-nobody-tells-you-about-annapurna-base-camp-trek': '/annapurna-region-treks/',
    '/blog/what-nobody-tells-you-about-annapurna-base-camp-trek/': '/annapurna-region-treks/',
    '/blog/what-nobody-tells-you-about-annapurna-base-camp-trek': '/annapurna-region-treks/',
    '/what-is-the-mardi-himal-trek/': '/annapurna-region-treks/',
    '/what-is-the-mardi-himal-trek': '/annapurna-region-treks/',
    '/blog/what-is-the-mardi-himal-trek/': '/annapurna-region-treks/',
    '/blog/what-is-the-mardi-himal-trek': '/annapurna-region-treks/',
    '/what-is-nepal-known-for/': '/blogs.html',
    '/what-is-nepal-known-for': '/blogs.html',
    '/blog/what-is-nepal-known-for/': '/blogs.html',
    '/blog/what-is-nepal-known-for': '/blogs.html',
    '/what-is-nepal-famous-for-explore/': '/blogs.html',
    '/what-is-nepal-famous-for-explore': '/blogs.html',
    '/blog/what-is-nepal-famous-for-explore/': '/blogs.html',
    '/blog/what-is-nepal-famous-for-explore': '/blogs.html',
    '/trips/': '/blogs.html',
    '/trips': '/blogs.html',
    '/blog/trips/': '/blogs.html',
    '/blog/trips': '/blogs.html',
    '/trip/page/5/': '/blogs.html',
    '/trip/page/5': '/blogs.html',
    '/blog/trip/page/5/': '/blogs.html',
    '/blog/trip/page/5': '/blogs.html',
    '/trip/page/4/': '/blogs.html',
    '/trip/page/4': '/blogs.html',
    '/blog/trip/page/4/': '/blogs.html',
    '/blog/trip/page/4': '/blogs.html',
    '/trip/page/3/': '/blogs.html',
    '/trip/page/3': '/blogs.html',
    '/blog/trip/page/3/': '/blogs.html',
    '/blog/trip/page/3': '/blogs.html',
    '/trip/page/2/': '/blogs.html',
    '/trip/page/2': '/blogs.html',
    '/blog/trip/page/2/': '/blogs.html',
    '/blog/trip/page/2': '/blogs.html',
    '/trip/nine-nights-bhutan-tour-from-nepal/': '/blogs.html',
    '/trip/nine-nights-bhutan-tour-from-nepal': '/blogs.html',
    '/blog/trip/nine-nights-bhutan-tour-from-nepal/': '/blogs.html',
    '/blog/trip/nine-nights-bhutan-tour-from-nepal': '/blogs.html',
    '/trip/kailash-mansarovar-yatra/': '/blogs.html',
    '/trip/kailash-mansarovar-yatra': '/blogs.html',
    '/blog/trip/kailash-mansarovar-yatra/': '/blogs.html',
    '/blog/trip/kailash-mansarovar-yatra': '/blogs.html',
    '/trip/everest-base-camp-trek-16-days/': '/trek/everest-base-camp-trek-16-days/',
    '/trip/everest-base-camp-trek-16-days': '/trek/everest-base-camp-trek-16-days/',
    '/blog/trip/everest-base-camp-trek-16-days/': '/trek/everest-base-camp-trek-16-days/',
    '/blog/trip/everest-base-camp-trek-16-days': '/trek/everest-base-camp-trek-16-days/',
    '/trip/9-nights-bhutan-tour/': '/blogs.html',
    '/trip/9-nights-bhutan-tour': '/blogs.html',
    '/blog/trip/9-nights-bhutan-tour/': '/blogs.html',
    '/blog/trip/9-nights-bhutan-tour': '/blogs.html',
    '/trip/': '/blogs.html',
    '/trip': '/blogs.html',
    '/blog/trip/': '/blogs.html',
    '/blog/trip': '/blogs.html',
    '/trip-types/weekend-trips/': '/blogs.html',
    '/trip-types/weekend-trips': '/blogs.html',
    '/blog/trip-types/weekend-trips/': '/blogs.html',
    '/blog/trip-types/weekend-trips': '/blogs.html',
    '/trip-types/nature-walk/': '/blogs.html',
    '/trip-types/nature-walk': '/blogs.html',
    '/blog/trip-types/nature-walk/': '/blogs.html',
    '/blog/trip-types/nature-walk': '/blogs.html',
    '/trip-types/nature-friendly/': '/blogs.html',
    '/trip-types/nature-friendly': '/blogs.html',
    '/blog/trip-types/nature-friendly/': '/blogs.html',
    '/blog/trip-types/nature-friendly': '/blogs.html',
    '/trip-types/high-altitude/page/3/': '/blogs.html',
    '/trip-types/high-altitude/page/3': '/blogs.html',
    '/blog/trip-types/high-altitude/page/3/': '/blogs.html',
    '/blog/trip-types/high-altitude/page/3': '/blogs.html',
    '/trip-types/high-altitude/page/2/': '/blogs.html',
    '/trip-types/high-altitude/page/2': '/blogs.html',
    '/blog/trip-types/high-altitude/page/2/': '/blogs.html',
    '/blog/trip-types/high-altitude/page/2': '/blogs.html',
    '/trip-types/high-altitude/': '/blogs.html',
    '/trip-types/high-altitude': '/blogs.html',
    '/blog/trip-types/high-altitude/': '/blogs.html',
    '/blog/trip-types/high-altitude': '/blogs.html',
    '/trip-types/cultural/': '/blogs.html',
    '/trip-types/cultural': '/blogs.html',
    '/blog/trip-types/cultural/': '/blogs.html',
    '/blog/trip-types/cultural': '/blogs.html',
    '/trip-types/child-friendly/': '/blogs.html',
    '/trip-types/child-friendly': '/blogs.html',
    '/blog/trip-types/child-friendly/': '/blogs.html',
    '/blog/trip-types/child-friendly': '/blogs.html',
    '/trip-types/budget-travel/': '/blogs.html',
    '/trip-types/budget-travel': '/blogs.html',
    '/blog/trip-types/budget-travel/': '/blogs.html',
    '/blog/trip-types/budget-travel': '/blogs.html',
    '/trip-sitemap.xml/': '/blogs.html',
    '/trip-sitemap.xml': '/blogs.html',
    '/blog/trip-sitemap.xml/': '/blogs.html',
    '/blog/trip-sitemap.xml': '/blogs.html',
    '/trekking-the-classic-annapurna-circuit/': '/annapurna-region-treks/',
    '/trekking-the-classic-annapurna-circuit': '/annapurna-region-treks/',
    '/blog/trekking-the-classic-annapurna-circuit/': '/annapurna-region-treks/',
    '/blog/trekking-the-classic-annapurna-circuit': '/annapurna-region-treks/',
    '/trekking-in-nepal-what-nobody-tells-you/': '/blogs.html',
    '/trekking-in-nepal-what-nobody-tells-you': '/blogs.html',
    '/blog/trekking-in-nepal-what-nobody-tells-you/': '/blogs.html',
    '/blog/trekking-in-nepal-what-nobody-tells-you': '/blogs.html',
    '/travel-guide-sitemap.xml/': '/blogs.html',
    '/travel-guide-sitemap.xml': '/blogs.html',
    '/blog/travel-guide-sitemap.xml/': '/blogs.html',
    '/blog/travel-guide-sitemap.xml': '/blogs.html',
    '/thorong-la-pass-guide/': '/annapurna-region-treks/',
    '/thorong-la-pass-guide': '/annapurna-region-treks/',
    '/blog/thorong-la-pass-guide/': '/annapurna-region-treks/',
    '/blog/thorong-la-pass-guide': '/annapurna-region-treks/',
    '/thank-you/': '/blogs.html',
    '/thank-you': '/blogs.html',
    '/blog/thank-you/': '/blogs.html',
    '/blog/thank-you': '/blogs.html',
    '/suspension-bridges-along-the-everest-base-camp-trail/': '/everest-region-treks/',
    '/suspension-bridges-along-the-everest-base-camp-trail': '/everest-region-treks/',
    '/blog/suspension-bridges-along-the-everest-base-camp-trail/': '/everest-region-treks/',
    '/blog/suspension-bridges-along-the-everest-base-camp-trail': '/everest-region-treks/',
    '/shinta-mani-mustang/': '/mustang-region-treks/',
    '/shinta-mani-mustang': '/mustang-region-treks/',
    '/blog/shinta-mani-mustang/': '/mustang-region-treks/',
    '/blog/shinta-mani-mustang': '/mustang-region-treks/',
    '/post-sitemap.xml/': '/blogs.html',
    '/post-sitemap.xml': '/blogs.html',
    '/blog/post-sitemap.xml/': '/blogs.html',
    '/blog/post-sitemap.xml': '/blogs.html',
    '/page-sitemap.xml/': '/blogs.html',
    '/page-sitemap.xml': '/blogs.html',
    '/blog/page-sitemap.xml/': '/blogs.html',
    '/blog/page-sitemap.xml': '/blogs.html',
    '/our-teams/tom-wangdel/': '/team/tom-wangdel.html',
    '/our-teams/tom-wangdel': '/team/tom-wangdel.html',
    '/blog/our-teams/tom-wangdel/': '/team/tom-wangdel.html',
    '/blog/our-teams/tom-wangdel': '/team/tom-wangdel.html',
    '/our-teams/surya-lama/': '/team/surya-lama.html',
    '/our-teams/surya-lama': '/team/surya-lama.html',
    '/blog/our-teams/surya-lama/': '/team/surya-lama.html',
    '/blog/our-teams/surya-lama': '/team/surya-lama.html',
    '/our-teams/sujan-tamang/': '/team/sujan-tamang.html',
    '/our-teams/sujan-tamang': '/team/sujan-tamang.html',
    '/blog/our-teams/sujan-tamang/': '/team/sujan-tamang.html',
    '/blog/our-teams/sujan-tamang': '/team/sujan-tamang.html',
    '/our-teams/sonam-dorji-sherpa/': '/team/sonam-dorji-sherpa.html',
    '/our-teams/sonam-dorji-sherpa': '/team/sonam-dorji-sherpa.html',
    '/blog/our-teams/sonam-dorji-sherpa/': '/team/sonam-dorji-sherpa.html',
    '/blog/our-teams/sonam-dorji-sherpa': '/team/sonam-dorji-sherpa.html',
    '/our-teams/sonam-tamang/': '/team/sonam-tamang.html',
    '/our-teams/sonam-tamang': '/team/sonam-tamang.html',
    '/blog/our-teams/sonam-tamang/': '/team/sonam-tamang.html',
    '/blog/our-teams/sonam-tamang': '/team/sonam-tamang.html',
    '/our-teams/santi-tamang/': '/team/santi-tamang.html',
    '/our-teams/santi-tamang': '/team/santi-tamang.html',
    '/blog/our-teams/santi-tamang/': '/team/santi-tamang.html',
    '/blog/our-teams/santi-tamang': '/team/santi-tamang.html',
    '/our-teams/ramesh-karki/': '/team/ramesh-karki.html',
    '/our-teams/ramesh-karki': '/team/ramesh-karki.html',
    '/blog/our-teams/ramesh-karki/': '/team/ramesh-karki.html',
    '/blog/our-teams/ramesh-karki': '/team/ramesh-karki.html',
    '/our-teams/santa-lama/': '/team/santa-lama.html',
    '/our-teams/santa-lama': '/team/santa-lama.html',
    '/blog/our-teams/santa-lama/': '/team/santa-lama.html',
    '/blog/our-teams/santa-lama': '/team/santa-lama.html',
    '/our-teams/mingmar-tamang/': '/team/mingmar-tamang.html',
    '/our-teams/mingmar-tamang': '/team/mingmar-tamang.html',
    '/blog/our-teams/mingmar-tamang/': '/team/mingmar-tamang.html',
    '/blog/our-teams/mingmar-tamang': '/team/mingmar-tamang.html',
    '/our-teams/muhamad-danial/': '/team/muhamad-danial.html',
    '/our-teams/muhamad-danial': '/team/muhamad-danial.html',
    '/blog/our-teams/muhamad-danial/': '/team/muhamad-danial.html',
    '/blog/our-teams/muhamad-danial': '/team/muhamad-danial.html',
    '/our-teams/milan-tamang/': '/team/milan-tamang.html',
    '/our-teams/milan-tamang': '/team/milan-tamang.html',
    '/blog/our-teams/milan-tamang/': '/team/milan-tamang.html',
    '/blog/our-teams/milan-tamang': '/team/milan-tamang.html',
    '/our-teams/kusal-rimal/': '/team/kusal-rimal.html',
    '/our-teams/kusal-rimal': '/team/kusal-rimal.html',
    '/blog/our-teams/kusal-rimal/': '/team/kusal-rimal.html',
    '/blog/our-teams/kusal-rimal': '/team/kusal-rimal.html',
    '/our-teams/kamal-tamang/': '/blogs.html',
    '/our-teams/kamal-tamang': '/blogs.html',
    '/blog/our-teams/kamal-tamang/': '/blogs.html',
    '/blog/our-teams/kamal-tamang': '/blogs.html',
    '/our-teams/emelita-sindac-dalangin/': '/team/emelita-sindac-dalangin.html',
    '/our-teams/emelita-sindac-dalangin': '/team/emelita-sindac-dalangin.html',
    '/blog/our-teams/emelita-sindac-dalangin/': '/team/emelita-sindac-dalangin.html',
    '/blog/our-teams/emelita-sindac-dalangin': '/team/emelita-sindac-dalangin.html',
    '/our-teams/elise-yuan/': '/team/elise-yuan.html',
    '/our-teams/elise-yuan': '/team/elise-yuan.html',
    '/blog/our-teams/elise-yuan/': '/team/elise-yuan.html',
    '/blog/our-teams/elise-yuan': '/team/elise-yuan.html',
    '/our-teams/babu-ram-pokharel/': '/team/babu-ram-pokharel.html',
    '/our-teams/babu-ram-pokharel': '/team/babu-ram-pokharel.html',
    '/blog/our-teams/babu-ram-pokharel/': '/team/babu-ram-pokharel.html',
    '/blog/our-teams/babu-ram-pokharel': '/team/babu-ram-pokharel.html',
    '/nepal-visa-everything-travelers/': '/blogs.html',
    '/nepal-visa-everything-travelers': '/blogs.html',
    '/blog/nepal-visa-everything-travelers/': '/blogs.html',
    '/blog/nepal-visa-everything-travelers': '/blogs.html',
    '/my-account/': '/blogs.html',
    '/my-account': '/blogs.html',
    '/blog/my-account/': '/blogs.html',
    '/blog/my-account': '/blogs.html',
    '/lukla-flight-guide-for-everest-trekkers/': '/everest-region-treks/',
    '/lukla-flight-guide-for-everest-trekkers': '/everest-region-treks/',
    '/blog/lukla-flight-guide-for-everest-trekkers/': '/everest-region-treks/',
    '/blog/lukla-flight-guide-for-everest-trekkers': '/everest-region-treks/',
    '/lukla-flight-cancelled/': '/everest-region-treks/',
    '/lukla-flight-cancelled': '/everest-region-treks/',
    '/blog/lukla-flight-cancelled/': '/everest-region-treks/',
    '/blog/lukla-flight-cancelled': '/everest-region-treks/',
    '/legal-documents/': '/legal-documents.html',
    '/legal-documents': '/legal-documents.html',
    '/blog/legal-documents/': '/legal-documents.html',
    '/blog/legal-documents': '/legal-documents.html',
    '/langtang-valley-trek-cost-2026/': '/langtang-region-treks/',
    '/langtang-valley-trek-cost-2026': '/langtang-region-treks/',
    '/blog/langtang-valley-trek-cost-2026/': '/langtang-region-treks/',
    '/blog/langtang-valley-trek-cost-2026': '/langtang-region-treks/',
    '/langtang-flood-today-rasuwa-bhote-koshi-flood/': '/langtang-region-treks/',
    '/langtang-flood-today-rasuwa-bhote-koshi-flood': '/langtang-region-treks/',
    '/blog/langtang-flood-today-rasuwa-bhote-koshi-flood/': '/langtang-region-treks/',
    '/blog/langtang-flood-today-rasuwa-bhote-koshi-flood': '/langtang-region-treks/',
    '/khopra-ridge-trek-in-nepal/': '/annapurna-region-treks/',
    '/khopra-ridge-trek-in-nepal': '/annapurna-region-treks/',
    '/blog/khopra-ridge-trek-in-nepal/': '/annapurna-region-treks/',
    '/blog/khopra-ridge-trek-in-nepal': '/annapurna-region-treks/',
    '/how-to-get-to-annapurna/': '/annapurna-region-treks/',
    '/how-to-get-to-annapurna': '/annapurna-region-treks/',
    '/blog/how-to-get-to-annapurna/': '/annapurna-region-treks/',
    '/blog/how-to-get-to-annapurna': '/annapurna-region-treks/',
    '/how-long-is-the-hike-to-everest-base-camp/': '/everest-region-treks/',
    '/how-long-is-the-hike-to-everest-base-camp': '/everest-region-treks/',
    '/blog/how-long-is-the-hike-to-everest-base-camp/': '/everest-region-treks/',
    '/blog/how-long-is-the-hike-to-everest-base-camp': '/everest-region-treks/',
    '/how-hard-is-everest-base-camp-trek/': '/everest-region-treks/',
    '/how-hard-is-everest-base-camp-trek': '/everest-region-treks/',
    '/blog/how-hard-is-everest-base-camp-trek/': '/everest-region-treks/',
    '/blog/how-hard-is-everest-base-camp-trek': '/everest-region-treks/',
    '/gokyo-lake-location/': '/everest-region-treks/',
    '/gokyo-lake-location': '/everest-region-treks/',
    '/blog/gokyo-lake-location/': '/everest-region-treks/',
    '/blog/gokyo-lake-location': '/everest-region-treks/',
    '/flying-a-drone-in-nepal/': '/blogs.html',
    '/flying-a-drone-in-nepal': '/blogs.html',
    '/blog/flying-a-drone-in-nepal/': '/blogs.html',
    '/blog/flying-a-drone-in-nepal': '/blogs.html',
    '/feed/': '/blogs.html',
    '/feed': '/blogs.html',
    '/blog/feed/': '/blogs.html',
    '/blog/feed': '/blogs.html',
    '/faq/': '/blogs.html',
    '/faq': '/blogs.html',
    '/blog/faq/': '/blogs.html',
    '/blog/faq': '/blogs.html',
    '/everest-is-not-something-you-conquer/': '/everest-region-treks/',
    '/everest-is-not-something-you-conquer': '/everest-region-treks/',
    '/blog/everest-is-not-something-you-conquer/': '/everest-region-treks/',
    '/blog/everest-is-not-something-you-conquer': '/everest-region-treks/',
    '/everest-base-camp-trek-more-than-just-reaching-everest-base-camp/': '/everest-region-treks/',
    '/everest-base-camp-trek-more-than-just-reaching-everest-base-camp': '/everest-region-treks/',
    '/blog/everest-base-camp-trek-more-than-just-reaching-everest-base-camp/': '/everest-region-treks/',
    '/blog/everest-base-camp-trek-more-than-just-reaching-everest-base-camp': '/everest-region-treks/',
    '/everest-base-camp-trek-guide-tips/': '/everest-region-treks/',
    '/everest-base-camp-trek-guide-tips': '/everest-region-treks/',
    '/blog/everest-base-camp-trek-guide-tips/': '/everest-region-treks/',
    '/blog/everest-base-camp-trek-guide-tips': '/everest-region-treks/',
    '/everest-base-camp-trek-faqs-guide/': '/everest-region-treks/',
    '/everest-base-camp-trek-faqs-guide': '/everest-region-treks/',
    '/blog/everest-base-camp-trek-faqs-guide/': '/everest-region-treks/',
    '/blog/everest-base-camp-trek-faqs-guide': '/everest-region-treks/',
    '/everest-base-camp-trek-cost-2027/': '/everest-region-treks/',
    '/everest-base-camp-trek-cost-2027': '/everest-region-treks/',
    '/blog/everest-base-camp-trek-cost-2027/': '/everest-region-treks/',
    '/blog/everest-base-camp-trek-cost-2027': '/everest-region-treks/',
    '/everest-base-camp-2027/': '/everest-region-treks/',
    '/everest-base-camp-2027': '/everest-region-treks/',
    '/blog/everest-base-camp-2027/': '/everest-region-treks/',
    '/blog/everest-base-camp-2027': '/everest-region-treks/',
    '/enquiry-thank-you-page/': '/blogs.html',
    '/enquiry-thank-you-page': '/blogs.html',
    '/blog/enquiry-thank-you-page/': '/blogs.html',
    '/blog/enquiry-thank-you-page': '/blogs.html',
    '/destinations/tibet/': '/blogs.html',
    '/destinations/tibet': '/blogs.html',
    '/blog/destinations/tibet/': '/blogs.html',
    '/blog/destinations/tibet': '/blogs.html',
    '/destinations/nepal/page/5/': '/blogs.html',
    '/destinations/nepal/page/5': '/blogs.html',
    '/blog/destinations/nepal/page/5/': '/blogs.html',
    '/blog/destinations/nepal/page/5': '/blogs.html',
    '/destinations/nepal/page/4/': '/blogs.html',
    '/destinations/nepal/page/4': '/blogs.html',
    '/blog/destinations/nepal/page/4/': '/blogs.html',
    '/blog/destinations/nepal/page/4': '/blogs.html',
    '/destinations/nepal/page/3/': '/blogs.html',
    '/destinations/nepal/page/3': '/blogs.html',
    '/blog/destinations/nepal/page/3/': '/blogs.html',
    '/blog/destinations/nepal/page/3': '/blogs.html',
    '/destinations/nepal/page/2/': '/blogs.html',
    '/destinations/nepal/page/2': '/blogs.html',
    '/blog/destinations/nepal/page/2/': '/blogs.html',
    '/blog/destinations/nepal/page/2': '/blogs.html',
    '/destinations/nepal/everest-region/page/2/': '/everest-region-treks/',
    '/destinations/nepal/everest-region/page/2': '/everest-region-treks/',
    '/blog/destinations/nepal/everest-region/page/2/': '/everest-region-treks/',
    '/blog/destinations/nepal/everest-region/page/2': '/everest-region-treks/',
    '/destinations/nepal/annapurna-region/page/2/': '/annapurna-region-treks/',
    '/destinations/nepal/annapurna-region/page/2': '/annapurna-region-treks/',
    '/blog/destinations/nepal/annapurna-region/page/2/': '/annapurna-region-treks/',
    '/blog/destinations/nepal/annapurna-region/page/2': '/annapurna-region-treks/',
    '/destinations/bhutan/': '/blogs.html',
    '/destinations/bhutan': '/blogs.html',
    '/blog/destinations/bhutan/': '/blogs.html',
    '/blog/destinations/bhutan': '/blogs.html',
    '/dal-bhat/': '/blogs.html',
    '/dal-bhat': '/blogs.html',
    '/blog/dal-bhat/': '/blogs.html',
    '/blog/dal-bhat': '/blogs.html',
    '/dal-bhat-nepal-iconic-traditional-dish/': '/blogs.html',
    '/dal-bhat-nepal-iconic-traditional-dish': '/blogs.html',
    '/blog/dal-bhat-nepal-iconic-traditional-dish/': '/blogs.html',
    '/blog/dal-bhat-nepal-iconic-traditional-dish': '/blogs.html',
    '/cycling-trails-in-kathmandu/': '/tour/cycling-tour-around-kathmandu-valley/',
    '/cycling-trails-in-kathmandu': '/tour/cycling-tour-around-kathmandu-valley/',
    '/blog/cycling-trails-in-kathmandu/': '/tour/cycling-tour-around-kathmandu-valley/',
    '/blog/cycling-trails-in-kathmandu': '/tour/cycling-tour-around-kathmandu-valley/',
    '/common-mistakes-annapurna-base-camp-trek/': '/annapurna-region-treks/',
    '/common-mistakes-annapurna-base-camp-trek': '/annapurna-region-treks/',
    '/blog/common-mistakes-annapurna-base-camp-trek/': '/annapurna-region-treks/',
    '/blog/common-mistakes-annapurna-base-camp-trek': '/annapurna-region-treks/',
    '/comments/feed/': '/blogs.html',
    '/comments/feed': '/blogs.html',
    '/blog/comments/feed/': '/blogs.html',
    '/blog/comments/feed': '/blogs.html',
    '/climbing-in-nepal/': '/peak-climbing-nepal/',
    '/climbing-in-nepal': '/peak-climbing-nepal/',
    '/blog/climbing-in-nepal/': '/peak-climbing-nepal/',
    '/blog/climbing-in-nepal': '/peak-climbing-nepal/',
    '/classic-annapurna-circuit-trek/': '/annapurna-region-treks/',
    '/classic-annapurna-circuit-trek': '/annapurna-region-treks/',
    '/blog/classic-annapurna-circuit-trek/': '/annapurna-region-treks/',
    '/blog/classic-annapurna-circuit-trek': '/annapurna-region-treks/',
    '/checkout/': '/blogs.html',
    '/checkout': '/blogs.html',
    '/blog/checkout/': '/blogs.html',
    '/blog/checkout': '/blogs.html',
    '/cheap-treks-in-nepal-under-1000/': '/blogs.html',
    '/cheap-treks-in-nepal-under-1000': '/blogs.html',
    '/blog/cheap-treks-in-nepal-under-1000/': '/blogs.html',
    '/blog/cheap-treks-in-nepal-under-1000': '/blogs.html',
    '/book-your-best-trip-today/': '/blogs.html',
    '/book-your-best-trip-today': '/blogs.html',
    '/blog/book-your-best-trip-today/': '/blogs.html',
    '/blog/book-your-best-trip-today': '/blogs.html',
    '/best-things-to-do-along-the-everest-base-camp-trail/': '/everest-region-treks/',
    '/best-things-to-do-along-the-everest-base-camp-trail': '/everest-region-treks/',
    '/blog/best-things-to-do-along-the-everest-base-camp-trail/': '/everest-region-treks/',
    '/blog/best-things-to-do-along-the-everest-base-camp-trail': '/everest-region-treks/',
    '/author/surya/': '/blogs.html',
    '/author/surya': '/blogs.html',
    '/blog/author/surya/': '/blogs.html',
    '/blog/author/surya': '/blogs.html',
    '/annapurna-base-camp-trek-itinerary-7-days/': '/annapurna-region-treks/',
    '/annapurna-base-camp-trek-itinerary-7-days': '/annapurna-region-treks/',
    '/blog/annapurna-base-camp-trek-itinerary-7-days/': '/annapurna-region-treks/',
    '/blog/annapurna-base-camp-trek-itinerary-7-days': '/annapurna-region-treks/',
    '/annapurna-base-camp-trek-in-autumn-2/': '/annapurna-region-treks/',
    '/annapurna-base-camp-trek-in-autumn-2': '/annapurna-region-treks/',
    '/blog/annapurna-base-camp-trek-in-autumn-2/': '/annapurna-region-treks/',
    '/blog/annapurna-base-camp-trek-in-autumn-2': '/annapurna-region-treks/',
    '/annapurna-base-camp-trek-13-days/': '/annapurna-region-treks/',
    '/annapurna-base-camp-trek-13-days': '/annapurna-region-treks/',
    '/blog/annapurna-base-camp-trek-13-days/': '/annapurna-region-treks/',
    '/blog/annapurna-base-camp-trek-13-days': '/annapurna-region-treks/',
    '/annapurna-base-camp-9-days-itinerary/': '/annapurna-region-treks/',
    '/annapurna-base-camp-9-days-itinerary': '/annapurna-region-treks/',
    '/blog/annapurna-base-camp-9-days-itinerary/': '/annapurna-region-treks/',
    '/blog/annapurna-base-camp-9-days-itinerary': '/annapurna-region-treks/',
    // =========================================================================
    // 112 Blog Articles Moved to /blog/ -> 301 Permanent Redirects
    // =========================================================================
    '/best-hiking-places-near-kathmandu/': '/blog/best-hiking-places-near-kathmandu/',
    '/best-hiking-places-near-kathmandu': '/blog/best-hiking-places-near-kathmandu/',
    '/everest-base-camp-trek-guide/': '/blog/everest-base-camp-trek-guide/',
    '/everest-base-camp-trek-guide': '/blog/everest-base-camp-trek-guide/',
    
    
    
    
    
    
    
    
    
    
    
    
    '/solo-trekking-in-nepals-restricted-areas/': '/blog/solo-trekking-in-nepals-restricted-areas/',
    '/solo-trekking-in-nepals-restricted-areas': '/blog/solo-trekking-in-nepals-restricted-areas/',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    '/best-time-to-climb-island-peak/': '/blog/best-time-to-climb-island-peak/',
    '/best-time-to-climb-island-peak': '/blog/best-time-to-climb-island-peak/',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    '/kanchenjunga-circuit-trek-autumn-weather/': '/blog/kanchenjunga-circuit-trek-autumn-weather/',
    '/kanchenjunga-circuit-trek-autumn-weather': '/blog/kanchenjunga-circuit-trek-autumn-weather/',
    
    
    
    
    
    
    
    
    '/best-treks-in-nepal-2027/': '/blog/best-treks-in-nepal-2027/',
    '/best-treks-in-nepal-2027': '/blog/best-treks-in-nepal-2027/',
    
    
    
    
    
    
    
    
    '/everest-base-camp-trek-food/': '/blog/everest-base-camp-trek-food/',
    '/everest-base-camp-trek-food': '/blog/everest-base-camp-trek-food/',
    '/festivals-in-nepal/': '/blog/festivals-in-nepal/',
    '/festivals-in-nepal': '/blog/festivals-in-nepal/',
    
    
    
    
    
    
    
    
    '/why-everest-base-camp-is-popular/': '/blog/why-everest-base-camp-is-popular/',
    '/why-everest-base-camp-is-popular': '/blog/why-everest-base-camp-is-popular/',
    '/gokyo-lakes-trek-itinerary/': '/blog/gokyo-lakes-trek-itinerary/',
    '/gokyo-lakes-trek-itinerary': '/blog/gokyo-lakes-trek-itinerary/',
    '/gokyo-lakes-trek-distance/': '/blog/gokyo-lakes-trek-distance/',
    '/gokyo-lakes-trek-distance': '/blog/gokyo-lakes-trek-distance/',
    '/gokyo-lakes-trek-cost-2027/': '/blog/gokyo-lakes-trek-cost-2027/',
    '/gokyo-lakes-trek-cost-2027': '/blog/gokyo-lakes-trek-cost-2027/',
    '/best-time-for-gokyo-lakes-trek/': '/blog/best-time-for-gokyo-lakes-trek/',
    '/best-time-for-gokyo-lakes-trek': '/blog/best-time-for-gokyo-lakes-trek/',
    
    
    
    
    '/gokyo-lakes-trek-difficulty/': '/blog/gokyo-lakes-trek-difficulty/',
    '/gokyo-lakes-trek-difficulty': '/blog/gokyo-lakes-trek-difficulty/',
    
    
    
    
    '/trekking-in-nepal/': '/blog/trekking-in-nepal/',
    '/trekking-in-nepal': '/blog/trekking-in-nepal/',
    '/transportation-in-nepal/': '/blog/transportation-in-nepal/',
    '/transportation-in-nepal': '/blog/transportation-in-nepal/',
    '/everest-base-camp-trek-elevation/': '/blog/everest-base-camp-trek-elevation/',
    '/everest-base-camp-trek-elevation': '/blog/everest-base-camp-trek-elevation/',
    '/annapurna-base-camp-trek-after-flood/': '/blog/annapurna-base-camp-trek-after-flood/',
    '/annapurna-base-camp-trek-after-flood': '/blog/annapurna-base-camp-trek-after-flood/',
    '/annapurna-base-camp-trek-in-autumn/': '/blog/annapurna-base-camp-trek-in-autumn/',
    '/annapurna-base-camp-trek-in-autumn': '/blog/annapurna-base-camp-trek-in-autumn/',
    '/everest-base-camp-trek-itinerary-2027/': '/blog/everest-base-camp-trek-itinerary-2027/',
    '/everest-base-camp-trek-itinerary-2027': '/blog/everest-base-camp-trek-itinerary-2027/',
    '/nepal-flood-2026-trekking-routes-affected/': '/blog/nepal-flood-2026-trekking-routes-affected/',
    '/nepal-flood-2026-trekking-routes-affected': '/blog/nepal-flood-2026-trekking-routes-affected/',
    '/best-time-to-trek-annapurna-base-camp/': '/blog/best-time-to-trek-annapurna-base-camp/',
    '/best-time-to-trek-annapurna-base-camp': '/blog/best-time-to-trek-annapurna-base-camp/',
    
    
    
    
    
    
    
    
    
    
    
    
    '/annapurna-base-camp-trek-in-winter/': '/blog/annapurna-base-camp-trek-in-winter/',
    '/annapurna-base-camp-trek-in-winter': '/blog/annapurna-base-camp-trek-in-winter/',
    '/everest-view-trek-cost/': '/blog/everest-view-trek-cost/',
    '/everest-view-trek-cost': '/blog/everest-view-trek-cost/',
    '/everest-base-camp-trek-without-flight/': '/blog/everest-base-camp-trek-without-flight/',
    '/everest-base-camp-trek-without-flight': '/blog/everest-base-camp-trek-without-flight/',
    
    
    
    
    '/everest-view-trek-difficulty/': '/blog/everest-view-trek-difficulty/',
    '/everest-view-trek-difficulty': '/blog/everest-view-trek-difficulty/',
    
    
    
    
    '/everest-view-trek-in-winter/': '/blog/everest-view-trek-in-winter/',
    '/everest-view-trek-in-winter': '/blog/everest-view-trek-in-winter/',
    '/everest-view-trek-packing-list/': '/blog/everest-view-trek-packing-list/',
    '/everest-view-trek-packing-list': '/blog/everest-view-trek-packing-list/',
    '/mohare-danda-trek-cost-2027/': '/blog/mohare-danda-trek-cost-2027/',
    '/mohare-danda-trek-cost-2027': '/blog/mohare-danda-trek-cost-2027/',
    '/mardi-himal-trek-vs-abc/': '/blog/mardi-himal-trek-vs-abc/',
    '/mardi-himal-trek-vs-abc': '/blog/mardi-himal-trek-vs-abc/',
    
    
    
    
    '/langtang-valley-trek-itinerary/': '/blog/langtang-valley-trek-itinerary/',
    '/langtang-valley-trek-itinerary': '/blog/langtang-valley-trek-itinerary/',
    '/langtang-valley-trek-cost-2027/': '/blog/langtang-valley-trek-cost-2027/',
    '/langtang-valley-trek-cost-2027': '/blog/langtang-valley-trek-cost-2027/',
    '/langtang-valley-trek-difficulty/': '/blog/langtang-valley-trek-difficulty/',
    '/langtang-valley-trek-difficulty': '/blog/langtang-valley-trek-difficulty/',
    '/annapurna-base-camp-trek-difficulty/': '/blog/annapurna-base-camp-trek-difficulty/',
    '/annapurna-base-camp-trek-difficulty': '/blog/annapurna-base-camp-trek-difficulty/',
    
    
    
    
    '/poon-hill-trek/': '/blog/poon-hill-trek/',
    '/poon-hill-trek': '/blog/poon-hill-trek/',
    '/nims-dai-death/': '/blog/nims-dai-death/',
    '/nims-dai-death': '/blog/nims-dai-death/',
    '/annapurna-base-camp-trek-for-beginners/': '/blog/annapurna-base-camp-trek-for-beginners/',
    '/annapurna-base-camp-trek-for-beginners': '/blog/annapurna-base-camp-trek-for-beginners/',
    '/green-boots-mount-everest/': '/blog/green-boots-mount-everest/',
    '/green-boots-mount-everest': '/blog/green-boots-mount-everest/',
    '/annapurna-base-camp-trek-in-october/': '/blog/annapurna-base-camp-trek-in-october/',
    '/annapurna-base-camp-trek-in-october': '/blog/annapurna-base-camp-trek-in-october/',
    '/how-to-choose-the-best-trekking-company-in-nepal/': '/blog/how-to-choose-the-best-trekking-company-in-nepal/',
    '/how-to-choose-the-best-trekking-company-in-nepal': '/blog/how-to-choose-the-best-trekking-company-in-nepal/',
    
    
    
    
    
    
    
    
    '/do-you-need-a-guide-to-trek-in-nepal-2026/': '/blog/do-you-need-a-guide-to-trek-in-nepal-2026/',
    '/do-you-need-a-guide-to-trek-in-nepal-2026': '/blog/do-you-need-a-guide-to-trek-in-nepal-2026/',
    '/how-to-train-for-high-altitude-hiking/': '/blog/how-to-train-for-high-altitude-hiking/',
    '/how-to-train-for-high-altitude-hiking': '/blog/how-to-train-for-high-altitude-hiking/',
    
    
    
    
    
    
    
    
    '/everest-base-camp-trek-difficulty-guide/': '/blog/everest-base-camp-trek-difficulty-guide/',
    '/everest-base-camp-trek-difficulty-guide': '/blog/everest-base-camp-trek-difficulty-guide/',
    '/everest-base-camp-trek-cost/': '/blog/everest-base-camp-trek-cost/',
    '/everest-base-camp-trek-cost': '/blog/everest-base-camp-trek-cost/',
    '/manaslu-circuit-trek-guide/': '/blog/manaslu-circuit-trek-guide/',
    '/manaslu-circuit-trek-guide': '/blog/manaslu-circuit-trek-guide/',
    '/how-to-get-to-everest-base-camp/': '/blog/how-to-get-to-everest-base-camp/',
    '/how-to-get-to-everest-base-camp': '/blog/how-to-get-to-everest-base-camp/',
    '/yala-peak-climbing-cost-breakdown-2026/': '/blog/yala-peak-climbing-cost-breakdown-2026/',
    '/yala-peak-climbing-cost-breakdown-2026': '/blog/yala-peak-climbing-cost-breakdown-2026/',
    
    
    
    
    
    
    
    
    '/mardi-himal-trek-guide/': '/blog/mardi-himal-trek-guide/',
    '/mardi-himal-trek-guide': '/blog/mardi-himal-trek-guide/',
    
    
    
    
    '/everest-base-camp-vs-gokyo-lakes/': '/blog/everest-base-camp-vs-gokyo-lakes/',
    '/everest-base-camp-vs-gokyo-lakes': '/blog/everest-base-camp-vs-gokyo-lakes/',
    '/upper-mustang-trek-cost-and-itinerary/': '/blog/upper-mustang-trek-cost-and-itinerary/',
    '/upper-mustang-trek-cost-and-itinerary': '/blog/upper-mustang-trek-cost-and-itinerary/',
    '/everest-base-camp-packing-mistakes-to-avoid/': '/blog/everest-base-camp-packing-mistakes-to-avoid/',
    '/everest-base-camp-packing-mistakes-to-avoid': '/blog/everest-base-camp-packing-mistakes-to-avoid/',
    '/best-treks-in-nepal-for-beginners/': '/blog/best-treks-in-nepal-for-beginners/',
    '/best-treks-in-nepal-for-beginners': '/blog/best-treks-in-nepal-for-beginners/',
    '/langtang-valley-trek-packing-list/': '/blog/langtang-valley-trek-packing-list/',
    '/langtang-valley-trek-packing-list': '/blog/langtang-valley-trek-packing-list/',
    
    
    
    
    '/kanchenjunga-circuit-trek-2026-guide/': '/blog/kanchenjunga-circuit-trek-2026-guide/',
    '/kanchenjunga-circuit-trek-2026-guide': '/blog/kanchenjunga-circuit-trek-2026-guide/',
    '/mount-everest/': '/blog/mount-everest/',
    '/mount-everest': '/blog/mount-everest/',
    '/when-is-the-best-time-for-the-annapurna-base-camp-trek/': '/blog/when-is-the-best-time-for-the-annapurna-base-camp-trek/',
    '/when-is-the-best-time-for-the-annapurna-base-camp-trek': '/blog/when-is-the-best-time-for-the-annapurna-base-camp-trek/',
    '/everest-base-camp-vs-annapurna-base-camp/': '/blog/everest-base-camp-vs-annapurna-base-camp/',
    '/everest-base-camp-vs-annapurna-base-camp': '/blog/everest-base-camp-vs-annapurna-base-camp/',
    '/annapurna-base-camp-trek-cost-2026/': '/blog/annapurna-base-camp-trek-cost-2026/',
    '/annapurna-base-camp-trek-cost-2026': '/blog/annapurna-base-camp-trek-cost-2026/',
    
    
    
    
    
    
    
    
    '/everest-base-camp-trek-packing-list/': '/blog/everest-base-camp-trek-packing-list/',
    '/everest-base-camp-trek-packing-list': '/blog/everest-base-camp-trek-packing-list/',
    
    
    
    
    '/kyanjin-ri-vs-tserko-ri/': '/blog/kyanjin-ri-vs-tserko-ri/',
    '/kyanjin-ri-vs-tserko-ri': '/blog/kyanjin-ri-vs-tserko-ri/',
    '/manaslu-circuit-trek-permits-guide/': '/blog/manaslu-circuit-trek-permits-guide/',
    '/manaslu-circuit-trek-permits-guide': '/blog/manaslu-circuit-trek-permits-guide/',
    '/ghorepani-poon-hill-vs-mardi-himal-trek/': '/blog/ghorepani-poon-hill-vs-mardi-himal-trek/',
    '/ghorepani-poon-hill-vs-mardi-himal-trek': '/blog/ghorepani-poon-hill-vs-mardi-himal-trek/',
    
    
    
    
    '/annapurna-circuit-vs-manaslu-circuit/': '/blog/annapurna-circuit-vs-manaslu-circuit/',
    '/annapurna-circuit-vs-manaslu-circuit': '/blog/annapurna-circuit-vs-manaslu-circuit/',
    '/manaslu-trek-food-and-accommodation/': '/blog/manaslu-trek-food-and-accommodation/',
    '/manaslu-trek-food-and-accommodation': '/blog/manaslu-trek-food-and-accommodation/',
    '/everest-base-camp-trek-in-winter-2026/': '/blog/everest-base-camp-trek-in-winter-2026/',
    '/everest-base-camp-trek-in-winter-2026': '/blog/everest-base-camp-trek-in-winter-2026/',
    '/where-is-mount-everest/': '/blog/where-is-mount-everest/',
    '/where-is-mount-everest': '/blog/where-is-mount-everest/',
    '/top-10-destinations-in-nepal/': '/blog/top-10-destinations-in-nepal/',
    '/top-10-destinations-in-nepal': '/blog/top-10-destinations-in-nepal/',
    
    
    
    
    '/top-trekking-routes-in-nepal-for-2026/': '/blog/top-trekking-routes-in-nepal-for-2026/',
    '/top-trekking-routes-in-nepal-for-2026': '/blog/top-trekking-routes-in-nepal-for-2026/',
    '/everest-base-camp-trekking-tips/': '/blog/everest-base-camp-trekking-tips/',
    '/everest-base-camp-trekking-tips': '/blog/everest-base-camp-trekking-tips/',
    '/island-peak-climbing-in-spring-season/': '/blog/island-peak-climbing-in-spring-season/',
    '/island-peak-climbing-in-spring-season': '/blog/island-peak-climbing-in-spring-season/',
    '/short-annapurna-base-camp-trek-difficulty/': '/blog/short-annapurna-base-camp-trek-difficulty/',
    '/short-annapurna-base-camp-trek-difficulty': '/blog/short-annapurna-base-camp-trek-difficulty/',
    '/annapurna-base-camp-trek-in-february/': '/blog/annapurna-base-camp-trek-in-february/',
    '/annapurna-base-camp-trek-in-february': '/blog/annapurna-base-camp-trek-in-february/',
    '/annapurna-base-camp-trek-Via-Poon-Hill': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/annapurna-base-camp-trek-Via-Poon-Hill/': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/annapurna-base-camp-trek-via-poon-hill': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/annapurna-base-camp-trek-via-poon-hill/': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trek/annapurna-base-camp-trek-Via-Poon-Hill': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trek/annapurna-base-camp-trek-Via-Poon-Hill/': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trek/poon-hill-abc-trek': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trek/poon-hill-abc-trek/': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trip/poon-hill-abc-trek': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trip/poon-hill-abc-trek/': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trip/annapurna-base-camp-trek-via-poon-hill': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trip/annapurna-base-camp-trek-via-poon-hill/': '/trek/annapurna-base-camp-trek-via-poon-hill/',
    '/trip/annapurna-base-camp-helicopter-return-trek': '/trek/annapurna-base-camp-heli-return/',
    '/trip/annapurna-base-camp-trek-heli-return': '/trek/annapurna-base-camp-heli-return/',
    '/trek/annapurna-base-camp-helicopter-return-trek': '/trek/annapurna-base-camp-heli-return/',
    '/trek/annapurna-base-camp-helicopter-return-trek/': '/trek/annapurna-base-camp-heli-return/',
    '/trip/annapurna-base-camp-trek': '/trek/annapurna-base-camp/',
    '/trek/annapurna-base-camp-trek': '/trek/annapurna-base-camp/',
    '/trip/annapurna-circuit-trek': '/trek/annapurna-circuit-trek/',
    '/trip/classic-annapurna-circuit-trek': '/trek/classic-annapurna-circuit-trek/',
    '/trip/classic-annapurna-circuit-trek/': '/trek/classic-annapurna-circuit-trek/',
    '/trek/classic-annapurna-circuit-trek': '/trek/classic-annapurna-circuit-trek/',
    '/classic-annapurna-circuit-trek': '/trek/classic-annapurna-circuit-trek/',
    '/classic-annapurna-circuit-trek/': '/trek/classic-annapurna-circuit-trek/',
    '/trek/annapurna-sanctuary-trek': '/trek/classic-annapurna-circuit-trek/',
    '/trek/annapurna-sanctuary-trek/': '/trek/classic-annapurna-circuit-trek/',
    '/annapurna-sanctuary-trek': '/trek/classic-annapurna-circuit-trek/',
    '/annapurna-sanctuary-trek/': '/trek/classic-annapurna-circuit-trek/',
    '/trip/annapurna-sanctuary-trek': '/trek/classic-annapurna-circuit-trek/',
    '/trip/annapurna-sanctuary-trek/': '/trek/classic-annapurna-circuit-trek/',
    '/trip/annapurna-circuit-with-tilicho-lake': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/trip/annapurna-circuit-with-tilicho-lake/': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/annapurna-circuit-with-tilicho-lake': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/annapurna-circuit-with-tilicho-lake/': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/tilicho-lake-trek': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/tilicho-lake-trek/': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/trek/tilicho-lake-trek': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/trek/tilicho-lake-trek/': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/trip/tilicho-lake-trek': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/trip/tilicho-lake-trek/': '/trek/annapurna-circuit-with-tilicho-lake/',
    '/trip/ghorepani-poon-hill-trek': '/trek/ghorepani-poon-hill-trek/',
    '/trip/ghorepani-poonhill-ghandruk-trek': '/trek/ghorepani-poon-hill-trek/',
    '/trip/mardi-himal-trek': '/trek/mardi-himal-trek/',
    '/trip/khopra-ridge-trek': '/trek/khopra-ridge-trek/',
    '/trip/panchase-trek': '/trek/panchase-trek/',
    '/trip/annapurna-scenic-trek': '/trek/panchase-trek/',
    '/trip/short-annapurna-base-camp-trek': '/trek/short-annapurna-base-camp-trek/',
    '/trip/annapurna-short-trek': '/trek/annapurna-view-trek/',
    '/trip/annapurna-short-trek/': '/trek/annapurna-view-trek/',
    '/trek/annapurna-short-trek': '/trek/annapurna-view-trek/',
    '/trek/annapurna-short-trek/': '/trek/annapurna-view-trek/',
    '/annapurna-short-trek': '/trek/annapurna-view-trek/',
    '/annapurna-short-trek/': '/trek/annapurna-view-trek/',
    '/trip/annapurna-view-trek': '/trek/annapurna-view-trek/',
    '/trip/annapurna-view-trek/': '/trek/annapurna-view-trek/',
    '/trek/annapurna-view-trek': '/trek/annapurna-view-trek/',
    '/annapurna-view-trek': '/trek/annapurna-view-trek/',
    '/annapurna-view-trek/': '/trek/annapurna-view-trek/',
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
    '/trip/everest-chola-and-renjo-la-pass-trek': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/trip/everest-chola-and-renjo-la-pass-trek/': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/everest-chola-and-renjo-la-pass-trek': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/everest-chola-and-renjo-la-pass-trek/': '/trek/everest-chola-and-renjo-la-pass-trek/',
    '/trip/gokyo-lake-with-renjo-la-pass-trek': '/trek/gokyo-lake-with-renjo-la-pass-trek/',
    '/trip/gokyo-lake-with-renjo-la-pass-trek/': '/trek/gokyo-lake-with-renjo-la-pass-trek/',
    '/trip/ebc-chola-pass-gokyo-trek': '/trek/ebc-chola-pass-gokyo-trek/',
    '/trip/ebc-chola-pass-gokyo-trek/': '/trek/ebc-chola-pass-gokyo-trek/',
    '/trek/ebc-chola-pass-gokyo-trek': '/trek/ebc-chola-pass-gokyo-trek/',
    '/ebc-chola-pass-gokyo-trek': '/trek/ebc-chola-pass-gokyo-trek/',
    '/ebc-chola-pass-gokyo-trek/': '/trek/ebc-chola-pass-gokyo-trek/',
    '/trek/gokyo-lakes-and-cho-la-pass': '/trek/ebc-chola-pass-gokyo-trek/',
    '/trek/gokyo-lakes-and-cho-la-pass/': '/trek/ebc-chola-pass-gokyo-trek/',
    '/gokyo-lakes-and-cho-la-pass': '/trek/ebc-chola-pass-gokyo-trek/',
    '/gokyo-lakes-and-cho-la-pass/': '/trek/ebc-chola-pass-gokyo-trek/',
    '/trip/gokyo-lakes-and-cho-la-pass': '/trek/ebc-chola-pass-gokyo-trek/',
    '/trip/gokyo-lakes-and-cho-la-pass/': '/trek/ebc-chola-pass-gokyo-trek/',
    '/trip/everest-view-trek': '/trek/everest-view-trek/',
    '/trip/lobuche-peak-climbing': '/trek/lobuche-peak-climbing/',
    '/trip/island-peak-climbing': '/trek/island-peak-climbing/',
    '/trip/mera-peak-climbing': '/trek/mera-peak-climbing/',
    '/trip/gokyo-lake-trek-with-helicopter-return': '/trek/gokyo-lake-trek-with-helicopter-return/',
    '/trip/everest-base-camp-with-island-peak-climb': '/trek/everest-base-camp-trek-with-island-peak-climb/',
    '/trip/everest-base-camp-trek-with-island-peak-climb': '/trek/everest-base-camp-trek-with-island-peak-climb/',
    '/trip/everest-base-camp-trek-with-island-peak-climb/': '/trek/everest-base-camp-trek-with-island-peak-climb/',
    '/everest-base-camp-trek-with-island-peak-climb': '/trek/everest-base-camp-trek-with-island-peak-climb/',
    '/everest-base-camp-trek-with-island-peak-climb/': '/trek/everest-base-camp-trek-with-island-peak-climb/',
    '/trip/everest-base-camp-16-days': '/trek/everest-base-camp-trek-16-days/',
    '/trip/everest-base-camp-16-days/': '/trek/everest-base-camp-trek-16-days/',
    '/everest-base-camp-trek-16-days': '/trek/everest-base-camp-trek-16-days/',
    '/everest-base-camp-trek-16-days/': '/trek/everest-base-camp-trek-16-days/',
    '/trip/everest-three-passes-trek': '/trek/everest-three-passes-trek/',
    '/trip/everest-base-camp-helicopter-tour': '/tour/everest-base-camp-helicopter-tour/',
    // Direct /trek/ and /tour/ alias redirects
    '/trek/lobuche-peak-climbing-trek': '/trek/lobuche-peak-climbing/',
    '/trek/ebc-trek-with-island-peak': '/trek/everest-base-camp-trek-with-island-peak-climb/',
    '/trek/everest-base-camp-with-island-peak-climb': '/trek/everest-base-camp-trek-with-island-peak-climb/',
    '/trek/mera-peak': '/trek/mera-peak-climbing/',
    '/trek/everest-base-camp-trek-road-based': '/trek/everest-base-camp-trek-without-flight/',
    '/gokyo-lake-with-renjo-la-pass-trek': '/trek/gokyo-lake-with-renjo-la-pass-trek/',
    '/gokyo-lake-with-renjo-la-pass-trek/': '/trek/gokyo-lake-with-renjo-la-pass-trek/',
    '/tour/everest-base-camp-heli-tour': '/tour/everest-base-camp-helicopter-tour/',
    '/tour/gokyo-lake-helicopter-tour': '/tour/everest-base-camp-helicopter-tour/',
    // Langtang & Helambu /trip/ and alias redirects
    '/trip/tamang-heritage-trail-with-langtang-valley-trek': '/trek/tamang-heritage-trail-with-langtang-valley-trek/',
    '/trip/langtang-valley-with-gosaikunda-pass-trek': '/trek/gosaikunda-trek/',
    '/trip/langtang-valley-trek': '/trek/langtang-valley-trek/',
    '/trip/tamang-heritage-trail': '/trek/tamang-heritage-trail-trek/',
    '/trip/yala-peak-climbing': '/trek/yala-peak-climbing/',
    '/trip/langtang-gosaikunda-helambu-trek': '/trek/langtang-gosaikunda-helambu-trek/',
    '/trip/gosaikunda-trek': '/trek/gosaikunda-trek/',
    '/trip/gosaikunda-trek/': '/trek/gosaikunda-trek/',
    '/trek/gosaikunda-trek': '/trek/gosaikunda-trek/',
    '/gosaikunda-trek': '/trek/gosaikunda-trek/',
    '/gosaikunda-trek/': '/trek/gosaikunda-trek/',
    '/trek/langtang-gosaikunda-trek': '/trek/gosaikunda-trek/',
    '/trek/langtang-gosaikunda-trek/': '/trek/gosaikunda-trek/',
    '/langtang-gosaikunda-trek': '/trek/gosaikunda-trek/',
    '/langtang-gosaikunda-trek/': '/trek/gosaikunda-trek/',
    '/trip/langtang-gosaikunda-trek': '/trek/gosaikunda-trek/',
    '/trip/langtang-gosaikunda-trek/': '/trek/gosaikunda-trek/',
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
    '/trip/upper-mustang-jeep-tour': '/tour/upper-mustang-jeep-tour/',
    '/trip/upper-mustang-tiji-festival': '/tour/upper-mustang-tiji-festival/',
    '/trek/upper-mustang-tiji-festival': '/tour/upper-mustang-tiji-festival/',
    '/trek/upper-mustang-tiji-festival/': '/tour/upper-mustang-tiji-festival/',
    '/trek/upper-mustang-jeep-tour': '/tour/upper-mustang-jeep-tour/',
    '/trek/upper-mustang-jeep-tour/': '/tour/upper-mustang-jeep-tour/',
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
  const rawUrlPath = req.url.split('?')[0];
  const cleanReqUrl = rawUrlPath.replace(/\/+$/, '');
  const cleanReqUrlWithSlash = cleanReqUrl + '/';
  const targetRedirect = URL_REDIRECTS[req.url] || URL_REDIRECTS[rawUrlPath] || URL_REDIRECTS[cleanReqUrl] || URL_REDIRECTS[cleanReqUrlWithSlash] || URL_REDIRECTS[cleanReqUrl.toLowerCase()] || URL_REDIRECTS[cleanReqUrlWithSlash.toLowerCase()];
  
  if (targetRedirect && targetRedirect !== req.url && targetRedirect !== rawUrlPath) {
    res.writeHead(301, { 'Location': targetRedirect });
    res.end();
    return;
  }

  const filePath = resolveFilePath(req.url);

  if (!filePath) {
    // Fallback: If a static asset (CSS, JS, image) was requested under a subpath prefix (e.g. /trek/index.css or /trek/images/...)
    const assetBasename = path.basename(rawUrlPath);
    const rootAssetPath = path.join(ROOT, assetBasename);
    if (['.css', '.js', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico'].includes(path.extname(assetBasename).toLowerCase()) && fs.existsSync(rootAssetPath) && fs.statSync(rootAssetPath).isFile()) {
      res.writeHead(301, { 'Location': '/' + assetBasename });
      res.end();
      return;
    }
    if (rawUrlPath.includes('/images/')) {
      const imgRelative = rawUrlPath.slice(rawUrlPath.indexOf('/images/'));
      const imgDiskPath = path.join(ROOT, imgRelative);
      if (fs.existsSync(imgDiskPath) && fs.statSync(imgDiskPath).isFile()) {
        res.writeHead(301, { 'Location': imgRelative });
        res.end();
        return;
      }
    }

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
  } else {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
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
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Vary': 'Accept-Encoding'
        });
        res.end(compressed);
      } else if (acceptEncoding.includes('gzip')) {
        const compressed = zlib.gzipSync(buffer);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Content-Length': compressed.length,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Vary': 'Accept-Encoding'
        });
        res.end(compressed);
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': buffer.length,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
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
