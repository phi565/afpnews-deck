importScripts("precache-manifest.1452e65e350188829cf64a057e48a9cf.js", "workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});
workbox.core.setCacheNameDetails({ prefix: 'afpnews-deck' })

workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  ignoreUrlParametersMatching: [/.*/],
  cleanUrls: false
})

workbox.routing.registerRoute(
  /^https:\/\/api\.afp\.com\/objects\/api\/medias\?id=.*\.jpg$/,
  workbox.strategies.cacheFirst({
    cacheName: 'afpnews-assets',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 150,
        maxAgeSeconds: 24 * 60 * 60,
        purgeOnQuotaError: true
      }),
      new workbox.backgroundSync.Plugin('afpnews-assets-queue', {
        maxRetentionTime: 5 // Retry for max of 5 minutes
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  }), 'GET'
)

workbox.googleAnalytics.initialize()

self.addEventListener('message', event => {
  if (!event.data) {
    return
  }

  const { command, value } = event.data

  switch (command) {
    case 'log':
      console.log(command, value)
      break
    case 'skipWaiting':
      event.waitUntil(self.skipWaiting())
      break
    default:
      // NOOP
      break
  }
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

