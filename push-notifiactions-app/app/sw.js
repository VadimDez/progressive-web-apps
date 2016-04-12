'use strict';

var gcmKey = 'AIzaSyDh8ezarYpje3UaKBoacX2PW34pvQ2Crnw';
var projectId = 'push-notifications-app-1278';

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

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click, tag:', event.notification.tag);

  event.notification.close();

  var url = 'https://google.com';

  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
      .then(function (windowClients) {
        windowClients.forEach(function (windowClient) {
          if (windowClient.url === url && 'focus' in windowClient) {
            return windowClient.focus();
          }
        });

        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  )
});
/*

 https://android.googleapis.com/gcm/send/fVJwdWpt4Zg:APA91bHgR6ptek3yUHaqLHhcbl9bv5XpyoF44kOg8AR20ezNdf85y3bCq5C3e-650fHyzpg4tOPpokDONj-1t6vynP7ECi4xw5zaTVX6yIqwurYbECy_SC5njuWM9ATjdFHkMhFcQRKL

curl --header 'Authorization: key=AIzaSyDh8ezarYpje3UaKBoacX2PW34pvQ2Crnw' --header 'Content-Type: application/json' https://android.googleapis.com/gcm/send -d '{"registration_ids":["fVJwdWpt4Zg:APA91bHgR6ptek3yUHaqLHhcbl9bv5XpyoF44kOg8AR20ezNdf85y3bCq5C3e-650fHyzpg4tOPpokDONj-1t6vynP7ECi4xw5zaTVX6yIqwurYbECy_SC5njuWM9ATjdFHkMhFcQRKL"]}'
*/