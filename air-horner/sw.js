/**
 * Created by vadimdez on 12/04/16.
 */

importScripts('/cache-polyfill.js');

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('airhorner')
      .then(function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/index.html?homescreen=1',
          '/?homescreen=1',
          '/styles/main.css',
          '/scripts/main.min.js',
          '/scripts/index.js',
          '/sounds/airhorn.mp3'
        ]);
      })
  )
});

self.addEventListener('fetch', function (e) {
  console.log(e.request.url);

  e.respondWith(
    caches.match(e.request)
      .then(function (response) {
        return response || fetch(e.request);
      })
  );
});