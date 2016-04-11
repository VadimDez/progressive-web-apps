/**
 * Created by vadimdez on 11/04/16.
 */

var cacheName = 'forecast-app-v1';
var dataCacheName = 'forecast-app-data-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic\_add\_white\_24px.svg',
  '/images/ic\_refresh\_white\_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

self.addEventListener('install', function (e) {
  console.log('ServiceWorker: install');

  e.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        console.log('ServiceWorker: Caching app shell');

        return cache.addAll(filesToCache);
      })
  )
});

self.addEventListener('activate', function (e) {
  console.log('ServiceWorker: activate');

  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        console.log('ServiceWorker: removing old cache', key);

        if (key !== cacheName) {
          return caches.delete(key);
        }
      }))
    })
  )
});

self.addEventListener('fetch', function (e) {
  console.log('ServiceWorker: fetch', e.request.url);

  var dataUrl = 'https://publicdata-weather.firebaseio.com/';

  if (e.request.url.indexOf(dataUrl) === 0) {
    e.respondWith(
      fetch(e.request)
        .then(function (response) {
          return caches.open(dataCacheName)
            .then(function (cache) {
              cache.put(e.request.url, response.clone());

              console.log('ServiceWorker: Fetched&Cached Data');

              return response;
            })
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request)
        .then(function (response) {
          return response || fetch(e.request);
        })
    );
  }
});