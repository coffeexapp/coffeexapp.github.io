'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.json": "24c2e5c13bedaa3786779511d6248eb3",
"assets/AssetManifest.smcbin": "16d3a92e8229547c0c2bc43ba0e9ce98",
"assets/assets/images/aventuras.png": "fa763207c3704a21d6ef772ff8285151",
"assets/assets/images/background-history.png": "effc9929325b7a8bfe06778f7d01962f",
"assets/assets/images/background-image.png": "e253c35dd166fbf5fc4dadee7d37e3b6",
"assets/assets/images/cha.png": "8eca6734094a6b2c013d0c23726b6f19",
"assets/assets/images/coffee-main.png": "5a3d6807dbcb0ab4401ecafda2765cd4",
"assets/assets/images/coffee-one.png": "c696a47c4d218ee1d9d3cf1f3ff6ec46",
"assets/assets/images/coffee-three.png": "36e8c8a06edfee6935227746f2a434ae",
"assets/assets/images/coffee-two.png": "7717d1ff82e5f77f7f3a60b964249e88",
"assets/assets/images/coracao.png": "33a6bf19aafd40c3ce13501b4b6d6429",
"assets/assets/images/e-mail.png": "35864b9d61389345e0caac7833d134dc",
"assets/assets/images/facebook.png": "fbfccc037808942ba437c27636eea636",
"assets/assets/images/instagram.png": "efbe474c8b24eaac1c6ab3e50f2e60e1",
"assets/assets/images/insumo-one.png": "c692e6647ae33da9a62d1bbef1814ac8",
"assets/assets/images/insumo-three.png": "49e9e741a5b2ea6bf1149e4be8dbfffd",
"assets/assets/images/insumo-two.png": "8b087656b8288990f3cafac72a8babe5",
"assets/assets/images/linkedin.png": "ad9aad6af92a35a67e923b1c349c84f9",
"assets/assets/images/lupa.png": "657c1e7a4dbc0cb50d99f4825ad218c2",
"assets/assets/images/pin.png": "faa6285ef874ab711b0a88e7b4376391",
"assets/assets/images/prato.png": "eb0115ce1e8605042a228b3cb4d7da56",
"assets/assets/images/shop.png": "2faca6ada23fc6cfc66122404be4561f",
"assets/assets/images/whatsapp.png": "8c53749fd27712842305ec64688811ea",
"assets/assets/images/xicara.png": "da3f83add7c92b025a28ca5bcc4f67a9",
"assets/assets/images/youtube.png": "0e690c8b2dab52d7b4fc72933fd62f83",
"assets/assets/logos/logo.png": "90fa50e60f81e990053498b1ccab1a70",
"assets/assets/storyset/404.svg": "9ec1625b2eba5a3fd207086dfbf94e96",
"assets/assets/storyset/empty.svg": "bb744e0fbace38d6982b7034f39a2a48",
"assets/assets/storyset/error.svg": "5b5c5496cbbb63c55333f0c59e21ce22",
"assets/assets/storyset/shop.svg": "4b06163f4bef2b2c80efa46fef6add6a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "c8e8f42107815c23a70542d4697bcffe",
"assets/NOTICES": "7e8a47ec1f708f2eaa954a89d11643a9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "33935fd5c284b402d46c926a385e628a",
"/": "33935fd5c284b402d46c926a385e628a",
"main.dart.js": "b58a68c1fe328d44d05fe07c8fe11bf0",
"manifest.json": "39bd374841dc73267db087e44aa78107",
"version.json": "086256970c9de3f65271c0657c0a38a4"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
