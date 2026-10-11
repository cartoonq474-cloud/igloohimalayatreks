const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9666',
    '--disable-gpu',
    '--window-size=420,800',
    '--user-data-dir=C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\41f5cfd1-dd97-497f-b601-cb7afa730ae6\\scratch\\chrome-test-profile-screenshot'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const newTab = await fetch('http://127.0.0.1:9666/json/new?http://localhost:3000/everest-region-treks/index.html', { method: 'PUT' }).then(r => r.json());
    const wsUrl = newTab.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    await new Promise(r => ws.onopen = r);

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        callbacks.set(curId, resolve);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 420,
      height: 800,
      deviceScaleFactor: 2,
      mobile: true
    });

    await send('Page.navigate', { url: 'http://localhost:3000/everest-region-treks/index.html' });
    await new Promise(r => setTimeout(r, 2500));

    // Open mobile toggle & Nepal Tours accordion
    await send('Runtime.evaluate', {
      expression: `(() => {
        const toggle = document.querySelector('.mobile-nav-toggle');
        if (toggle) toggle.click();

        const toursLink = Array.from(document.querySelectorAll('.nav-link')).find(a => a.textContent.includes('Nepal Tours'));
        const toursItem = toursLink ? toursLink.closest('.nav-item-dropdown') : null;
        const toursRow = toursItem ? toursItem.querySelector('.nav-link-row') : null;
        if (toursRow) toursRow.click();
      })()`
    });

    await new Promise(r => setTimeout(r, 600));

    // Capture screenshot
    const shotRes = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shotRes.result.data, 'base64');
    const outPath = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\41f5cfd1-dd97-497f-b601-cb7afa730ae6\\mobile_nav_fixed.png';
    fs.writeFileSync(outPath, buffer);
    console.log('Screenshot saved to:', outPath);

    ws.close();
  } catch (err) {
    console.error('Error taking screenshot:', err);
  } finally {
    chrome.kill();
  }
}

run();
