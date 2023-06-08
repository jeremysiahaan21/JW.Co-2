/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
self.addEventListener('install', () => {
  console.log('service worker: installed');
  self.skipWaiting();
});

self.addEventListener('push', () => {
  console.log('service worker: pushed');
});

self.addEventListener('fetch', () => {
});
