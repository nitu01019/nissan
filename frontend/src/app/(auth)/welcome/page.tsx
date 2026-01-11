"use client";

/**
 * Welcome Page - Landing page for new users
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Shield, Star, Zap } from 'lucide-react';

export default function WelcomePage() {
  const features = [
    { icon: Car, title: 'Browse Cars', desc: 'Explore our complete range' },
    { icon: Zap, title: 'Quick Booking', desc: 'Book test drives instantly' },
    { icon: Shield, title: 'Secure', desc: 'Your data is protected' },
    { icon: Star, title: 'Best Deals', desc: 'Exclusive member offers' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-lg text-center"
    >
      {/* Hero */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-600/40">
          <span className="text-white font-bold text-4xl">N</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">
          Welcome to<br />
          <span className="text-red-500">Nissan Jammu</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Your authorized Nissan dealer in Channi Himmat
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4"
          >
            <feature.icon className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
            <p className="text-gray-500 text-xs mt-1">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-3"
      >
        <Link href="/signup" className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>

        <Link href="/login" className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gray-800/50 border border-gray-700 text-white font-semibold py-4 rounded-xl hover:bg-gray-700/50 transition-all"
          >
            I already have an account
          </motion.button>
        </Link>

        <Link href="/" className="block">
          <button className="text-gray-500 hover:text-gray-300 text-sm transition-colors mt-4">
            Continue as guest →
          </button>
        </Link>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 flex items-center justify-center gap-6 text-gray-500 text-xs"
      >
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4" />
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>Trusted</span>
        </div>
        <div className="flex items-center gap-1">
          <Car className="w-4 h-4" />
          <span>Authorized</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
