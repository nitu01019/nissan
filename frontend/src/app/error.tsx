"use client";

/**
 * Global Error Page
 * 
 * This page is shown when an unhandled error occurs.
 * Next.js automatically wraps this in an error boundary.
 */

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Our team has been notified and is working on a fix.
        </p>

        {/* Error Digest (for debugging) */}
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Contact Info */}
        <p className="mt-6 text-sm text-gray-500">
          Need immediate assistance? Call us at{" "}
          <a
            href="tel:+917889559631"
            className="text-primary-600 font-medium hover:underline"
          >
            +91 78895 59631
          </a>
        </p>
      </div>
    </div>
  );
}
