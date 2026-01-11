/**
 * Web Vitals Monitoring
 * 
 * Tracks Core Web Vitals metrics for performance optimization:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * 
 * @author Nissan Jammu Development Team
 */

type MetricName = 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';

interface Metric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

type ReportHandler = (metric: Metric) => void;

/**
 * Report Web Vitals to analytics or console
 */
export function reportWebVitals(metric: Metric): void {
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    const color = metric.rating === 'good' ? '🟢' : metric.rating === 'needs-improvement' ? '🟡' : '🔴';
    console.log(`${color} ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Example: Send to custom analytics endpoint
    // fetch('/api/analytics/vitals', {
    //   method: 'POST',
    //   body: JSON.stringify(metric),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  }
}

/**
 * Initialize Web Vitals monitoring
 * Note: FID is deprecated in favor of INP (Interaction to Next Paint)
 */
export async function initWebVitals(onReport?: ReportHandler): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

    const handler: ReportHandler = onReport || reportWebVitals;

    onCLS(handler);
    onFCP(handler);
    onINP(handler);  // INP replaces FID as of March 2024
    onLCP(handler);
    onTTFB(handler);
  } catch (error) {
    console.warn('Web Vitals could not be loaded:', error);
  }
}

/**
 * Performance thresholds for Core Web Vitals
 * Note: FID is deprecated, using INP instead
 */
export const VITALS_THRESHOLDS: Record<string, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },      // ms
  CLS: { good: 0.1, poor: 0.25 },       // score
  FCP: { good: 1800, poor: 3000 },      // ms
  TTFB: { good: 800, poor: 1800 },      // ms
  INP: { good: 200, poor: 500 },        // ms (replaces FID)
};

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  name: MetricName,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = VITALS_THRESHOLDS[name];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Performance optimization tips based on metrics
 */
export const OPTIMIZATION_TIPS: Record<string, string[]> = {
  LCP: [
    'Optimize and compress images',
    'Use next/image for automatic optimization',
    'Preload critical resources',
    'Remove render-blocking resources',
  ],
  CLS: [
    'Set explicit dimensions on images and videos',
    'Reserve space for dynamic content',
    'Avoid inserting content above existing content',
    'Use transform animations instead of layout animations',
  ],
  FCP: [
    'Reduce server response time',
    'Remove render-blocking resources',
    'Inline critical CSS',
    'Preconnect to required origins',
  ],
  TTFB: [
    'Use a CDN',
    'Optimize server application code',
    'Use HTTP/2 or HTTP/3',
    'Enable compression',
  ],
  INP: [
    'Reduce JavaScript execution time',
    'Break up long tasks',
    'Avoid large DOM sizes',
    'Optimize event handlers',
  ],
};
