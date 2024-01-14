
let APP = 'cybersecurity-glossary-v1';

let ASSETS = [
    './',
    './index.html',
    './assets/script.js',
    './assets/style.css',
    './assets/images/tux.svg'
]

/**
 * Start the service and cache ASSETS.
 */
self.addEventListener('install', installEvent => {
    installEvent.waitUntil(caches.open(APP).then(cache => {
        cache.addAll(ASSETS)
    }))
});

/**
 * For offline mode
 */
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
    }))
});