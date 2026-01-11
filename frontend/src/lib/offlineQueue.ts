/**
 * Offline Request Queue System
 * 
 * Caches API requests when offline and syncs when back online.
 * Works with the service worker for seamless offline experience.
 * 
 * @author Nissan Jammu Development Team
 */

interface QueuedRequest {
  id: string;
  url: string;
  method: string;
  data: Record<string, unknown>;
  timestamp: number;
  retryCount: number;
}

const DB_NAME = 'nissan-offline-queue';
const DB_VERSION = 1;
const STORE_NAME = 'pending-requests';
const MAX_RETRIES = 3;

class OfflineQueue {
  private db: IDBDatabase | null = null;
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private syncInProgress: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private async init() {
    try {
      this.db = await this.openDatabase();
      
      // Listen for online/offline events
      window.addEventListener('online', () => {
        console.log('[OfflineQueue] Back online - syncing...');
        this.isOnline = true;
        this.syncPendingRequests();
      });

      window.addEventListener('offline', () => {
        console.log('[OfflineQueue] Gone offline');
        this.isOnline = false;
      });

      // Initial sync if online
      if (this.isOnline) {
        this.syncPendingRequests();
      }
    } catch (error) {
      console.error('[OfflineQueue] Failed to initialize:', error);
    }
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('url', 'url', { unique: false });
        }
      };
    });
  }

  /**
   * Queue a request for later processing
   */
  async queueRequest(url: string, method: string, data: Record<string, unknown>): Promise<string> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const request: QueuedRequest = {
      id,
      url,
      method,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    };

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const addRequest = store.add(request);

      addRequest.onsuccess = () => {
        console.log('[OfflineQueue] Request queued:', id);
        resolve(id);
      };
      addRequest.onerror = () => reject(addRequest.error);
    });
  }

  /**
   * Get all pending requests
   */
  async getPendingRequests(): Promise<QueuedRequest[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Remove a request from the queue
   */
  async removeRequest(id: string): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Update retry count for a request
   */
  async updateRetryCount(id: string, retryCount: number): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const request = getRequest.result;
        if (request) {
          request.retryCount = retryCount;
          store.put(request);
        }
        resolve();
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  /**
   * Sync all pending requests to the server
   */
  async syncPendingRequests(): Promise<{ success: number; failed: number }> {
    if (this.syncInProgress || !this.isOnline) {
      return { success: 0, failed: 0 };
    }

    this.syncInProgress = true;
    let success = 0;
    let failed = 0;

    try {
      const pending = await this.getPendingRequests();
      console.log(`[OfflineQueue] Syncing ${pending.length} pending requests...`);

      for (const request of pending) {
        try {
          const response = await fetch(request.url, {
            method: request.method,
            headers: {
              'Content-Type': 'application/json',
              'X-Offline-Sync': 'true',
              'X-Original-Timestamp': request.timestamp.toString(),
            },
            body: JSON.stringify(request.data),
          });

          if (response.ok) {
            await this.removeRequest(request.id);
            success++;
            console.log(`[OfflineQueue] Synced: ${request.id}`);
          } else if (response.status >= 400 && response.status < 500) {
            // Client error - don't retry
            await this.removeRequest(request.id);
            failed++;
            console.warn(`[OfflineQueue] Request failed (client error): ${request.id}`);
          } else {
            // Server error - retry later
            if (request.retryCount >= MAX_RETRIES) {
              await this.removeRequest(request.id);
              failed++;
              console.warn(`[OfflineQueue] Max retries reached: ${request.id}`);
            } else {
              await this.updateRetryCount(request.id, request.retryCount + 1);
            }
          }
        } catch (error) {
          console.error(`[OfflineQueue] Sync error for ${request.id}:`, error);
          if (request.retryCount >= MAX_RETRIES) {
            await this.removeRequest(request.id);
            failed++;
          } else {
            await this.updateRetryCount(request.id, request.retryCount + 1);
          }
        }
      }

      // Notify user of sync results
      if (success > 0) {
        this.notifyUser(`${success} pending request(s) synced successfully!`);
      }

    } finally {
      this.syncInProgress = false;
    }

    return { success, failed };
  }

  /**
   * Check if there are pending requests
   */
  async hasPendingRequests(): Promise<boolean> {
    const pending = await this.getPendingRequests();
    return pending.length > 0;
  }

  /**
   * Get pending request count
   */
  async getPendingCount(): Promise<number> {
    const pending = await this.getPendingRequests();
    return pending.length;
  }

  /**
   * Check if currently online
   */
  getOnlineStatus(): boolean {
    return this.isOnline;
  }

  /**
   * Notify user (can be customized)
   */
  private notifyUser(message: string) {
    // Dispatch custom event for UI to handle
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('offlineQueueSync', { detail: { message } }));
    }
  }
}

// Singleton instance
export const offlineQueue = typeof window !== 'undefined' ? new OfflineQueue() : null;

/**
 * Helper function to make API requests with offline support
 */
export async function fetchWithOfflineSupport(
  url: string,
  options: RequestInit & { data?: Record<string, unknown> } = {}
): Promise<Response | { queued: true; id: string }> {
  const { data, ...fetchOptions } = options;

  // If online, try normal fetch
  if (navigator.onLine) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        body: data ? JSON.stringify(data) : fetchOptions.body,
      });
      return response;
    } catch (error) {
      // Network error - queue the request
      if (offlineQueue && data && ['POST', 'PUT', 'PATCH'].includes(options.method || 'GET')) {
        const id = await offlineQueue.queueRequest(url, options.method || 'POST', data);
        return { queued: true, id };
      }
      throw error;
    }
  }

  // If offline and it's a write request, queue it
  if (offlineQueue && data && ['POST', 'PUT', 'PATCH'].includes(options.method || 'GET')) {
    const id = await offlineQueue.queueRequest(url, options.method || 'POST', data);
    return { queued: true, id };
  }

  throw new Error('You are offline. Please try again when connected.');
}

export default offlineQueue;
