"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause, Car, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    title: "The All-New",
    carName: "Nissan Magnite",
    tagline: "Big. Bold. Beautiful.",
    description: "India's most feature-loaded compact SUV. Wireless Apple CarPlay, 360° camera, and turbocharged performance.",
    price: "₹5.99 Lakh*",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80&auto=format",
    bgGradient: "from-slate-900 via-red-950 to-slate-900",
    ctaLink: "/cars/nissan-magnite",
  },
  {
    id: 2,
    title: "Experience the",
    carName: "Nissan Kicks",
    tagline: "Intelligent Mobility",
    description: "Premium SUV with Around View Monitor, 6 airbags, and advanced connectivity features.",
    price: "₹9.84 Lakh*",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&auto=format",
    bgGradient: "from-slate-900 via-blue-950 to-slate-900",
    ctaLink: "/cars/nissan-kicks",
  },
  {
    id: 3,
    title: "Revolutionary",
    carName: "Nissan X-Trail",
    tagline: "e-POWER Technology",
    description: "Experience electrified driving without plugging in. ProPILOT assist and panoramic sunroof.",
    price: "₹34.99 Lakh*",
    image: "https://images.unsplash.com/photo-1625231334168-76bc42068e0f?w=800&q=80&auto=format",
    bgGradient: "from-slate-900 via-emerald-950 to-slate-900",
    ctaLink: "/cars/nissan-x-trail",
  },
  {
    id: 4,
    title: "The Classic",
    carName: "Nissan Sunny",
    tagline: "Comfort Meets Efficiency",
    description: "Spacious sedan with exceptional fuel efficiency, perfect for families who value comfort.",
    price: "₹8.99 Lakh*",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80&auto=format",
    bgGradient: "from-slate-900 via-amber-950 to-slate-900",
    ctaLink: "/cars/nissan-sunny",
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className={`relative min-h-[90vh] md:min-h-screen overflow-hidden bg-gradient-to-br ${slide.bgGradient} transition-all duration-1000`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary-500"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-white"
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 h-full min-h-[90vh] md:min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-20 lg:py-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="text-white z-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Discover</span>
                </motion.div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                  <span className="text-white/80">{slide.title}</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
                    {slide.carName}
                  </span>
                </h1>

                {/* Tagline */}
                <p className="text-xl md:text-2xl text-primary-300 font-medium mb-4">
                  {slide.tagline}
                </p>

                {/* Description */}
                <p className="text-gray-300 text-base md:text-lg max-w-xl mb-6">
                  {slide.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Ex-Showroom Price</span>
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {slide.price}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact?type=test-drive">
                    <Button variant="primary" size="lg" className="shadow-lg shadow-red-500/30">
                      Book Test Drive
                    </Button>
                  </Link>
                  <Link href={slide.ctaLink}>
                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-red-400" />
                    <span className="text-white/80">6 Models</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <span className="text-white/80">Channi Himmat, Jammu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-red-400" />
                    <span className="text-white/80">+91 78895 59631</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Car Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.9, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -100 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full aspect-[4/3] max-w-[600px]"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent rounded-3xl blur-3xl" />
                
                {/* Car Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={slide.image}
                    alt={slide.carName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4"
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase">Ex-Showroom</p>
                    <p className="text-2xl font-bold text-primary-600">{slide.price}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-primary-500"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-2 ml-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors ml-2"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center text-white/60"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
