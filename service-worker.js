importScripts("precache-manifest.8de2a8c7725ef57659fe733dd2d61c1f.js", "workbox-v3.6.2/workbox-sw.js");
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

addEventListener('message', messageEvent => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
});

