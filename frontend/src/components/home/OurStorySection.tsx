"use client";

/**
 * Our Story Section
 * 
 * About Nissan Dealer - Company history, legacy, and achievements.
 * Displayed just before the footer on the homepage.
 * 
 * @author Nissan Jammu Development Team
 */

import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Calendar, MapPin, TrendingUp, Shield } from "lucide-react";

const stats = [
  { icon: Calendar, value: "20+", label: "Years of Excellence" },
  { icon: Users, value: "50,000+", label: "Happy Customers" },
  { icon: Award, value: "#1", label: "Dealer in Region" },
  { icon: TrendingUp, value: "100%", label: "Customer Satisfaction" },
];

const highlights = [
  "Highest selling dealership in Region North 2 (Punjab & J&K)",
  "State-of-the-art service center with modern equipment",
  "Trained workforce ensuring flawless operations",
  "Genuine Nissan parts and accessories",
  "Transparent pricing with best finance options",
  "24/7 roadside assistance support",
];

export const OurStorySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Nissan Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block">
            <h2 className="text-5xl md:text-7xl font-light tracking-[0.3em] text-white mb-4">
              NISSAN
            </h2>
          </div>
        </motion.div>

        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            NISSAN - Channi Himmat, Jammu
          </h3>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>NH-1A Bypass Road, Jammu - 180015</span>
          </div>
        </motion.div>

        {/* Our Story Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h4 className="text-3xl md:text-4xl font-bold text-white">
            Our Story, Your Journey
          </h4>
        </motion.div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Part of a <span className="text-white font-semibold">30-year old legacy</span>, 
              our dealership has been serving customers since the past 20+ years. 
              In fact, we are the <span className="text-primary-400 font-semibold">highest selling dealership</span> in the 
              Region North 2 which comprises of Punjab and Jammu & Kashmir.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Situated at Channi Himmat, Jammu, we 
              commenced business on <span className="text-white font-semibold">28th Nov 2002</span>, 
              and have been providing high quality services to our valued customers ever since.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Our workforce undergoes frequent training to 
              ensure flawless operations be it new sales or service. The dealership 
              is further backed by <span className="text-white font-semibold">modern equipment and latest machinery</span> that 
              catalyzes super performance and customer satisfaction.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 text-center border border-white/10 hover:border-primary-500/50 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h5 className="text-xl font-semibold text-white text-center mb-6">
            Why Choose Us?
          </h5>
          <div className="grid md:grid-cols-2 gap-3">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/5"
              >
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-3.5 h-3.5 text-green-400" />
                </div>
                <span className="text-gray-300 text-sm">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;
