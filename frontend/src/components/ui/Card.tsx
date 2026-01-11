"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  padding = "md",
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "bg-white rounded-2xl shadow-card overflow-hidden",
        hover && "cursor-pointer",
        paddingStyles[padding],
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className,
  overlay = false,
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      )}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  as: Component = "h3",
}) => {
  return (
    <Component
      className={cn(
        "font-heading font-bold text-secondary-800",
        Component === "h2" && "text-2xl",
        Component === "h3" && "text-xl",
        Component === "h4" && "text-lg",
        className
      )}
    >
      {children}
    </Component>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("text-secondary-600 text-sm leading-relaxed", className)}>
      {children}
    </p>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={cn("mt-4 pt-4 border-t border-gray-100", className)}>
      {children}
    </div>
  );
};
