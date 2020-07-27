var APP_PREFIX = 'prashanth_sw_'  // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'v1.0'  // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  "https://prashanthspatil.github.io/service_worker/index.html",
  "https://prashanthspatil.github.io/service_worker/manifest.json",
  "https://prashanthspatil.github.io/service_worker/toast.css",
  "https://prashanthspatil.github.io/service_worker/style.css",
  "https://prashanthspatil.github.io/service_worker/pwa.js",
  "https://prashanthspatil.github.io/service_worker/images/icons/icon-144x144.png",
  "https://prashanthspatil.github.io/service_worker/images/logo.png",
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  // console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        // console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        // console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          // console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})