/**
 * Created by vadimdez on 12/04/16.
 */

importScripts('cache-polyfill.js');

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('airhorner')
      .then(function (cache) {
        return cache.addAll([
          '/progressive-web-apps/air-horner/',
          '/progressive-web-apps/air-horner/index.html',
          '/progressive-web-apps/air-horner/index.html?homescreen=1',
          '/progressive-web-apps/air-horner/?homescreen=1',
          '/progressive-web-apps/air-horner/styles/main.css',
          '/progressive-web-apps/air-horner/scripts/main.min.js',
          '/progressive-web-apps/air-horner/scripts/index.js',
          '/progressive-web-apps/air-horner/sounds/airhorn.mp3'
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