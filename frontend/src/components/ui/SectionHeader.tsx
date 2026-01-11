"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  badge?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  align = "center",
  light = false,
  badge,
  className,
}) => {
  const alignmentStyles = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("max-w-3xl mb-12 md:mb-16", alignmentStyles[align], className)}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            "inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4",
            light
              ? "bg-white/20 text-white"
              : "bg-primary-100 text-primary-600"
          )}
        >
          {badge}
        </motion.span>
      )}
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={cn(
            "text-sm uppercase tracking-widest font-semibold mb-3",
            light ? "text-white/80" : "text-primary-500"
          )}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-bold",
          light ? "text-white" : "text-secondary-800"
        )}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-white/80" : "text-secondary-600"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
