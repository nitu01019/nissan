"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cars } from "@/data/cars";
import { Car } from "@/types";
import { Button } from "@/components/ui/Button";
import { 
  X, Check, Plus, ChevronDown,
  Droplet, Settings, Users, Package
} from "lucide-react";

export function ComparePage() {
  const [selectedCars, setSelectedCars] = useState<(Car | null)[]>([null, null, null]);
  const [showSelector, setShowSelector] = useState<number | null>(null);

  const addCar = (car: Car, slot: number) => {
    const newSelected = [...selectedCars];
    newSelected[slot] = car;
    setSelectedCars(newSelected);
    setShowSelector(null);
  };

  const removeCar = (slot: number) => {
    const newSelected = [...selectedCars];
    newSelected[slot] = null;
    setSelectedCars(newSelected);
  };

  const availableCars = cars.filter(
    (car) => !selectedCars.find((s) => s && s.id === car.id)
  );
  
  const activeSelectedCars = selectedCars.filter((car): car is Car => car !== null);

  const comparisonFeatures = [
    { key: "price", label: "Ex-Showroom Price", icon: Package },
    { key: "category", label: "Body Type", icon: Settings },
    { key: "engine", label: "Engine", icon: Settings },
    { key: "seats", label: "Seating Capacity", icon: Users },
    { key: "transmission", label: "Transmission", icon: Settings },
    { key: "fuelType", label: "Fuel Type", icon: Droplet },
    { key: "mileage", label: "Mileage", icon: Droplet },
    { key: "luggage", label: "Boot Space", icon: Package },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Compare Nissan Cars
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Compare up to 3 Nissan models side by side - features, prices, and specifications
          </motion.p>
        </div>
      </section>

      {/* Car Selection */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {[0, 1, 2].map((slot) => {
              const car = selectedCars[slot];
              return (
              <motion.div
                key={slot}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: slot * 0.1 }}
                className="relative"
              >
                {car ? (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative h-40 md:h-48">
                      <Image
                        src={car.images[0]}
                        alt={car.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <button
                        onClick={() => removeCar(slot)}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        aria-label="Remove car"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{car.name}</h3>
                      <p className="text-red-600 font-semibold">
                        ₹{(car.pricePerDay / 100000).toFixed(2)} Lakh*
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setShowSelector(showSelector === slot ? null : slot)}
                      className="w-full bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-all min-h-[200px] md:min-h-[280px]"
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                        <Plus className="text-primary-600" size={28} />
                      </div>
                      <span className="text-gray-600 font-medium">Add Car to Compare</span>
                      <ChevronDown className={`mt-2 text-gray-400 transition-transform ${showSelector === slot ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Selector */}
                    {showSelector === slot && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto"
                      >
                        {availableCars.length > 0 ? (
                          availableCars.map((car) => (
                            <button
                              key={car.id}
                              onClick={() => addCar(car, slot)}
                              className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                            >
                              <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={car.images[0]}
                                  alt={car.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-gray-900">{car.name}</p>
                                <p className="text-sm text-red-600">₹{(car.pricePerDay / 100000).toFixed(2)} Lakh*</p>
                              </div>
                            </button>
                          ))
                        ) : (
                          <p className="p-4 text-gray-500 text-center">All cars selected</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
              );
            })}
          </div>

          {/* Comparison Table */}
          {activeSelectedCars.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 md:p-6 font-semibold text-gray-700 w-1/4">Feature</th>
                      {activeSelectedCars.map((car, index) => (
                        <th key={index} className="text-center p-4 md:p-6 font-semibold text-gray-900">
                          {car.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4 md:p-6">
                          <div className="flex items-center gap-3">
                            <feature.icon className="text-primary-600" size={18} />
                            <span className="font-medium text-gray-700">{feature.label}</span>
                          </div>
                        </td>
                        {activeSelectedCars.map((car, carIndex) => (
                          <td key={carIndex} className="text-center p-4 md:p-6">
                            {feature.key === 'price' && (
                              <span className="font-bold text-red-600">₹{(car.pricePerDay / 100000).toFixed(2)} Lakh*</span>
                            )}
                            {feature.key === 'category' && (
                              <span className="capitalize bg-gray-100 px-2 py-1 rounded">{car.category}</span>
                            )}
                            {feature.key === 'engine' && (
                              <span>{car.specs.engine}</span>
                            )}
                            {feature.key === 'seats' && (
                              <span>{car.specs.seats} Seater</span>
                            )}
                            {feature.key === 'transmission' && (
                              <span className="capitalize">{car.specs.transmission}</span>
                            )}
                            {feature.key === 'fuelType' && (
                              <span className="capitalize">{car.specs.fuelType}</span>
                            )}
                            {feature.key === 'mileage' && (
                              <span>{car.specs.mileage}</span>
                            )}
                            {feature.key === 'luggage' && (
                              <span>{car.specs.luggage}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Get Quote Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6 bg-gray-50">
                {activeSelectedCars.map((car, index) => (
                  <Link key={index} href={`/contact?type=price-quote&car=${car.slug}`}>
                    <Button className="w-full justify-center bg-red-600 hover:bg-red-700">
                      Get Price for {car.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Instructions */}
          {activeSelectedCars.length < 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select at least 2 cars to compare
              </h3>
              <p className="text-gray-600">
                Click on the "Add Car to Compare" buttons above to start comparing vehicles
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How to Choose Your Nissan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Consider Your Needs",
                description: "Magnite for city driving, Kicks for premium features, X-Trail for family adventures."
              },
              {
                title: "Budget & Finance",
                description: "We offer easy EMI options, exchange bonus, and corporate discounts. Ask for best on-road price."
              },
              {
                title: "Book a Test Drive",
                description: "Experience the Nissan difference. Visit our Channi Himmat showroom or book a home test drive."
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
