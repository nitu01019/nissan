/**
 * Service Worker for Nissan Channi Himmat Website
 * 
 * Features:
 * - Offline support with cached pages
 * - Cache-first strategy for static assets
 * - Network-first strategy for API calls
 * - Background sync for form submissions
 * 
 * @author Nissan Development Team
 */

const CACHE_NAME = 'nissan-channi-v2';
const OFFLINE_URL = '/offline.html';

// Static assets to cache immediately on install (critical pages)
const STATIC_ASSETS = [
  '/',
  '/cars',
  '/accessories',
  '/services',
  '/contact',
  '/directions',
  '/about',
  '/compare',
  '/offers',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
  '/images/placeholder.jpg',
];

// Car detail pages to prefetch (high-traffic pages)
const CAR_PAGES = [
  '/cars/nissan-magnite',
  '/cars/nissan-kicks',
  '/cars/nissan-x-trail',
  '/cars/nissan-sunny',
  '/cars/nissan-terrano',
  '/cars/nissan-micra',
];

// Runtime cache limits
const CACHE_LIMITS = {
  images: 100,
  pages: 50,
  static: 100,
};

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first - for static assets
  cacheFirst: async (request) => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return new Response('Network error', { status: 408 });
    }
  },

  // Network first - for dynamic content
  networkFirst: async (request) => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }
      // Return offline page for navigation requests
      if (request.mode === 'navigate') {
        return cache.match(OFFLINE_URL);
      }
      return new Response('Offline', { status: 503 });
    }
  },

  // Stale while revalidate - for images
  staleWhileRevalidate: async (request) => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => cached);

    return cached || fetchPromise;
  },
};

// Install event - cache static assets and car pages
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker v2...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[SW] Caching static assets');
      await cache.addAll(STATIC_ASSETS);
      
      // Prefetch car pages in background (non-blocking)
      console.log('[SW] Prefetching car detail pages...');
      for (const page of CAR_PAGES) {
        try {
          await cache.add(page);
        } catch (e) {
          console.log('[SW] Failed to prefetch:', page);
        }
      }
    }).then(() => {
      // Activate immediately
      self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker v2...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      // Take control of all clients immediately
      self.clients.claim();
    })
  );
});

// Trim cache to prevent unlimited growth
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    console.log(`[SW] Trimming cache: ${keys.length} -> ${maxItems}`);
    for (let i = 0; i < keys.length - maxItems; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// Fetch event - handle requests with appropriate strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (except images from allowed domains)
  if (url.origin !== self.location.origin) {
    // Cache external images (Unsplash, etc.)
    if (request.destination === 'image') {
      event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
    }
    return;
  }

  // API requests - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
    return;
  }

  // Static assets - cache first
  if (
    url.pathname.match(/\.(js|css|woff2?|ttf|otf|eot)$/) ||
    url.pathname.startsWith('/_next/static/')
  ) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
    return;
  }

  // Images - stale while revalidate
  if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/)) {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
    return;
  }

  // HTML pages - network first with offline fallback
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
    return;
  }

  // Default - network first
  event.respondWith(CACHE_STRATEGIES.networkFirst(request));
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'inquiry-sync') {
    event.waitUntil(syncInquiries());
  }
});

// Sync pending inquiries when back online
async function syncInquiries() {
  try {
    const db = await openDB();
    const pendingInquiries = await db.getAll('pending-inquiries');
    
    for (const inquiry of pendingInquiries) {
      try {
        const response = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiry.data),
        });
        
        if (response.ok) {
          await db.delete('pending-inquiries', inquiry.id);
        }
      } catch (error) {
        console.error('[SW] Failed to sync inquiry:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Sync error:', error);
  }
}

// Simple IndexedDB wrapper for offline data
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('nissan-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve({
      db: request.result,
      getAll: (store) => new Promise((res, rej) => {
        const tx = request.result.transaction(store, 'readonly');
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
      }),
      delete: (store, key) => new Promise((res, rej) => {
        const tx = request.result.transaction(store, 'readwrite');
        const req = tx.objectStore(store).delete(key);
        req.onsuccess = () => res();
        req.onerror = () => rej(req.error);
      }),
    });
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending-inquiries')) {
        db.createObjectStore('pending-inquiries', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title || 'Nissan Channi Himmat', {
        body: data.body || 'You have a new notification',
        icon: '/icons/icon-192x192.svg',
        badge: '/icons/icon-192x192.svg',
        data: data.url || '/',
      })
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});

// Message handler for prefetching from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PREFETCH_PAGES') {
    const pages = event.data.pages || [];
    console.log('[SW] Prefetch request received for:', pages);
    
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const page of pages) {
        try {
          const response = await fetch(page, { priority: 'low' });
          if (response.ok) {
            await cache.put(page, response);
            console.log('[SW] Prefetched:', page);
          }
        } catch (e) {
          // Silently fail - prefetch is best-effort
        }
      }
      // Trim cache after prefetching
      trimCache(CACHE_NAME, CACHE_LIMITS.pages);
    });
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic cache cleanup (every 24 hours of SW running)
setInterval(() => {
  console.log('[SW] Running periodic cache cleanup...');
  trimCache(CACHE_NAME, CACHE_LIMITS.pages);
}, 24 * 60 * 60 * 1000);

console.log('[SW] Service Worker v2 loaded');
