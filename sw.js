const CACHE_NAME = "nuestro-momento-v4";
const URLS_TO_CACHE = [
  "/regalo-aniversario/regalo_aniversario.html",
  "/regalo-aniversario/manifest.json",
  "/regalo-aniversario/assets/cancion-aniversario.mp3",
  "/regalo-aniversario/assets/icon-192.png",
  "/regalo-aniversario/assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});