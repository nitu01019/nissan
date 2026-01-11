"use client";

/**
 * Web Vitals Reporter Component
 * 
 * Initializes Web Vitals monitoring on the client side.
 * Add this component to your layout for automatic monitoring.
 * 
 * @author Nissan Jammu Development Team
 */

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/webVitals';

export function WebVitalsReporter() {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    initWebVitals();
  }, []);

  // This component doesn't render anything
  return null;
}

export default WebVitalsReporter;
