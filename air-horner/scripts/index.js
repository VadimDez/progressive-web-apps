/**
 * Created by vadimdez on 12/04/16.
 */
(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(function () {
        console.log('service worker registered');
      });
  }
}());