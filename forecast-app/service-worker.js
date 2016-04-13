/**
 * Created by vadimdez on 11/04/16.
 */

var cacheName = 'forecast-app-v1';
var dataCacheName = 'forecast-app-data-v1';
var filesToCache = [
  '/forecast-app/',
  '/forecast-app/index.html',
  '/forecast-app/index.html',
  '/forecast-app/app.js',
  '/forecast-app/styles.css',
  '/forecast-app/images/clear.png',
  '/forecast-app/images/cloudy-scattered-showers.png',
  '/forecast-app/images/cloudy.png',
  '/forecast-app/images/fog.png',
  '/forecast-app/images/ic\_add\_white\_24px.svg',
  '/forecast-app/images/ic\_refresh\_white\_24px.svg',
  '/forecast-app/images/partly-cloudy.png',
  '/forecast-app/images/rain.png',
  '/forecast-app/images/scattered-showers.png',
  '/forecast-app/images/sleet.png',
  '/forecast-app/images/snow.png',
  '/forecast-app/images/thunderstorm.png',
  '/forecast-app/images/wind.png'
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