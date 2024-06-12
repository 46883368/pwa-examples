self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/pwa-examples/a2hs/',
      '/pwa-examples/a2hs/index.html',
      '/pwa-examples/a2hs/index.js',
      '/pwa-examples/a2hs/style.css',
      '/pwa-examples/a2hs/images/fox1.jpg',
      '/pwa-examples/a2hs/images/fox2.jpg',
      '/pwa-examples/a2hs/images/fox3.jpg',
      '/pwa-examples/a2hs/images/fox4.jpg',
    ])),
  );
});
self.addEventListener('fetch', event => {
    // Example of handling cross-origin requests
    console.log(event.request.url+"=================");
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin || requestUrl.origin === 'https://horizon-pwa.com') {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    } else {
        // Handle other cross-origin requests
        event.respondWith(fetch(event.request));
    }
});
