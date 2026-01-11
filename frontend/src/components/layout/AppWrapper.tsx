"use client";

/**
 * App Wrapper Component
 * 
 * Wraps the entire application with:
 * - Mobile Bottom Navigation
 * - Get a Quote Modal (auto-popup)
 * - Floating Action Button (when modal is closed)
 * - Global state management for modals
 * 
 * @author Nissan Channi Himmat Development Team
 */

import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { MobileBottomNav } from "./MobileBottomNav";
import { GetQuoteModal } from "@/components/modals/GetQuoteModal";

interface AppContextType {
  openQuoteModal: (type?: "quote" | "testdrive") => void;
  closeQuoteModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppWrapper");
  }
  return context;
};

interface AppWrapperProps {
  children: ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"quote" | "testdrive">("quote");
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isFloatingExpanded, setIsFloatingExpanded] = useState(false);

  // Auto-show popup after 3 seconds on first visit
  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("nissan_popup_shown");
    
    if (!hasSeenPopup && !hasShownPopup) {
      const timer = setTimeout(() => {
        setModalType("quote");
        setIsQuoteModalOpen(true);
        setHasShownPopup(true);
        sessionStorage.setItem("nissan_popup_shown", "true");
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    } else {
      // Show floating button if popup was already shown
      setShowFloatingButton(true);
    }
  }, [hasShownPopup]);

  // Show floating button when modal is closed
  useEffect(() => {
    if (!isQuoteModalOpen && hasShownPopup) {
      const timer = setTimeout(() => {
        setShowFloatingButton(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isQuoteModalOpen, hasShownPopup]);

  const openQuoteModal = (type: "quote" | "testdrive" = "quote") => {
    setModalType(type);
    setIsQuoteModalOpen(true);
    setShowFloatingButton(false);
    setIsFloatingExpanded(false);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <AppContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {/* Main Content */}
      {children}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onTestDriveClick={() => openQuoteModal("testdrive")} />

      {/* Floating Action Button - Shows after modal is closed */}
      <AnimatePresence>
        {showFloatingButton && !isQuoteModalOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 lg:bottom-6 right-4 z-40"
          >
            {isFloatingExpanded ? (
              <motion.div
                initial={{ width: 56, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                className="bg-primary-600 text-white rounded-full shadow-lg flex items-center overflow-hidden"
              >
                <button
                  onClick={() => openQuoteModal("quote")}
                  className="px-4 py-3 text-sm font-medium whitespace-nowrap hover:bg-primary-700 transition-colors"
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => setIsFloatingExpanded(false)}
                  className="p-3 hover:bg-primary-700 transition-colors border-l border-primary-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFloatingExpanded(true)}
                className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              >
                <MessageSquare className="w-6 h-6" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Get a Quote Modal */}
      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={closeQuoteModal}
        defaultType={modalType}
      />
    </AppContext.Provider>
  );
};

export default AppWrapper;
