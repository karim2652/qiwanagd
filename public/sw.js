// This is the service worker with the Cache-first network

const CACHE = 'precache';
const precacheFiles = ['/', '/index.html', '/src/main.jsx', '/src/App.jsx'];

self.addEventListener('install', function (event) {
  console.log('[PWA Builder] Install Event processing');

  event.waitUntil(
    caches
      .open(CACHE)
      .then(function (cache) {
        console.log('[PWA Builder] Cached offline page during install');
        return cache.addAll(precacheFiles);
      })
      .catch(function (error) {
        console.error('[PWA Builder] Cache installation failed:', error);
      })
  );
});

// Allow sw to control of current page
self.addEventListener('activate', function (event) {
  console.log('[PWA Builder] Claiming clients for current page');
  event.waitUntil(
    self.clients.claim().catch(function (error) {
      console.error('[PWA Builder] Client claim failed:', error);
    })
  );
});

// If any fetch fails, it will look for the request in the cache
// and will return the cached response
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        console.log('[PWA Builder] add page to offline cache: ' + response.url);

        // If request was success, add or update it in the cache
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(function (error) {
        console.log('[PWA Builder] Network request Failed. Serving content from cache: ' + error);
        return fromCache(event.request).catch(function () {
          // If both network and cache fail, return a simple offline page
          return new Response('Offline page', {
            headers: { 'Content-Type': 'text/plain' },
          });
        });
      })
  );
});

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return the offline page
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject('no-match');
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches
    .open(CACHE)
    .then(function (cache) {
      return cache.put(request, response);
    })
    .catch(function (error) {
      console.error('[PWA Builder] Cache update failed:', error);
    });
}

// Handle errors that might occur during service worker execution
self.addEventListener('error', function (event) {
  console.error('[PWA Builder] Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', function (event) {
  console.error('[PWA Builder] Unhandled promise rejection:', event.reason);
});
