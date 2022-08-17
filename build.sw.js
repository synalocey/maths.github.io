// 首先引入 Workbox 框架
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');

// 注册成功后要立即缓存的资源列表
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "220818"
  },
  {
    "url": "Guidebook_for_Mathematics.html",
    "revision": "220818"
  },
  {
    "url": "SI_Manage_CN.html",
    "revision": "220818"
  },
  {
    "url": "Country_List.html",
    "revision": "220818"
  }
]);

// 缓存策略
workbox.routing.registerRoute(
  new RegExp(''.*\.html'),
  workbox.strategies.staleWhileRevalidate()
);
