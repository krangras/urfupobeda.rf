const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'probability-qa-'));
let chrome, socket;
const watchdog = setTimeout(() => { console.error('Browser QA exceeded 90 seconds'); chrome?.kill(); process.exit(1); }, 90000);
const server = http.createServer((req, res) => {
  const name = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '/index.html'));
  if (!name.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
  fs.readFile(name, (error, body) => { res.writeHead(error ? 404 : 200, { 'Content-Type': mime[path.extname(name)] || 'application/octet-stream' }); res.end(error ? '' : body); });
});
async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  console.log('QA HTTP server ready on', port);
  const probe = http.createServer();
  await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve));
  const cdpPort = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--disable-background-networking', '--disable-extensions',
    `--remote-debugging-port=${cdpPort}`, `--user-data-dir=${profile}`, 'about:blank'
  ], { stdio: 'ignore', windowsHide: true });
  console.log('QA Chrome launched:', chrome.pid, 'CDP:', cdpPort);
  chrome.on('error', error => { console.error(error.message); });
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${cdpPort}/json/list`, { signal: AbortSignal.timeout(1000) })).json(); if (targets.length) break; } catch {}
    await delay(100);
  }
  assert.ok(targets?.length, 'Chrome CDP did not start');
  console.log('CDP targets ready');
  socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  console.log('CDP websocket ready');
  let id = 0;
  const pending = new Map(), errors = [];
  socket.onmessage = event => {
    const msg = JSON.parse(event.data);
    if (msg.id) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p?.reject(msg.error) : p?.resolve(msg.result); }
    if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => { const current = ++id; const timer = setTimeout(() => reject(new Error('CDP timeout: '+method)), 30000); pending.set(current, { resolve(value) { clearTimeout(timer); resolve(value); }, reject(error) { clearTimeout(timer); reject(error); } }); socket.send(JSON.stringify({ id: current, method, params })); });
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || 'Browser evaluation failed');
    return result.result.value;
  };
  const waitFor = async (expression, label, timeout = 25000) => {
    const start = Date.now();
    while (Date.now()-start < timeout) { if (await evaluate(expression)) return; await delay(100); }
    throw new Error('Timed out: ' + label);
  };
  await call('Runtime.enable');
  await call('Page.enable');
  await call('Emulation.setTimezoneOverride', { timezoneId: 'Asia/Yekaterinburg' });
  await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await call('Page.addScriptToEvaluateOnNewDocument', {source: "window.auditTimers=[]; const originalInterval=window.setInterval; window.setInterval=(fn,ms,...args)=>{window.auditTimers.push({fn,ms});return originalInterval(fn,ms,...args)};"});
  await call('Page.navigate', { url: `http://127.0.0.1:${port}/` });
  await waitFor("document.readyState==='complete' && !!window.ProbabilityCourse && !!window.CourseNavigation", 'app initialization');
  await require('./browser-regressions.cjs')({evaluate,call,waitFor,delay,assert,errors});
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  clearTimeout(watchdog);
  socket?.close();
  chrome?.kill();
  server.closeAllConnections();
  server.close();
  // Only remove the dedicated temporary profile created by this script.
  await delay(500);
  if (profile.startsWith(path.join(os.tmpdir(), 'probability-qa-'))) fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
});
