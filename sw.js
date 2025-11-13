const CACHE_NAME = 'magazzino-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://unpkg.com/quagga@0.12.1/dist/quagga.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log('Installazione SW fallita:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Restituisci la risorsa cacheata se esiste, altrimenti vai in rete
        return response || fetch(event.request);
      })
  );
});