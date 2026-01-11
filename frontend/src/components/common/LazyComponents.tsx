"use client";

/**
 * Lazy Loaded Components
 * 
 * Heavy components that are loaded dynamically to improve
 * initial page load performance.
 * 
 * @author Nissan Jammu Development Team
 */

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-gray-200 rounded-2xl"></div>
  </div>
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
  </div>
);

/**
 * Lazy load the Testimonials Section (has heavy animations)
 */
export const LazyTestimonialsSection = dynamic(
  () => import('@/components/home/TestimonialsSection').then(mod => mod.TestimonialsSection),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
);

/**
 * Lazy load the Compare Page (heavy component)
 */
export const LazyComparePage = dynamic(
  () => import('@/components/pages/ComparePage').then(mod => mod.ComparePage),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

/**
 * Lazy load the Accessories Page (many products)
 */
export const LazyAccessoriesPage = dynamic(
  () => import('@/components/pages/AccessoriesPage').then(mod => mod.AccessoriesPage),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

/**
 * Lazy load Google Maps iframe wrapper
 */
export const LazyGoogleMap = dynamic(
  () => import('@/components/common/GoogleMapEmbed'),
  {
    loading: () => (
      <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    ),
    ssr: false, // Maps don't need SSR
  }
);

/**
 * Lazy load the Inquiry Form (not needed on initial load)
 */
export const LazyInquirySection = dynamic(
  () => import('@/components/home/InquirySection').then(mod => mod.InquirySection),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
);

/**
 * Higher-order component for lazy loading any component
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    loading?: () => JSX.Element;
    ssr?: boolean;
  }
) {
  return dynamic(importFn, {
    loading: options?.loading || (() => <LoadingSpinner />),
    ssr: options?.ssr ?? true,
  });
}

export default {
  LazyTestimonialsSection,
  LazyComparePage,
  LazyAccessoriesPage,
  LazyGoogleMap,
  LazyInquirySection,
};
