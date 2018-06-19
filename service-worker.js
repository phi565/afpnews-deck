importScripts("precache-manifest.8603348d5456fbc97312a17166e3081b.js", "workbox-v3.2.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.2.0"});
workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https://api.afp.com/objects/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'afpnews-assets',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60
      })
    ]
  })
)

// self.addEventListener('push', event => {
//   const title = 'Get Started With Workbox'
//   const options = {
//     body: event.data.text()
//   }
//   event.waitUntil(self.registration.showNotification(title, options))
// })

workbox.precaching.precacheAndRoute(self.__precacheManifest)

