/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable experimental features for faster loading
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@headlessui/react'],
    // PPR requires Next.js canary - commented for stable version
    // ppr: 'incremental',
    // Turbo for faster builds
    // turbotrace: { logLevel: 'error' },
  },

  // Static generation settings for scalability
  // Pages will be statically generated at build time
  // output: 'standalone', // Enable for Docker/containerized deployments
  
  // Generate static pages for better performance
  generateBuildId: async () => {
    // Use timestamp for unique build IDs
    return `build-${Date.now()}`;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.nissan.in",
      },
      {
        protocol: "https",
        hostname: "www.nissan.com",
      },
      {
        protocol: "https",
        hostname: "www-asia.nissan-cdn.net",
      },
      {
        protocol: "https",
        hostname: "cdn.imagin.studio",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize for millions of users
    unoptimized: false,
  },
  
  compress: true,
  poweredByHeader: false,
  
  // Enable production source maps for debugging
  productionBrowserSourceMaps: false,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Headers for caching, performance, and security
  async headers() {
    return [
      // Static assets - immutable, 1 year cache
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // JS/CSS bundles - immutable, 1 year cache
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Next.js static files - immutable
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Fonts - long cache with stale-while-revalidate
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400, immutable',
          },
        ],
      },
      // HTML pages - stale-while-revalidate for instant loads with background refresh
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/cars',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/cars/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=21600, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=21600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/about',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=604800, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/directions',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=604800, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/services',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=43200, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=43200, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/accessories',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=43200, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=43200, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/offers',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=1800, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/contact',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/compare',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), camera=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Content Security Policy - comprehensive protection
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com data:",
              "connect-src 'self' https://www.google-analytics.com https://maps.googleapis.com https://*.googleapis.com wss: ws: http://localhost:* https://jamkashnissan.com https://nissanjammu.com",
              "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none', // Required for external images/maps
          },
        ],
      },
    ];
  },
};

export default nextConfig;
