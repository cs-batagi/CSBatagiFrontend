importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "__FIREBASE_API_KEY__",
  authDomain: "__FIREBASE_AUTH_DOMAIN__",
  projectId: "__FIREBASE_PROJECT_ID__",
  messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
  appId: "__FIREBASE_APP_ID__"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'images/BatakLogo192.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

const CACHE_NAME = 'csbatagi-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/table-styles.css',
  '/scripts/MainScript.js',
  '/scripts/attendance.js',
  '/scripts/statsTables.js',
  '/scripts/sonMac.js',
  '/scripts/duello.js',
  '/scripts/teamPicker.js',
  '/scripts/players.js',
  '/scripts/performanceGraphs.js',
  '/scripts/themeToggle.js',
  '/images/BatakLogo192.png',
  '/images/BatakLogo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => {
        console.error('Cache addAll failed:', err);
        if (err && err.name === 'TypeError') {
          // Try to identify which file failed
          Promise.all(
            urlsToCache.map(url =>
              fetch(url)
                .then(r => {
                  if (!r.ok) throw new Error(url + ' failed with status ' + r.status);
                })
                .catch(e => console.error('Failed to fetch:', url, e))
            )
          );
        }
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
}); 
