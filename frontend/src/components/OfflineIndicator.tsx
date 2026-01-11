"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, CloudOff, RefreshCw } from 'lucide-react';
import { offlineQueue } from '@/lib/offlineQueue';

/**
 * Offline Indicator Component
 * 
 * Shows offline status and pending sync count.
 * Displays sync progress when back online.
 */
export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [showSyncMessage, setShowSyncMessage] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    // Update pending count
    const updatePendingCount = async () => {
      if (offlineQueue) {
        const count = await offlineQueue.getPendingCount();
        setPendingCount(count);
      }
    };

    updatePendingCount();

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      updatePendingCount();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // Listen for sync events
    const handleSync = (event: CustomEvent) => {
      setSyncMessage(event.detail.message);
      setShowSyncMessage(true);
      setTimeout(() => setShowSyncMessage(false), 3000);
      updatePendingCount();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('offlineQueueSync', handleSync as EventListener);

    // Poll for pending count changes
    const interval = setInterval(updatePendingCount, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('offlineQueueSync', handleSync as EventListener);
      clearInterval(interval);
    };
  }, []);

  // Don't show anything if online and no pending requests
  if (isOnline && pendingCount === 0 && !showSyncMessage) {
    return null;
  }

  return (
    <>
      {/* Offline Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white px-4 py-2 shadow-lg"
          >
            <div className="container-custom flex items-center justify-center gap-2">
              <WifiOff className="w-5 h-5" />
              <span className="font-medium">
                You&apos;re offline. Some features may be limited.
              </span>
              {pendingCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                  {pendingCount} pending
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Requests Indicator (when online) */}
      <AnimatePresence>
        {isOnline && pendingCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 lg:bottom-4 right-4 z-[90]"
          >
            <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">
                Syncing {pendingCount} request{pendingCount > 1 ? 's' : ''}...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sync Success Message */}
      <AnimatePresence>
        {showSyncMessage && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-20 lg:bottom-4 right-4 z-[90]"
          >
            <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">{syncMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfflineIndicator;
