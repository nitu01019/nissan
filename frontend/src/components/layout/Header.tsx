"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, MapPin, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, contactInfo } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { NewBadge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Top Bar - Logo on left with bigger name */}
      <div className="lg:hidden bg-secondary-900 text-white py-3 px-4">
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-[#C3002F] to-[#8B0000] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl tracking-tight">Nissan</h1>
              <p className="text-[11px] text-gray-400 font-medium">Authorized Dealer • Channi Himmat</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Top Bar - Desktop only */}
      <motion.div 
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="hidden lg:block bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900 text-white py-2.5"
      >
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <motion.a 
              href={`tel:${contactInfo.phone[0]}`} 
              className="flex items-center hover:text-primary-400 transition-colors group"
              whileHover={{ scale: 1.02 }}
            >
              <Phone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              {contactInfo.phone[0]}
            </motion.a>
            <motion.a 
              href={`mailto:${contactInfo.email[0]}`} 
              className="flex items-center hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="w-4 h-4 mr-2" />
              {contactInfo.email[0]}
            </motion.a>
            <span className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              Channi Himmat, {contactInfo.address.city}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Mon - Sat: {contactInfo.timing.weekdays}</span>
            <div className="w-px h-4 bg-gray-600" />
            <motion.span 
              className="text-red-400 font-semibold"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Authorized Nissan Dealer - Channi Himmat, Jammu
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Main Header - Desktop only */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 hidden lg:block",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xl"
            : "bg-white shadow-sm"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Bigger name on left */}
            <Link href="/" className="flex items-center space-x-4 group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                {/* Nissan Logo */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-[#C3002F] to-[#8B0000] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-red-500/40 transition-shadow">
                  <span className="text-white font-bold text-xl">N</span>
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-red-400"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="ml-4">
                  <h1 className="font-heading font-bold text-2xl text-secondary-800 group-hover:text-[#C3002F] transition-colors tracking-tight">
                    Nissan
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-secondary-500 font-medium">
                      Channi Himmat, Jammu
                    </span>
                    <span className="px-2 py-0.5 bg-[#C3002F]/10 text-[#C3002F] text-[10px] font-bold rounded-full">
                      AUTHORIZED DEALER
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNavigation.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      "hover:text-primary-500 hover:bg-primary-50",
                      "flex items-center relative group",
                      activeDropdown === item.label ? "text-primary-500 bg-primary-50" : "text-secondary-700"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "ml-1 w-4 h-4 transition-transform duration-300",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    )}
                    <motion.span 
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-3/4 -translate-x-1/2 transition-all duration-300"
                      layoutId={`underline-${item.label}`}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-2">
                          {item.children.map((child, idx) => (
                            <motion.div
                              key={child.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm text-secondary-700",
                                  "hover:bg-primary-50 hover:text-primary-600 transition-all duration-200",
                                  "group/item"
                                )}
                              >
                                <span className="group-hover/item:translate-x-1 transition-transform">
                                  {child.label}
                                </span>
                                {child.isNew && <NewBadge />}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact?type=test-drive">
                  <Button variant="outline" size="sm">
                    Book Test Drive
                  </Button>
                </Link>
              </motion.div>
              
              {isAuthenticated && user ? (
                <div className="relative" onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", showUserMenu && "rotate-180")} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                            <User className="w-4 h-4" /> My Profile
                          </Link>
                          <button
                            onClick={() => { logout(); setShowUserMenu(false); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <LogOut className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/login">
                    <Button variant="primary" size="sm">
                      Login / Sign Up
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-secondary-700 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container-custom py-6 space-y-4">
                {mainNavigation.map((item, index) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-lg font-medium text-secondary-700 hover:text-primary-500 border-b border-gray-100"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 py-2 text-sm text-secondary-500 hover:text-primary-500"
                          >
                            {child.label}
                            {child.isNew && <NewBadge />}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.div 
                  className="pt-4 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/contact?type=test-drive" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Book Test Drive
                    </Button>
                  </Link>
                  
                  {isAuthenticated && user ? (
                    <>
                      <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="primary" fullWidth>
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </Button>
                      </Link>
                      <button
                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 py-3 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth>
                        Login / Sign Up
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
