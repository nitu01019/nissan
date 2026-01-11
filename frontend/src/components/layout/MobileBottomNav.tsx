"use client";

/**
 * Mobile Bottom Navigation Bar
 * 
 * Fixed navigation bar at the bottom for mobile users with:
 * - Home button
 * - Test Drive button (opens quote modal)
 * - Get Directions (opens Google Maps)
 * - Menu (opens mobile menu)
 * - Call Us (direct phone call)
 * 
 * @author Nissan Channi Himmat Development Team
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { 
  Car, 
  Navigation, 
  Menu, 
  Phone, 
  X,
  Home,
  ShoppingBag,
  Wrench,
  Info,
  MessageSquare,
  ChevronRight,
  Gift,
  Scale
} from "lucide-react";
import Link from "next/link";

interface MobileBottomNavProps {
  onTestDriveClick: () => void;
}

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Car, label: "Our Cars", href: "/cars" },
  { icon: ShoppingBag, label: "Accessories", href: "/accessories" },
  { icon: Scale, label: "Compare Cars", href: "/compare" },
  { icon: Wrench, label: "Services", href: "/services" },
  { icon: Gift, label: "Offers", href: "/offers" },
  { icon: Info, label: "About Us", href: "/about" },
  { icon: MessageSquare, label: "Contact", href: "/contact" },
  { icon: Navigation, label: "Directions", href: "/directions" },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onTestDriveClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Google Maps directions URL
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=32.7266,74.8570&destination_place_id=Nissan+Channi+Himmat+Jammu";

  // Phone number for direct call
  const phoneNumber = "tel:+917889559631";

  const handleDirections = () => {
    window.open(directionsUrl, "_blank");
  };

  const handleCall = () => {
    window.location.href = phoneNumber;
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Fixed Bottom Navigation - Only visible on mobile/tablet */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-secondary-900 border-t border-secondary-800 lg:hidden safe-area-inset-bottom">
        <div className="grid grid-cols-5 h-16">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive("/") ? "text-primary-500 bg-secondary-800" : "text-white hover:bg-secondary-800"
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Home</span>
          </Link>

          {/* Test Drive */}
          <button
            onClick={onTestDriveClick}
            className="flex flex-col items-center justify-center gap-1 text-white hover:bg-secondary-800 active:bg-secondary-700 transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Test Drive</span>
          </button>

          {/* Get Directions */}
          <button
            onClick={handleDirections}
            className="flex flex-col items-center justify-center gap-1 text-white hover:bg-secondary-800 active:bg-secondary-700 transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Direction</span>
          </button>

          {/* Menu */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-1 text-white hover:bg-secondary-800 active:bg-secondary-700 transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Menu</span>
          </button>

          {/* Call Us */}
          <button
            onClick={handleCall}
            className="flex flex-col items-center justify-center gap-1 text-white hover:bg-secondary-800 active:bg-secondary-700 transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Call</span>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-secondary-900 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-secondary-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h2 className="text-white font-bold">Nissan</h2>
                  <p className="text-gray-400 text-xs">Channi Himmat, Jammu</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-secondary-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary-800 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary-800 group-hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors">
                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-800 bg-secondary-900 safe-area-inset-bottom">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onTestDriveClick();
                  }}
                  className="py-3 px-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  Book Test Drive
                </button>
                <a
                  href={phoneNumber}
                  className="py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors text-center"
                >
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden behind bottom nav */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default MobileBottomNav;
