const CACHE_NAME = 'anniversary-app-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './app_icon.png',
    './bgmusic.mp3',
    './celebration.png',
    './floral_celebration.png',
    './couple.jpg',
    './couple_photo.jpg',
    './memory1.jpg',
    './memory2.jpg',
    './memory3.jpg',
    './memory4.jpg',
    './memory5.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
