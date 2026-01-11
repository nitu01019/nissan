"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Fuel, Gauge, Users, Star, ChevronRight } from "lucide-react";
import { cars, getPopularCars } from "@/data/cars";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";

export const FeaturedCars: React.FC = () => {
  const [hoveredCar, setHoveredCar] = useState<string | null>(null);
  const popularCars = getPopularCars().slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Our Collection"
          subtitle="Explore"
          title="Our Cars"
          description="Discover the complete range of Nissan vehicles. From compact SUVs to premium sedans - find your perfect car at our Jammu showroom."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {popularCars.map((car) => (
            <motion.div
              key={car.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCar(car.id)}
              onMouseLeave={() => setHoveredCar(null)}
              className="group relative"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Image Container */}
                <div className="relative h-48 md:h-52 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    {car.isPopular && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Badge variant="success">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Popular
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Car Image */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: hoveredCar === car.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={car.images[0]}
                      alt={car.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {hoveredCar === car.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4"
                      >
                        <Link href={`/cars/${car.slug}`}>
                          <Button variant="white" size="sm">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title & Category */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary-600 transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{car.tagline}</p>
                    </div>
                    <Badge variant="default" className="capitalize text-xs">
                      {car.category}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(car.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {car.rating} ({car.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center justify-between py-3 border-y border-gray-100">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Fuel className="w-4 h-4 text-primary-500" />
                      <span className="capitalize">{car.specs.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Gauge className="w-4 h-4 text-primary-500" />
                      <span className="capitalize">{car.specs.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-primary-500" />
                      <span>{car.specs.seats} Seats</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Starting from
                      </p>
                      <p className="text-2xl font-bold text-primary-600">
                        ₹{(car.pricePerDay / 100000).toFixed(2)} Lakh*
                      </p>
                    </div>
                    <Link href={`/cars/${car.slug}`}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-primary-500/0 group-hover:shadow-primary-500/30"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/cars">
            <Button 
              variant="primary" 
              size="lg" 
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="shadow-lg shadow-primary-500/30"
            >
              View All Cars
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCars;
