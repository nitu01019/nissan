"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    designation: "Business Owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
    review: "Excellent service and great deals on the Magnite. The team at Nissan was incredibly helpful throughout the entire purchase process. Highly recommend!",
    car: "Nissan Magnite",
  },
  {
    id: 2,
    name: "Priya Malik",
    designation: "Doctor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
    review: "Best car buying experience ever! The staff was knowledgeable, patient, and made everything so smooth. Love my new X-Trail!",
    car: "Nissan X-Trail",
  },
  {
    id: 3,
    name: "Ahmad Khan",
    designation: "Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 5,
    review: "Great after-sales service. They really care about customer satisfaction. The service team is prompt and professional.",
    car: "Nissan Kicks",
  },
  {
    id: 4,
    name: "Fatima Bano",
    designation: "Teacher",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 5,
    review: "Transparent pricing with no hidden charges. The finance team helped me get the best deal. Very happy with my purchase!",
    car: "Nissan Magnite",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          badge="Testimonials"
          subtitle="Customer Stories"
          title="What Our Customers Say"
          description="Don't just take our word for it. Here's what our valued customers have to say about their experience with Nissan."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 md:top-10 md:right-10">
                <Quote className="w-16 h-16 text-primary-100" />
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary-100"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[currentIndex].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-lg md:text-xl text-secondary-700 leading-relaxed mb-6 italic">
                    "{testimonials[currentIndex].review}"
                  </p>

                  {/* Author Info */}
                  <div>
                    <h4 className="font-heading text-xl font-bold text-secondary-800">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-secondary-500">
                      {testimonials[currentIndex].designation}
                    </p>
                    <p className="text-primary-500 font-medium text-sm mt-1">
                      Owner of {testimonials[currentIndex].car}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-secondary-600 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-secondary-600 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
