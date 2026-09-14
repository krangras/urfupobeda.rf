const CACHE = 'urfupobeda-ui-v7';
const SHELL = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/css/ux-overrides.css',
  './assets/img/logo.svg',
  './src/app/data-loader.js',
  './src/app/app.js',
  './src/app/ux-enhancements.js',
  './src/auth/firebase-init.js',
  './src/auth/firebase-auth.js',
  './src/auth/firebase-sync.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then((names) => Promise.all(names.filter((name) => (name.startsWith('marvin-') || name.startsWith('urfupobeda-')) && name !== CACHE).map((name) => caches.delete(name)))),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const isNavigation = event.request.mode === 'navigate';
  const isCode = /\.(?:html|css|js)$/.test(url.pathname);
  if (isNavigation || isCode) {
    event.respondWith(fetch(event.request).then((response) => {
      if (response && response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone())).catch(() => {});
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response && response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone())).catch(() => {});
    return response;
  })));
});
