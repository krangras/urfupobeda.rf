const CACHE = 'urfupobeda-ui-v5';
const scopeUrl = new URL(self.registration.scope);
const local = (path) => new URL(path, scopeUrl).toString();
const CORE = ['./', './index.html', './assets/css/style.css', './assets/css/ux-overrides.css', './src/app/app.js', './src/app/ux-enhancements.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.allSettled(CORE.map((p) => cache.add(local(p))))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  const isFreshCode = event.request.mode === 'navigate' || /\.(?:html|css|js)$/.test(url.pathname);
  if (isFreshCode) {
    event.respondWith(fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match(local('./index.html')))));
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
    return response;
  })));
});
