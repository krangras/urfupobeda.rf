const CACHE = 'urfupobeda-ui-v4';
const SCOPE = new URL('./', self.location.href);
const FILES = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/css/ux-overrides.css',
  './assets/img/logo.svg',
  './assets/img/agitdu/no_phone2.png',
  './src/app/app.js',
  './src/app/ux-enhancements.js',
  './src/data/conspects.js',
  './src/data/integrals_data.js',
  './src/data/semester1_data.js',
  './src/data/physics_ntk_data.js',
  './src/auth/firebase-init.js',
  './src/auth/firebase-auth.js',
  './src/auth/firebase-sync.js'
].map(path => new URL(path, SCOPE).href);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.allSettled(FILES.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(names => Promise.all(names.filter(name => name !== CACHE).map(name => caches.delete(name)))),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(SCOPE.href)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => {
        if (cached) return cached;
        if (event.request.mode === 'navigate') return caches.match(new URL('./index.html', SCOPE).href);
        return new Response('', { status: 503, statusText: 'Offline' });
      }))
  );
});
