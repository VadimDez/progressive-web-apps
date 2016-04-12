(function () {
  'use strict';

  if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('sw.js')
      .then(function (reg) {

        console.log(reg);

        reg.pushManager.subscribe({
          userVisibleOnly: true
        }).then(function(sub) {
          console.log('endpoint:', sub.endpoint);
        });
      })
      .catch(function (err) {
        console.error(err);
      })
  }

  document.getElementById('sendNotification').addEventListener('click', function () {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://android.googleapis.com/gcm/send/', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'key=AIzaSyDh8ezarYpje3UaKBoacX2PW34pvQ2Crnw');
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if (request.status < 200 || request.status > 300) {
          console.log('Android GCM push message request failed with status ' + xhr.status + '.');
        }
      }
    };
    var data = {'registration_ids' : [ 'fVJwdWpt4Zg:APA91bHgR6ptek3yUHaqLHhcbl9bv5XpyoF44kOg8AR20ezNdf85y3bCq5C3e-650fHyzpg4tOPpokDONj-1t6vynP7ECi4xw5zaTVX6yIqwurYbECy_SC5njuWM9ATjdFHkMhFcQRKL' ], 'to': '/', 'data' : { 'message' : 'Push message sent via Android GCM.' } };
    request.send(JSON.stringify(data));
  });
}());