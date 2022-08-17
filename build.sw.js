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

// 当浏览器解析完 SW 文件时触发 install 事件
self.addEventListener('install', function(e) {
  // install 事件中一般会将 cacheList 中要换存的内容通过 addAll 方法，请求一遍放入 caches 中
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      return cache.addAll(cacheList)
    })
  );
});

// 激活时触发 activate 事件
self.addEventListener('activate', function(e) {
  // active 事件中通常做一些过期资源释放的工作，匹配到就从 caches 中删除
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheStorageKey) {
        return caches.delete(name);
      } else {
        return Promise.resolve();
      }
    }));
  });
  e.waitUntil(
    Promise.all([cacheDeletePromises])
  );
});

// 缓存策略
workbox.routing.registerRoute(
  new RegExp(''.*\.html'),
  workbox.strategies.staleWhileRevalidate()
);
