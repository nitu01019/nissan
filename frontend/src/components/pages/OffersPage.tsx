"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Tag, ArrowRight, Gift, Percent, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

const offers = [
  {
    id: 1,
    title: "New Year Special",
    subtitle: "On Nissan Magnite",
    discount: "Up to ₹50,000 OFF",
    description: "Celebrate the new year with massive savings on the popular Nissan Magnite. Includes exchange bonus and accessories.",
    validTill: "Jan 31, 2026",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600",
    tag: "Limited Time",
    color: "from-red-500 to-orange-500",
  },
  {
    id: 2,
    title: "Low EMI Offer",
    subtitle: "Easy Financing",
    discount: "EMI from ₹9,999/month",
    description: "Drive home your dream Nissan with affordable EMIs. Special interest rates for limited period.",
    validTill: "Feb 28, 2026",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600",
    tag: "Finance",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 3,
    title: "Exchange Bonus",
    subtitle: "Trade-in Your Old Car",
    discount: "Extra ₹30,000",
    description: "Get the best value for your old car with our exchange program. Additional bonus on top of market value.",
    validTill: "Mar 31, 2026",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600",
    tag: "Exchange",
    color: "from-green-500 to-teal-500",
  },
];

const benefits = [
  { icon: Gift, title: "Free Accessories", description: "Worth ₹15,000 on select models" },
  { icon: Percent, title: "Zero Down Payment", description: "100% on-road financing available" },
  { icon: CreditCard, title: "Corporate Discount", description: "Special rates for corporate buyers" },
];

export const OffersPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container-custom relative h-full flex items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6"
            >
              <Tag className="w-5 h-5" />
              <span className="font-semibold">Special Offers</span>
            </motion.div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              Exclusive Deals & Offers
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Don't miss out on amazing savings. Limited time offers on your favorite Nissan models.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Benefits */}
      <section className="bg-white py-8 border-b">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-800">{benefit.title}</h4>
                  <p className="text-sm text-secondary-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Current Offers"
            subtitle="Save Big"
            description="Take advantage of these exclusive deals before they expire."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, idx) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${offer.color} opacity-60`} />
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" className="bg-white text-primary-500">
                      {offer.tag}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/80 text-sm">{offer.subtitle}</p>
                    <h3 className="text-2xl font-bold text-white">{offer.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-primary-500">{offer.discount}</p>
                  </div>
                  <p className="text-secondary-600 mb-4 line-clamp-2">{offer.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-secondary-500">
                      <Clock className="w-4 h-4" />
                      Valid till {offer.validTill}
                    </div>
                    <Link href="/contact?type=price-quote">
                      <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Claim
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
              Don't Miss These Deals!
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our offers and get a personalized quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?type=price-quote">
                <Button variant="primary" size="lg">Get Best Price</Button>
              </Link>
              <Link href="/cars">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary-800">
                  View All Cars
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default OffersPage;
