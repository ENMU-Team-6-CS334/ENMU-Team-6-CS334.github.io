
self.addEventListener("install", e => {
    e.waitUntil(
      caches.open("static").then(cache => {
        return cache.addAll([
          "./",
          "./index.html",
          "./restaurant.jpg",
          "./manifest.json",
          "./sw.js",
          "./src/",
          "./src/app.js",
          "./src/dbhelper.js",
          "./src/restaurant_info.js",
          "./styles.css",
          "./payment.css",
          "./orderManagement.css",
          "./Login_Style.css",
          "./inventoryManagement.css"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", e => {
    console.log(`Intercepting fetch request for: ${e.request.url}`);
  });

