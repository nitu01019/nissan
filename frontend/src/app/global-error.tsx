"use client";

/**
 * Global Error Handler
 * 
 * This catches errors in the root layout.
 * It must include its own <html> and <body> tags.
 */

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Critical Error
          </h1>
          <p className="text-gray-600 mb-6">
            A critical error occurred. Please refresh the page or try again later.
          </p>

          {/* Error Digest */}
          {error.digest && (
            <p className="text-xs text-gray-400 mb-6">
              Error ID: {error.digest}
            </p>
          )}

          {/* Retry Button */}
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh Page
          </button>

          {/* Contact */}
          <p className="mt-6 text-sm text-gray-500">
            Contact Support:{" "}
            <a
              href="tel:+917889559631"
              className="text-red-600 font-medium hover:underline"
            >
              +91 78895 59631
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
