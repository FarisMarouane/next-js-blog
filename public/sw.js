const CACHE_NAME = 'v1';

async function cache(request, response) {
  if (response.type === 'error' || response.type === 'opaque') {
    return Promise.resolve(); // do not put in cache network errors
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    return await cache.put(request, response.clone());
  } catch (error) {
    console.log(`Error caching ${request.url}: ${error}`);
  }
}

// Useless for now, as this pre-caching approach doesn't work in a Next JS app
// self.addEventListener('install', (event) => {
//   console.log('Service Worker installing.');
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       cache
//         .addAll([
//           '/',
//           './scripts.js',
//           '/favicon.png',
//           '/about',
//           '/blog/self_care',
//           '/blog/nextJS',
//           '/blog/loremIpsum',
//         ])
//         .then((r) => r);
//     }),
//   );
// });

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      // Attempt to fetch the ressource
      try {
        const fetchResponse = await fetch(event.request);

        await cache(event.request, fetchResponse);
        return fetchResponse;
      } catch (error) {
        // No internet connection or fetch error => Response with cached ressource if it exists
        console.log('Error fetching the request', event.request.url);

        const cachedResponse = await caches.match(event.request);

        if (!cachedResponse) {
          Promise.reject(
            `No cache was found for the request:  ${event.request.url}`,
          );
        }

        return cachedResponse;
      }
    })(),
  );
});
