importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/css/animations.css',
       '/css/basic.css',
       '/css/customNotifications.css',
       '/css/gallery.css',
       '/css/hover.css',
       '/css/loading.css',
       '/css/responsive.css',
       '/css/style.css',
       '/scripts/.js',
       '/scripts/main.min.js',
       '/scripts/main.min.js',
       '/scripts/main.min.js',
     ]);
   })
 );
});