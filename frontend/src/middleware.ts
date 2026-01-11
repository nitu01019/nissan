/**
 * Next.js Middleware for Security
 * 
 * Provides runtime security features:
 * - Request validation
 * - Bot detection
 * - Rate limiting signals
 * - Security logging
 * 
 * @author Nissan Jammu Development Team
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Suspicious patterns to block
const SUSPICIOUS_PATTERNS = [
  /\.\.\//,                          // Path traversal
  /<script/i,                        // XSS attempts
  /javascript:/i,                    // JavaScript protocol
  /on\w+\s*=/i,                      // Event handlers
  /union\s+select/i,                 // SQL injection
  /select\s+.*\s+from/i,             // SQL injection
  /insert\s+into/i,                  // SQL injection
  /drop\s+table/i,                   // SQL injection
  /exec\s*\(/i,                      // Command injection
  /eval\s*\(/i,                      // Code injection
];

// Known bad bots (expand as needed)
const BAD_BOTS = [
  'semrush',
  'ahrefsbot',
  'dotbot',
  'mj12bot',
  'blexbot',
  'petalbot',
  'seznambot',
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  
  // Block bad bots (optional - uncomment if needed)
  // const isBadBot = BAD_BOTS.some(bot => userAgent.includes(bot));
  // if (isBadBot) {
  //   return new NextResponse('Access Denied', { status: 403 });
  // }

  // Check for suspicious patterns in URL
  const fullUrl = pathname + search;
  const isSuspicious = SUSPICIOUS_PATTERNS.some(pattern => pattern.test(fullUrl));
  
  if (isSuspicious) {
    console.warn(`[Security] Blocked suspicious request: ${fullUrl}`);
    return new NextResponse('Bad Request', { status: 400 });
  }

  // Check for overly long URLs (potential buffer overflow attempts)
  if (fullUrl.length > 2048) {
    console.warn(`[Security] Blocked oversized URL: ${fullUrl.substring(0, 100)}...`);
    return new NextResponse('URI Too Long', { status: 414 });
  }

  // Block access to sensitive files
  const sensitivePatterns = [
    /\.env/i,
    /\.git/i,
    /\.htaccess/i,
    /wp-admin/i,
    /wp-login/i,
    /phpinfo/i,
    /\.php$/i,
    /\.asp$/i,
    /\.aspx$/i,
    /web\.config/i,
  ];
  
  if (sensitivePatterns.some(pattern => pattern.test(pathname))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Add security headers to response
  const response = NextResponse.next();
  
  // Add request ID for tracking
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-ID', requestId);
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|icons|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
