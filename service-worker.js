importScripts("precache-manifest.9762f141c3e482a76e2e2868486a0f86.js", "workbox-v3.6.2/workbox-sw.js");
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

