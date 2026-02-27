const CACHE_NAME = "studyshare-v1";
const urlsToCache = [
    "/2/",
    "/2/index.html",
    "/2/style.css",
    "/2/app.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    event.respondwith(
        caches.match(event.request).then(res => res || fetch(event.request))
    );
});
