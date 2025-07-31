const CACHE_NAME = 'voice-assistant-cache-v1';
const PRECACHE_URLS = [
  '/', // App shell
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/whisper.wasm', // Whisper WASM file
  '/coqui-tts/model.onnx', // TTS model file
  '/coqui-tts/config.json', // TTS config
  // Add more files as needed
];

// Install event: cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate event: cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch event: serve cached files if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});