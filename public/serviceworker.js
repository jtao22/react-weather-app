const cachename = "v1";
const urlstoCACHE = ['index.html','offline.html'];

const self = this;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cachename).then((cache) => {
            console.log("hi");
            return cache.addAll(urlstoCACHE);
        })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(() => {
            return fetch(event.request).catch(() => caches.match('offline.html'))
        })
    )
});

self.addEventListener('activate', (event) => {
    const cachewl = [];
    cachewl.push(cachename);
    event.waitUntil(
        caches.keys().then((cache_names) => Promise.all(
            cache_names.map((cache_name) => {
                if(!cachewl.includes(cache_name)){
                    return caches.delete(cache_name);
                }
            })
        ))
    )
});