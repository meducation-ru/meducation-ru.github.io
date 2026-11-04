// Офлайн: при установке кладём в кэш всё из precache.json; отдаём из кэша, в фоне обновляем.
const LIST = "precache.json";
self.addEventListener("install", e => e.waitUntil((async () => {
  const { version, files } = await (await fetch(LIST, { cache: "no-store" })).json();
  const c = await caches.open(`nabor-${version}`);
  await c.addAll([...files, LIST]);
  await self.skipWaiting();
})()));
self.addEventListener("activate", e => e.waitUntil((async () => {
  const { version } = await (await caches.match(LIST) ?? await fetch(LIST)).json().catch(() => ({}));
  for (const k of await caches.keys()) if (k.startsWith("nabor-") && k !== `nabor-${version}`) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const hit = await caches.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(async r => {
      if (r.ok) { const keys = await caches.keys(); const c = keys.find(k => k.startsWith("nabor-")); if (c) (await caches.open(c)).put(e.request, r.clone()); }
      return r;
    }).catch(() => hit);
    return hit ?? net;
  })());
});
