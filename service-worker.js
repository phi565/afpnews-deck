importScripts("precache-manifest.7d053bd7e7cdfbea8440f9d5f5667648.js", "workbox-v3.6.2/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.2"});
workbox.core.setCacheNameDetails({prefix: 'afpnews-deck'});

workbox.routing.registerRoute(
  /https:\/\/api.afp.com\/objects\//,
  workbox.strategies.cacheFirst({
    cacheName: 'afpnews-assets',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
        purgeOnQuotaError: true
      }),
      new workbox.backgroundSync.Plugin('afpnews-assets-queue', {
        maxRetentionTime: 30 // Retry for max of 30 minutes
      })
    ]
  }), 'GET'
);

workbox.googleAnalytics.initialize();

self.addEventListener('message', event => {
  if (!event.data){
    return;
  }

  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});

