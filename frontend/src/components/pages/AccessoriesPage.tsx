"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, Filter, Star, ShoppingCart, Heart, 
  Check, ChevronDown, Car, Sofa, Shield, Briefcase,
  Tag, Sparkles, TrendingUp, Monitor, Package, Heart as HeartIcon, Droplets
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { 
  accessories, 
  accessoryCategories, 
  AccessoryCategory,
  getBestSellerAccessories,
  getNewAccessories 
} from "@/data/accessories";

const categoryIcons: Record<string, React.ElementType> = {
  exterior: Car,
  interior: Sofa,
  "car-care": Droplets,
  lifestyle: Briefcase,
  infotainment: Monitor,
  "safety-security": Shield,
  packages: Package,
  "health-hygiene": HeartIcon,
};

export function AccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<AccessoryCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAccessories = useMemo(() => {
    let result = [...accessories];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(acc => acc.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(acc =>
        acc.name.toLowerCase().includes(query) ||
        acc.description.toLowerCase().includes(query) ||
        acc.compatibleModels.some(model => model.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured: bestsellers first, then new, then by rating
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.rating - a.rating;
        });
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const bestSellers = getBestSellerAccessories();
  const newArrivals = getNewAccessories();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-nissan-red/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-nissan-red" />
              <span className="text-sm font-medium">Genuine Nissan Accessories</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Personalize Your <span className="text-nissan-red">Nissan</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover premium genuine accessories to enhance your driving experience. 
              From exterior styling to smart electronics - we have it all.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search accessories by name or car model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nissan-red shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Pills - Horizontal scroll on mobile */}
      <section className="sticky top-0 lg:top-20 z-30 bg-white shadow-sm border-b">
        <div className="container mx-auto px-0 md:px-4">
          <div className="flex items-center gap-2 md:gap-3 py-3 md:py-4 px-4 md:px-0 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all snap-start flex-shrink-0 ${
                selectedCategory === "all"
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" />
              All
            </button>
            {accessoryCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Car;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as AccessoryCategory)}
                  className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all snap-start flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">{cat.name}</span>
                  <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories - Only show when "all" is selected */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {accessoryCategories.map((cat, idx) => {
                const Icon = categoryIcons[cat.id] || Car;
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedCategory(cat.id as AccessoryCategory)}
                    className="group relative overflow-hidden rounded-2xl aspect-square"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                      <Icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-lg">{cat.name}</h3>
                      <p className="text-xs text-gray-300 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {cat.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers Section - Only show when "all" is selected */}
      {selectedCategory === "all" && !searchQuery && bestSellers.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-nissan-red" />
              <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestSellers.slice(0, 4).map((acc, idx) => (
                <AccessoryCard key={acc.id} accessory={acc} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Sort & Filter Bar */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredAccessories.length}</span> accessories
              {selectedCategory !== "all" && (
                <span> in <span className="font-semibold text-nissan-red capitalize">{selectedCategory}</span></span>
              )}
            </p>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-nissan-red"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredAccessories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredAccessories.map((acc, idx) => (
                <AccessoryCard key={acc.id} accessory={acc} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No accessories found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Genuine Accessories */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Genuine Nissan Accessories?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Warranty Protected", desc: "All accessories come with manufacturer warranty" },
              { icon: Check, title: "Perfect Fit", desc: "Designed specifically for your Nissan model" },
              { icon: Star, title: "Premium Quality", desc: "Made with the highest quality materials" },
              { icon: Car, title: "Expert Installation", desc: "Professional installation at our service center" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-nissan-red" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-nissan-red to-red-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Visit our showroom at Channi Himmat, Jammu or call us for expert advice on the best accessories for your Nissan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-nissan-red hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
            <Link href="tel:+917889559631">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Call: +91 78895 59631
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Accessory Card Component
function AccessoryCard({ accessory, index }: { accessory: typeof accessories[0]; index: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const discount = accessory.originalPrice 
    ? Math.round(((accessory.originalPrice - accessory.price) / accessory.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={accessory.image}
          alt={accessory.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          loading={index < 8 ? "eager" : "lazy"}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {accessory.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {accessory.isBestSeller && (
            <span className="bg-nissan-red text-white text-xs font-bold px-2 py-1 rounded-full">
              BESTSELLER
            </span>
          )}
          {discount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>

        {/* Quick View on Hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <Button className="w-full bg-primary-900 hover:bg-primary-800" size="sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-nissan-red font-medium uppercase tracking-wide">
          {accessory.category}
        </span>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-nissan-red transition-colors">
          {accessory.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-900">{accessory.rating}</span>
          <span className="text-xs text-gray-500">({accessory.reviewCount})</span>
        </div>

        {/* Compatible Models */}
        <p className="text-xs text-gray-500 mt-2 line-clamp-1">
          Fits: {accessory.compatibleModels.join(", ")}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{accessory.price.toLocaleString("en-IN")}
          </span>
          {accessory.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{accessory.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1 mt-2">
          {accessory.inStock ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            </>
          ) : (
            <span className="text-xs text-red-500 font-medium">Out of Stock</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
