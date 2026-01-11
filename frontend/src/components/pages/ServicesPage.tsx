"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Car, Shield, CreditCard, Clock, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const services = [
  {
    icon: Wrench,
    title: "Periodic Service",
    description: "Keep your Nissan running at peak performance with our comprehensive maintenance packages.",
    features: ["Multi-point inspection", "Oil & filter change", "Brake inspection", "Fluid top-up", "Battery check"],
    price: "Starting ₹2,999",
    color: "bg-blue-500",
  },
  {
    icon: Car,
    title: "Genuine Parts",
    description: "100% authentic Nissan parts with warranty for perfect fit and lasting quality.",
    features: ["OEM quality parts", "Warranty covered", "Perfect fitment", "Competitive pricing", "Quick availability"],
    price: "Best Price Guarantee",
    color: "bg-green-500",
  },
  {
    icon: Shield,
    title: "Insurance",
    description: "Comprehensive motor insurance with cashless claims and quick processing.",
    features: ["Cashless claims", "Quick settlement", "Multiple insurers", "Best premiums", "24/7 support"],
    price: "Get Free Quote",
    color: "bg-orange-500",
  },
  {
    icon: CreditCard,
    title: "Finance Options",
    description: "Flexible car financing with competitive rates and hassle-free approval process.",
    features: ["Low interest rates", "Quick approval", "Flexible tenure", "Minimal documentation", "Multiple lenders"],
    price: "Rates from 8.5%",
    color: "bg-purple-500",
  },
];

const benefits = [
  { icon: Clock, title: "Quick Service", description: "Most services completed same day" },
  { icon: Shield, title: "Warranty Protected", description: "All work covered under warranty" },
  { icon: CheckCircle, title: "Certified Technicians", description: "Factory-trained experts" },
];

export const ServicesPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] bg-secondary-800">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 to-primary-900/50" />
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920')`, backgroundSize: "cover" }}
        />
        <div className="container-custom relative h-full flex items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-primary-400">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Complete automotive care for your Nissan with certified technicians and genuine parts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-primary-500 py-6">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 text-white"
              >
                <benefit.icon className="w-8 h-8" />
                <div>
                  <h4 className="font-semibold">{benefit.title}</h4>
                  <p className="text-sm text-white/80">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="What We Offer"
            subtitle="Complete Care"
            description="From routine maintenance to comprehensive insurance, we've got you covered."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className={`${service.color} p-6`}>
                  <service.icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-white">{service.title}</h3>
                  <p className="text-white/80 mt-2">{service.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-secondary-600">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-primary-500">{service.price}</span>
                    <Link href="/contact?type=service">
                      <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary-800">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Our service advisors are available to help you with any queries.
            </p>
            <a href="tel:+911942500000">
              <Button variant="primary" size="lg" leftIcon={<Phone className="w-5 h-5" />}>
                Call Now: +91 194 250 0000
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
