'use strict';

self.addEventListener('install', function (e) {
  console.log('sw: install');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('sw: activate');

});

self.addEventListener('push', function (e) {
  console.log('sw: push');

  e.waitUntil(
    self.registration.showNotification('Push message', {
      body: 'The message',
      tag: 'push-tag'
    })
  );
});