// Add JS here
// register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service worker registered!'))
        .catch(err => console.log(`Service worker not registered ${err}`))
    })
  }
  
  
  // install event
  self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js'
        ])  
      })
    )
  });
  
  // fetch event
  self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request).then(res => {
        return res || fetch(e.request)
      })
    )
  });
