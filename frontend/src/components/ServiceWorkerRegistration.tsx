"use client";

/**
 * Service Worker Registration Component
 * 
 * Registers the service worker for:
 * - Offline support
 * - Caching static assets
 * - Background sync
 * - Push notifications
 * 
 * @author Nissan Development Team
 */

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register in production and if supported
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Wait for the page to load
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none",
          });

          console.log("[App] Service Worker registered:", registration.scope);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Check every hour

          // Handle updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New content available, show refresh prompt if needed
                  console.log("[App] New content available, refresh to update");
                }
              });
            }
          });
        } catch (error) {
          console.error("[App] Service Worker registration failed:", error);
        }
      });

      // Handle controller change (when new SW takes over)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[App] Service Worker controller changed");
      });
    }
  }, []);

  return null;
}

export default ServiceWorkerRegistration;
