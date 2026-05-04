import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 5511;
const debugPort = 9333;
const origin = `http://127.0.0.1:${port}`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, timeout = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {}
    await wait(100);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function cdpConnect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const events = [];

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id).resolve(message);
      pending.delete(message.id);
      return;
    }
    events.push(message);
  });

  const ready = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });

  return {
    ready,
    events,
    close: () => ws.close(),
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const messageId = ++id;
        pending.set(messageId, { resolve, reject });
        ws.send(JSON.stringify({ id: messageId, method, params }));
      });
    },
  };
}

async function evaluate(cdp, expression) {
  const response = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (response.result.exceptionDetails) {
    throw new Error(response.result.exceptionDetails.text);
  }

  return response.result.result.value;
}

async function main() {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || '/', origin);
    const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
    const filePath = normalize(join(root, requestedPath));

    if (!filePath.startsWith(normalize(root))) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    try {
      const body = await readFile(filePath);
      const type = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
      }[extname(filePath)] || 'application/octet-stream';

      response.writeHead(200, { 'Content-Type': type });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });
  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${process.env.TEMP}\\construction-nav-test-${Date.now()}`,
    `${origin}/index.html`,
  ], {
    stdio: 'ignore',
    windowsHide: true,
  });

  try {
    const tabs = await waitForJson(`http://127.0.0.1:${debugPort}/json`);
    const pageTab = tabs.find((item) => item.url === `${origin}/index.html`) || tabs.find((item) => item.type === 'page') || tabs[0];
    const cdp = cdpConnect(pageTab.webSocketDebuggerUrl);
    await cdp.ready;
    await cdp.send('Runtime.enable');
    await cdp.send('Page.enable');
    await cdp.send('Page.navigate', { url: `${origin}/index.html` });
    await wait(2500);

    await evaluate(cdp, `
      new Promise((resolve, reject) => {
        const link = document.querySelector('.mobile-menu a[href^="about.html"]');
        if (!link) reject(new Error('About link missing'));
        link.click();
        setTimeout(resolve, 2200);
      })
    `);

    const result = await evaluate(cdp, `JSON.stringify({
      url: location.pathname,
      heading: document.querySelector('main h1')?.textContent.trim(),
      headingOpacity: getComputedStyle(document.querySelector('main h1')).opacity,
      aboutCssLoaded: !!document.querySelector('link[href*="css/pages/about.css"]'),
      methodDisplay: getComputedStyle(document.querySelector('.about-method__list')).display,
      mainTextLength: document.querySelector('main')?.innerText.trim().length || 0
    })`);

    const parsed = JSON.parse(result);
    if (parsed.url !== '/about.html') {
      throw new Error(`Expected Barba click to reach /about.html, got ${parsed.url}`);
    }
    if (Number(parsed.headingOpacity) < 0.95) {
      throw new Error(`Expected transitioned page heading to be visible, got opacity ${parsed.headingOpacity}`);
    }
    if (!parsed.aboutCssLoaded) {
      throw new Error('Expected Barba navigation to load about.css into the current document head');
    }
    if (parsed.methodDisplay !== 'grid') {
      throw new Error(`Expected about.css layout to apply, got method display ${parsed.methodDisplay}`);
    }
    if (parsed.mainTextLength < 100) {
      throw new Error(`Expected transitioned page content text, got length ${parsed.mainTextLength}`);
    }

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await cdp.send('Page.navigate', { url: `${origin}/about.html` });
    await wait(2500);

    const mobileResult = await evaluate(cdp, `JSON.stringify({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      navCtaDisplay: getComputedStyle(document.querySelector('.nav__cta')).display,
      hamburgerDisplay: getComputedStyle(document.querySelector('.nav__hamburger')).display,
      leadRight: document.querySelector('.about-hero__lead').getBoundingClientRect().right
    })`);
    const mobileParsed = JSON.parse(mobileResult);

    if (mobileParsed.scrollWidth > mobileParsed.innerWidth) {
      throw new Error(`Expected no mobile horizontal overflow, got scrollWidth ${mobileParsed.scrollWidth} for viewport ${mobileParsed.innerWidth}`);
    }
    if (mobileParsed.navCtaDisplay !== 'none') {
      throw new Error(`Expected mobile nav CTA to be hidden, got display ${mobileParsed.navCtaDisplay}`);
    }
    if (mobileParsed.hamburgerDisplay === 'none') {
      throw new Error('Expected mobile hamburger to be visible');
    }
    if (mobileParsed.leadRight > mobileParsed.innerWidth) {
      throw new Error(`Expected hero lead to fit viewport, got right edge ${mobileParsed.leadRight}`);
    }

    cdp.close();
  } finally {
    chrome.kill();
    server.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
