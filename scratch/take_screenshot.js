const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');
const WebSocket = globalThis.WebSocket;

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.pending = new Map();
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }
  async connect() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = this.id++;
      this.pending.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }
  close() {
    try { this.ws.close(); } catch (e) {}
  }
}

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,1200'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const targetsBody = await request({ host: '127.0.0.1', port: 9224, path: '/json', method: 'GET' });
    const targets = JSON.parse(targetsBody);
    const pageTarget = targets.find(t => t.type === 'page');
    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    await client.send('Page.navigate', { url: 'http://localhost:3000/tour/everest-base-camp-helicopter-tour/index.html' });
    await new Promise(r => setTimeout(r, 2500));

    // Scroll to #section-reviews
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('section-reviews');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const shotRes = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/ebc_heli_removed_sec9_shot.png', Buffer.from(shotRes.data, 'base64'));
    console.log('Saved screenshot: scratch/ebc_heli_removed_sec9_shot.png');

    client.close();
  } catch (e) {
    console.error(e);
  } finally {
    chromeProcess.kill();
  }
}

main();
