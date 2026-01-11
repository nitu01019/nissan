"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft, Star, Fuel, Gauge, Users, Calendar, Phone,
  Shield, Check, MapPin, Clock, Car as CarIcon
} from "lucide-react";
import { Car } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Props {
  car: Car;
}

export const CarDetailPage: React.FC<Props> = ({ car }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Link href="/cars" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to All Cars
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Car Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {car.isPopular && <Badge variant="success">Popular</Badge>}
                {!car.isAvailable && <Badge variant="warning">Currently Booked</Badge>}
              </div>
              
              {/* Main Image */}
              <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl mb-4">
                <Image
                  src={car.images[selectedImage]}
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Thumbnail Images */}
              {car.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {car.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImage === idx ? "border-primary-500" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${car.name} view ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Car Info */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
              <Badge variant="default" className="capitalize mb-4">{car.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
                {car.name}
              </h1>
              <p className="text-xl text-primary-600 font-medium mb-4">{car.tagline}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(car.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-gray-600">{car.rating} ({car.reviewCount} reviews)</span>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto text-primary-500 mb-1" />
                  <p className="text-xs text-gray-500">Seats</p>
                  <p className="font-semibold">{car.specs.seats} Persons</p>
                </div>
                <div className="text-center">
                  <Gauge className="w-6 h-6 mx-auto text-primary-500 mb-1" />
                  <p className="text-xs text-gray-500">Transmission</p>
                  <p className="font-semibold capitalize">{car.specs.transmission}</p>
                </div>
                <div className="text-center">
                  <Fuel className="w-6 h-6 mx-auto text-primary-500 mb-1" />
                  <p className="text-xs text-gray-500">Fuel Type</p>
                  <p className="font-semibold capitalize">{car.specs.fuelType}</p>
                </div>
                <div className="text-center">
                  <CarIcon className="w-6 h-6 mx-auto text-primary-500 mb-1" />
                  <p className="text-xs text-gray-500">Mileage</p>
                  <p className="font-semibold">{car.specs.mileage}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-primary-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Rental Rates</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Per Day</p>
                    <p className="text-xl md:text-2xl font-bold text-primary-600">₹{car.pricePerDay.toLocaleString()}</p>
                  </div>
                  {car.pricePerWeek && (
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-500">Per Week</p>
                      <p className="text-xl md:text-2xl font-bold text-primary-600">₹{car.pricePerWeek.toLocaleString()}</p>
                    </div>
                  )}
                  {car.pricePerMonth && (
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-500">Per Month</p>
                      <p className="text-xl md:text-2xl font-bold text-primary-600">₹{car.pricePerMonth.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  leftIcon={<Calendar className="w-5 h-5" />}
                  disabled={!car.isAvailable}
                >
                  {car.isAvailable ? "Book Now" : "Currently Unavailable"}
                </Button>
                <a href="tel:+919876543210" className="w-full">
                <Button 
                  variant="outline" 
                  size="lg" 
                  fullWidth 
                  leftIcon={<Phone className="w-5 h-5" />}
                >
                  Call to Enquire
                </Button>
              </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Features & Amenities</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {car.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
            {car.specs.ac && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">Air Conditioning</span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">About This Car</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">{car.description}</p>
        </div>
      </section>

      {/* Rental Info Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Rental Information</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <Shield className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Fully Insured</h3>
              <p className="text-sm text-gray-600">Comprehensive insurance coverage included with every rental.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <MapPin className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-sm text-gray-600">Free delivery within Srinagar city. Airport pickup available.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <Clock className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round-the-clock roadside assistance and customer support.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <CarIcon className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Well Maintained</h3>
              <p className="text-sm text-gray-600">All vehicles are regularly serviced and sanitized.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-12 bg-gradient-to-r from-primary-900 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Book {car.name}?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us now to reserve this vehicle for your Kashmir adventure. Best rates guaranteed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210">
              <Button variant="white" size="lg" leftIcon={<Phone className="w-5 h-5" />}>
                Call: +91 98765 43210
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-700">
                Send Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarDetailPage;
