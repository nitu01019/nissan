"use client";

/**
 * Optimized Image Component
 * 
 * Features:
 * - Lazy loading with blur placeholder
 * - WebP/AVIF format support
 * - Responsive sizing
 * - Error handling with fallback
 * - Loading skeleton
 * 
 * @author Nissan Jammu Development Team
 */

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  containerClassName?: string;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[21/9]',
  auto: '',
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  showSkeleton = true,
  aspectRatio = 'auto',
  containerClassName,
  className,
  priority = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Loading Skeleton */}
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
      )}

      {/* Image */}
      <Image
        src={hasError ? fallbackSrc : imageSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={85}
        {...props}
      />
    </div>
  );
};

/**
 * Car Image - Optimized for car photos
 */
export const CarImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    aspectRatio="video"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    {...props}
  />
);

/**
 * Hero Image - Full width hero images
 */
export const HeroImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    priority
    aspectRatio="wide"
    sizes="100vw"
    quality={90}
    {...props}
  />
);

/**
 * Thumbnail Image - Small preview images
 */
export const ThumbnailImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    aspectRatio="square"
    sizes="96px"
    quality={75}
    {...props}
  />
);

/**
 * Avatar Image - User profile images
 */
export const AvatarImage: React.FC<
  OptimizedImageProps & { size?: 'sm' | 'md' | 'lg' | 'xl' }
> = ({ size = 'md', className, ...props }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <OptimizedImage
      aspectRatio="square"
      containerClassName={cn('rounded-full', sizeClasses[size])}
      className={cn('rounded-full object-cover', className)}
      sizes={size === 'xl' ? '96px' : size === 'lg' ? '64px' : '48px'}
      {...props}
    />
  );
};

export default OptimizedImage;
