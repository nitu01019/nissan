"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Car, Shield, CreditCard, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

const services = [
  {
    icon: Wrench,
    title: "Periodic Service",
    description: "Regular maintenance to keep your Nissan in perfect condition with genuine parts.",
    link: "/services/periodic-service",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400",
  },
  {
    icon: Car,
    title: "Genuine Parts",
    description: "100% authentic Nissan spare parts with warranty for optimal performance.",
    link: "/services/genuine-parts",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
  },
  {
    icon: Shield,
    title: "Insurance",
    description: "Comprehensive insurance solutions with hassle-free claim assistance.",
    link: "/services/insurance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
  },
  {
    icon: CreditCard,
    title: "Finance Options",
    description: "Flexible financing with competitive interest rates and quick approval.",
    link: "/services/finance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="section-padding bg-secondary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeader
          badge="Our Services"
          subtitle="Complete Care"
          title="Premium Services for Your Nissan"
          description="From routine maintenance to comprehensive insurance, we offer end-to-end solutions for all your automotive needs."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 -mt-16">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-nissan"
                >
                  <service.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                <Link
                  href={service.link}
                  className="inline-flex items-center text-primary-400 font-medium text-sm group-hover:text-primary-300 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-secondary-800"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Explore All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
