// Όνομα της προσωρινής μνήμης (Cache)
const CACHE_NAME = 'cloud-music-v1';

// Λίστα αρχείων για βασική προσωρινή αποθήκευση (μόνο το κέλυφος)
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Pik-Ap-192x192.png'
];

// Εγκατάσταση του Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching Shell Assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Ενεργοποίηση και καθαρισμός παλιάς Cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Διαχείριση αιτημάτων (Fetch)
self.addEventListener('fetch', (event) => {
  // Επιτρέπουμε σε όλα τα αιτήματα να περνούν κανονικά από το δίκτυο
  // χωρίς να παρεμβαίνουμε στα δεδομένα του Google Drive.
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
