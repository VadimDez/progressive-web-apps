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
    request.open('POST', 'https://android.googleapis.com/gcm/send/fL-z4RbmU5Q:APA91bGfZPn71Jq-FgN_leJvV89tmI5wEmoEM_ldfCPS_P9bF1VlA6yU4NfetbmoWbErQ4_J3uYyc7wcsUNtFlSqWhk_68FADAELDo7VkwEubcII8843xhL-CSHVYYy2TgIADSiDc-ed', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'key=AIzaSyDh8ezarYpje3UaKBoacX2PW34pvQ2Crnw');
    request.send();
  });
}());