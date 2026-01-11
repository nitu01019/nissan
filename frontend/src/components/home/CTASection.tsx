"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/95 via-secondary-900/80 to-primary-900/90" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold mb-6">
              Visit Us Today
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Find Your
              <span className="text-primary-400"> Perfect Nissan?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Visit our showroom for an exclusive test drive experience. Our expert
              team is ready to help you find the perfect vehicle that matches your
              lifestyle and budget.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact?type=test-drive">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                >
                  Book Test Drive
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-secondary-800"
                  leftIcon={<Phone className="w-5 h-5" />}
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Phone Card */}
            <motion.a
              href="tel:+917889559631"
              whileHover={{ scale: 1.02, x: 10 }}
              className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary-500/50 transition-all group"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Call Us Now</p>
                <p className="text-white text-xl font-bold">+91 78895 59631</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 ml-auto group-hover:text-primary-400 group-hover:translate-x-2 transition-all" />
            </motion.a>

            {/* Address Card */}
            <motion.a
              href="/directions"
              whileHover={{ scale: 1.02, x: 10 }}
              className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary-500/50 transition-all group"
            >
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Visit Our Showroom</p>
                <p className="text-white font-semibold">
                  Channi Himmat, NH-1A Bypass
                </p>
                <p className="text-gray-400 text-sm">Jammu, J&K - 180015</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 ml-auto group-hover:text-primary-400 group-hover:translate-x-2 transition-all" />
            </motion.a>

            {/* Timing Card */}
            <motion.div
              whileHover={{ scale: 1.02, x: 10 }}
              className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Working Hours</p>
                <p className="text-white font-semibold">Mon - Sat: 9:30 AM - 7 PM</p>
                <p className="text-gray-400 text-sm">Sunday: 10 AM - 6 PM</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
