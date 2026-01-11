"use client";

/**
 * Google Maps Embed Component
 * 
 * Lazy-loaded Google Maps iframe with:
 * - Loading state
 * - Error handling
 * - Responsive design
 * - Performance optimizations
 * 
 * @author Nissan Jammu Development Team
 */

import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface GoogleMapEmbedProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  height?: string;
  className?: string;
  title?: string;
  showDirectionsButton?: boolean;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  latitude = 32.7266,
  longitude = 74.8570,
  zoom = 15,
  height = '400px',
  className = '',
  title = 'Nissan Showroom Location',
  showDirectionsButton = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Construct the embed URL
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.5!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNissan%20Jammu!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`;

  // Directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=Nissan+Channi+Himmat+Jammu`;

  useEffect(() => {
    // Set a timeout for loading
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [isLoaded]);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-100 rounded-2xl flex flex-col items-center justify-center ${className}`}
        style={{ height }}
      >
        <MapPin className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">Unable to load map</p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open in Google Maps
        </a>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`} style={{ height }}>
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-2"></div>
            <span className="text-gray-500 text-sm">Loading map...</span>
          </div>
        </div>
      )}

      {/* Map Iframe */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Directions Button Overlay */}
      {showDirectionsButton && isLoaded && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl shadow-lg transition-colors font-medium"
          >
            <MapPin className="w-5 h-5" />
            Get Directions
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default GoogleMapEmbed;
