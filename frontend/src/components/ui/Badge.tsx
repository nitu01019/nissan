"use client";

import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-primary-100 text-primary-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className,
  pulse = false,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        variantStyles[variant],
        pulse && "animate-pulse",
        className
      )}
    >
      {children}
    </span>
  );
};

interface NewBadgeProps {
  className?: string;
}

export const NewBadge: React.FC<NewBadgeProps> = ({ className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase",
        "bg-primary-500 text-white animate-pulse",
        className
      )}
    >
      New
    </span>
  );
};

interface PriceBadgeProps {
  price: string;
  label?: string;
  className?: string;
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({
  price,
  label = "Starting from",
  className,
}) => {
  return (
    <div className={cn("inline-flex flex-col", className)}>
      <span className="text-xs text-secondary-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-xl font-bold text-primary-500">{price}</span>
    </div>
  );
};
