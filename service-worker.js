/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.2/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.2"});

importScripts(
  "precache-manifest.b8191665f137324107a0d5a6939be0a8.js"
);

workbox.core.setCacheNameDetails({prefix: "afpnews-deck"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/https:\/\/api.afp.com\/objects\//, workbox.strategies.staleWhileRevalidate({ "cacheName":"afpnews-assets", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"maxAgeSeconds":86400,"purgeOnQuotaError":false})] }), 'GET');
