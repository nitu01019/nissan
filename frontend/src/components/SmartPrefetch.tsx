"use client";

/**
 * Smart Prefetch Component
 * 
 * Provides intelligent prefetching strategies:
 * - Prefetch on hover (desktop)
 * - Prefetch on viewport intersection (mobile)
 * - Prefetch critical pages on idle
 * - Communicates with Service Worker for caching
 * 
 * @author Nissan Development Team
 */

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

// Critical pages to prefetch on idle
const CRITICAL_PAGES = [
  "/cars",
  "/cars/nissan-magnite",
  "/cars/nissan-kicks",
  "/contact",
  "/services",
];

// Pages to prefetch based on current page context
const CONTEXTUAL_PREFETCH: Record<string, string[]> = {
  "/": ["/cars", "/contact", "/services", "/offers"],
  "/cars": ["/cars/nissan-magnite", "/cars/nissan-kicks", "/cars/nissan-x-trail", "/compare"],
  "/services": ["/contact", "/accessories"],
  "/accessories": ["/cars", "/contact"],
  "/compare": ["/cars", "/contact"],
};

// Debounce delay in ms
const PREFETCH_DEBOUNCE = 100;

export function SmartPrefetch() {
  const router = useRouter();
  const prefetchedUrls = useRef<Set<string>>(new Set());
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Prefetch pages via Next.js router with deduplication
  const prefetchPages = useCallback((pages: string[]) => {
    pages.forEach((page) => {
      if (!prefetchedUrls.current.has(page)) {
        prefetchedUrls.current.add(page);
        router.prefetch(page);
      }
    });
  }, [router]);

  // Send prefetch request to Service Worker
  const swPrefetch = useCallback((pages: string[]) => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "PREFETCH_PAGES",
        pages,
      });
    }
  }, []);

  // Prefetch on idle
  useEffect(() => {
    const prefetchOnIdle = () => {
      // Use requestIdleCallback for non-blocking prefetch
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
          prefetchPages(CRITICAL_PAGES);
          swPrefetch(CRITICAL_PAGES);
        });
      } else {
        // Fallback for Safari
        setTimeout(() => {
          prefetchPages(CRITICAL_PAGES);
          swPrefetch(CRITICAL_PAGES);
        }, 2000);
      }
    };

    // Wait for page to be fully loaded
    if (document.readyState === "complete") {
      prefetchOnIdle();
    } else {
      window.addEventListener("load", prefetchOnIdle);
      return () => window.removeEventListener("load", prefetchOnIdle);
    }
  }, [prefetchPages, swPrefetch]);

  // Contextual prefetch based on current page
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pagesToPrefetch = CONTEXTUAL_PREFETCH[currentPath];
    
    if (pagesToPrefetch) {
      // Delay contextual prefetch to not block initial render
      const timer = setTimeout(() => {
        prefetchPages(pagesToPrefetch);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [prefetchPages]);

  // Setup hover prefetching for links with debouncing and safety checks
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      
      // Safety check: ensure target is an Element with closest method
      if (!target || !(target instanceof Element)) {
        return;
      }
      
      // Debounce prefetching
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      debounceTimerRef.current = setTimeout(() => {
        try {
          const link = target.closest("a[href^='/']") as HTMLAnchorElement | null;
          
          if (link && link.href) {
            const url = new URL(link.href);
            const pathname = url.pathname;
            
            // Only prefetch if not already prefetched and same origin
            if (url.origin === window.location.origin && !prefetchedUrls.current.has(pathname)) {
              prefetchedUrls.current.add(pathname);
              router.prefetch(pathname);
            }
          }
        } catch {
          // Silently ignore any errors during prefetching
        }
      }, PREFETCH_DEBOUNCE);
    };

    // Use event delegation for efficiency
    document.addEventListener("mouseenter", handleMouseEnter, { capture: true, passive: true });
    
    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, { capture: true });
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [router]);

  // Intersection Observer for mobile - prefetch links in viewport
  useEffect(() => {
    // Only on mobile/touch devices
    if (typeof window === "undefined" || !("ontouchstart" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute("href");
            if (href && href.startsWith("/") && !prefetchedUrls.current.has(href)) {
              prefetchedUrls.current.add(href);
              router.prefetch(href);
              observer.unobserve(link);
            }
          }
        });
      },
      { rootMargin: "100px" }
    );

    // Observe internal links
    const timer = setTimeout(() => {
      document.querySelectorAll("a[href^='/']").forEach((link) => {
        observer.observe(link);
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [router]);

  return null;
}

export default SmartPrefetch;
