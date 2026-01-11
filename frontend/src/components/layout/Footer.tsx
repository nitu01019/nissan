"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube,
  ArrowRight, Send, Car, Shield, Wrench, CreditCard
} from "lucide-react";
import { footerNavigation, contactInfo } from "@/data/navigation";
import { Button } from "@/components/ui/Button";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-b from-secondary-800 to-secondary-900 text-white">
      {/* Newsletter Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-500" />
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-custom py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                Stay Updated with Latest Offers
              </h3>
              <p className="text-white/80 mt-2">
                Subscribe for exclusive deals, new model launches, and service offers
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-80 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="white" size="lg" rightIcon={<Send className="w-4 h-4" />}>
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Services Bar */}
      <div className="bg-secondary-900/50 border-y border-white/5">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Car, title: "New Cars", desc: "Explore models" },
              { icon: Wrench, title: "Service", desc: "Book appointment" },
              { icon: Shield, title: "Insurance", desc: "Get covered" },
              { icon: CreditCard, title: "Finance", desc: "Easy EMIs" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <item.icon className="w-6 h-6 text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl">Nissan</h2>
                <p className="text-xs text-primary-400 font-semibold tracking-widest uppercase">
                  Authorized Dealer - Channi Himmat
                </p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your trusted Nissan dealership in Jammu. 
              We offer the complete range of Nissan vehicles, genuine accessories, 
              expert service, and the best deals with 100% customer satisfaction guaranteed.
            </p>
            <div className="space-y-4">
              <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-3 text-gray-400 group cursor-pointer">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="group-hover:text-white transition-colors">
                  {contactInfo.address.line1}, {contactInfo.address.line2},<br />
                  {contactInfo.address.city}, {contactInfo.address.state} - {contactInfo.address.pincode}
                </span>
              </motion.div>
              <motion.a whileHover={{ x: 5 }} href={`tel:${contactInfo.phone[0]}`} className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>{contactInfo.phone[0]}</span>
              </motion.a>
              <motion.a whileHover={{ x: 5 }} href={`mailto:${contactInfo.email[0]}`} className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>{contactInfo.email[0]}</span>
              </motion.a>
              <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-3 text-gray-400">
                <Clock className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>Mon - Sat: {contactInfo.timing.weekdays}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {footerNavigation.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Cars */}
          <motion.div variants={itemVariants}>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Our Cars</h3>
            <ul className="space-y-3">
              {footerNavigation.cars.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {footerNavigation.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Social Links & Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow Us:</span>
              <div className="flex items-center space-x-2">
                {[
                  { icon: Facebook, href: contactInfo.socialLinks.facebook, color: "hover:bg-blue-600" },
                  { icon: Instagram, href: contactInfo.socialLinks.instagram, color: "hover:bg-pink-600" },
                  { icon: Twitter, href: contactInfo.socialLinks.twitter, color: "hover:bg-sky-500" },
                  { icon: Youtube, href: contactInfo.socialLinks.youtube, color: "hover:bg-red-600" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="bg-black/30 py-4">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-2">
          <p>© {currentYear} Nissan Channi Himmat. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Authorized Nissan Dealership - Jammu</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            <span>Made with ❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
