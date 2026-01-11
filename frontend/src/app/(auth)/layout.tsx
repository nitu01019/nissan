"use client";

/**
 * Auth Layout
 * 
 * Layout for authentication pages (login, signup, etc.)
 * Dark theme with Nissan branding
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30"
          >
            <span className="text-white font-bold text-xl">N</span>
          </motion.div>
          <div>
            <h1 className="text-white font-bold text-lg">Nissan Jammu</h1>
            <p className="text-gray-400 text-xs">Channi Himmat</p>
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <p className="text-gray-500 text-sm">
          © 2024 Nissan Jammu. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
