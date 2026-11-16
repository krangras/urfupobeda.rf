const CACHE = 'urfupobeda-notebook-v29';
const SHELL = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/css/ux-overrides.css',
  './assets/css/probability.css',
  './assets/img/logo.svg',
  './assets/img/urfupobeda-logo.svg',
  './assets/img/urfupobeda-logo-dark.svg',
  './src/app/data-loader.js',
  './src/app/storage.js',
  './src/app/backups.js',
  './src/app/app.js',
  './src/app/ux-enhancements.js',
  './src/app/course-navigation.js',
  './src/app/probability.js',
  './src/app/probability-practice.js',
  './src/app/ticket-copy.js',
  './src/data/probability_data.js',
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
    }).catch(async () => {
      const cached = await caches.match(event.request) || await caches.match(event.request, { ignoreSearch: true });
      if (cached) return cached;
      if (isNavigation) return await caches.match('./index.html') || Response.error();
      return new Response('/* Resource unavailable offline */', { status: 503, headers: { 'Content-Type': url.pathname.endsWith('.css') ? 'text/css' : 'application/javascript' } });
    }));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response && response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone())).catch(() => {});
    return response;
  })));
});
