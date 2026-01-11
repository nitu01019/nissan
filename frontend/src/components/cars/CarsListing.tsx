"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, X, Fuel, Gauge, Users, ArrowRight } from "lucide-react";
import { cars } from "@/data/cars";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

const categories = [
  { value: "all", label: "All Cars" },
  { value: "hatchback", label: "Hatchback" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "muv", label: "MUV" },
  { value: "premium", label: "Premium" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-2000", label: "Under ₹2,000/day" },
  { value: "2000-3500", label: "₹2,000 - ₹3,500/day" },
  { value: "3500-10000", label: "Above ₹3,500/day" },
];

export const CarsListing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || car.category === selectedCategory;
      
      let matchesPrice = true;
      if (selectedPriceRange !== "all") {
        const [min, max] = selectedPriceRange.split("-").map(Number);
        matchesPrice = car.pricePerDay >= min && (max ? car.pricePerDay <= max : true);
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPriceRange("all");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedPriceRange !== "all";

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-primary-900 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=75')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="container mx-auto px-4 relative h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our <span className="text-primary-300">Cars</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Choose from our wide range of well-maintained rental cars for your Kashmir adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Listing */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8 -mt-20 relative z-10"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-5 h-5" />}
                  className="h-12"
                />
              </div>

              {/* Category Filter - Scrollable on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat.value
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* More Filters Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter className="w-4 h-4" />}
              >
                Filters
              </Button>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium text-gray-600">Price Range:</span>
                      {priceRanges.map((range) => (
                        <button
                          key={range.value}
                          onClick={() => setSelectedPriceRange(range.value)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            selectedPriceRange === range.value
                              ? "bg-primary-100 text-primary-600"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">Active filters:</span>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm hover:bg-primary-200 transition-colors"
                >
                  Clear all <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-800">{filteredCars.length}</span> cars
            </p>
          </div>

          {/* Cars Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-44 md:h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={car.images[0]}
                      alt={car.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute top-3 left-3 flex gap-2">
                      {car.isPopular && <Badge variant="success">Popular</Badge>}
                      {!car.isAvailable && <Badge variant="warning">Booked</Badge>}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Link href={`/cars/${car.slug}`}>
                        <Button variant="white" fullWidth size="sm">View Details</Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary-600 transition-colors">
                          {car.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{car.tagline}</p>
                      </div>
                      <Badge variant="default" className="capitalize text-xs">{car.category}</Badge>
                    </div>

                    <div className="flex items-center gap-3 py-3 border-y border-gray-100 my-3">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Fuel className="w-3.5 h-3.5 text-primary-500" />
                        <span className="capitalize">{car.specs.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Gauge className="w-3.5 h-3.5 text-primary-500" />
                        <span className="capitalize">{car.specs.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Users className="w-3.5 h-3.5 text-primary-500" />
                        <span>{car.specs.seats} Seats</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Per Day</p>
                        <p className="text-xl font-bold text-primary-600">
                          ₹{car.pricePerDay.toLocaleString()}
                        </p>
                      </div>
                      <Link href={`/cars/${car.slug}`}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-600 group-hover:text-white transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredCars.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-600 mb-4">No cars found matching your criteria</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default CarsListing;
