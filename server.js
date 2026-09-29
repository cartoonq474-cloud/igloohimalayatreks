const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
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
  // CORS & Development Cache Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Live Reload SSE endpoint
  if (req.url === '/__live_reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('data: connected\n\n');
    liveReloadClients.add(res);

    req.on('close', () => {
      liveReloadClients.delete(res);
    });
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
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': buffer.length,
        'Accept-Ranges': 'bytes'
      });
      res.end(buffer);
    });
    return;
  }

  // Standard static file serving
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

    console.log('\n\x1b[36m  🏔️  IGLOO HIMALAYA TREKS — Local Dev Server\x1b[0m\n');
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mLocal:\x1b[0m    \x1b[36m${localUrl}\x1b[0m`);
    if (networkUrl) {
      console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mNetwork:\x1b[0m  \x1b[36m${networkUrl}\x1b[0m`);
    }
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mLive Reload:\x1b[0m ${disableReload ? '\x1b[33mdisabled\x1b[0m' : '\x1b[32menabled\x1b[0m'}`);
    console.log('\n  \x1b[90mPress \x1b[1mCtrl+C\x1b[0m\x1b[90m to stop\x1b[0m\n');

    if (shouldOpen) {
      openBrowser(localUrl);
    }
  });
}

startServer(requestedPort);
