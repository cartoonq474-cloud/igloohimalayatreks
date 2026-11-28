const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

// Parse CLI options
const args = process.argv.slice(2);
const shouldOpen = args.includes('--open');
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
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf'
};

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

  // Directory with index.html
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    const indexPath = path.join(fullPath, 'index.html');
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
      return indexPath;
    }
  }

  // Try appending .html (with or without trailing slash)
  const cleanPath = fullPath.replace(/[/\\]+$/, '');
  if (fs.existsSync(cleanPath + '.html') && fs.statSync(cleanPath + '.html').isFile()) {
    return cleanPath + '.html';
  }

  // Check in trek/ folder
  const trekDir = path.join(ROOT, 'trek', reqPath);
  if (fs.existsSync(trekDir) && fs.statSync(trekDir).isDirectory()) {
    const indexPath = path.join(trekDir, 'index.html');
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) return indexPath;
  }
  if (fs.existsSync(trekDir + '.html') && fs.statSync(trekDir + '.html').isFile()) {
    return trekDir + '.html';
  }

  // Check in tour/ folder
  const tourDir = path.join(ROOT, 'tour', reqPath);
  if (fs.existsSync(tourDir) && fs.statSync(tourDir).isDirectory()) {
    const indexPath = path.join(tourDir, 'index.html');
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) return indexPath;
  }
  if (fs.existsSync(tourDir + '.html') && fs.statSync(tourDir + '.html').isFile()) {
    return tourDir + '.html';
  }

  return null;
}

const server = http.createServer((req, res) => {
  // CORS & Methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const filePath = resolveFilePath(req.url);

  if (!filePath) {
    // Fallback: If a static asset (CSS, JS, image) was requested under a subpath prefix (e.g. /trek/index.css or /trek/images/...)
    const rawUrlPath = req.url.split('?')[0];
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

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
    return;
  }

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Cache-Control': 'no-cache',
    'Accept-Ranges': 'bytes'
  });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

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

    console.log('\n\x1b[36m  🏔️  IGLOO HIMALAYA TREKS — Static Dev Server\x1b[0m\n');
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mLocal:\x1b[0m    \x1b[36m${localUrl}\x1b[0m`);
    if (networkUrl) {
      console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mNetwork:\x1b[0m  \x1b[36m${networkUrl}\x1b[0m`);
    }
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mMode:\x1b[0m     \x1b[32mPure Static File Server (Zero Backend)\x1b[0m`);
    console.log('\n  \x1b[90mPress \x1b[1mCtrl+C\x1b[0m\x1b[90m to stop\x1b[0m\n');

    if (shouldOpen) {
      openBrowser(localUrl);
    }
  });
}

startServer(requestedPort);
