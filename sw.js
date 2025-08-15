const CACHE_NAME = 'my-wallet-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css', // If you move your CSS to a separate file
  '/script.js', // If you move your JS to a separate file
  '/favicon.ico'
];

// Install Service Worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch resources: return from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
