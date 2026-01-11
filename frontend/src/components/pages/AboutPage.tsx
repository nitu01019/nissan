"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Target, Heart, Shield, Clock, MapPin, Phone } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const milestones = [
  { year: "2010", title: "Founded", description: "Channi Nissan was established as an authorized Nissan dealership in Jammu." },
  { year: "2014", title: "Service Excellence", description: "Awarded Best Nissan Service Center in the region." },
  { year: "2019", title: "Expansion", description: "Opened state-of-the-art showroom with modern facilities." },
  { year: "2024", title: "2500+ Customers", description: "Crossed the milestone of 2500+ happy customers." },
];

const values = [
  { icon: Target, title: "Customer First", description: "Your satisfaction is our top priority in everything we do." },
  { icon: Shield, title: "Trust & Integrity", description: "Transparent dealings with no hidden charges or surprises." },
  { icon: Award, title: "Excellence", description: "Striving for excellence in sales, service, and support." },
  { icon: Heart, title: "Passion", description: "Passionate about cars and helping you find your perfect match." },
];

const team = [
  { name: "Rajesh Channi", role: "Managing Director", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300" },
  { name: "Priya Sharma", role: "Sales Head", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300" },
  { name: "Vikram Singh", role: "Service Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" },
];

export const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562141961-b5d1ce7e9cd6?w=1920')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-900/90 to-transparent" />
        </div>
        <div className="container-custom relative h-full flex items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold mb-4"
            >
              Since 2010
            </motion.span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              About <span className="text-primary-400">Channi Nissan</span>
            </h1>
            <p className="text-xl text-gray-300">
              Your trusted Nissan partner in Jammu. We're more than a dealership – we're your automotive family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary-800 mt-2 mb-6">
                A Legacy of Excellence in Jammu
              </h2>
              <div className="space-y-4 text-secondary-600">
                <p>
                  Channi Nissan began its journey in 2010 with a simple mission: to bring world-class 
                  automotive experience to Jammu. What started as a small showroom has now grown into 
                  the region's most trusted Nissan dealership.
                </p>
                <p>
                  Over the years, we've helped over 2500 families find their perfect Nissan vehicle. 
                  Our commitment to excellence, transparent pricing, and exceptional after-sales support 
                  has made us the preferred choice for car buyers in Jammu.
                </p>
                <p>
                  Today, we offer the complete range of Nissan vehicles including Magnite, X-Trail, 
                  and Kicks, along with state-of-the-art service facilities, genuine parts, and a 
                  team of certified professionals dedicated to your satisfaction.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact">
                  <Button variant="primary" size="lg">Get In Touch</Button>
                </Link>
                <Link href="/cars">
                  <Button variant="outline" size="lg">Explore Cars</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600"
                  alt="Channi Nissan Showroom"
                  className="w-full h-auto"
                />
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-6 -left-6 bg-primary-500 text-white p-6 rounded-2xl shadow-xl"
              >
                <p className="text-5xl font-bold">14+</p>
                <p className="text-sm text-white/80">Years of Excellence</p>
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -top-6 -right-6 bg-white text-secondary-800 p-4 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">Certified</p>
                    <p className="text-xs text-secondary-500">Nissan Dealer</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader title="Our Journey" subtitle="Milestones" description="Key moments that shaped who we are today." />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200" />
            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg inline-block">
                      <span className="text-primary-500 font-bold text-3xl">{milestone.year}</span>
                      <h3 className="font-heading text-xl font-bold text-secondary-800 mt-2">{milestone.title}</h3>
                      <p className="text-secondary-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full -translate-x-1/2 z-10 shadow-lg shadow-primary-500/30" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader title="Our Values" subtitle="What We Stand For" description="The principles that guide everything we do." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <value.icon className="w-8 h-8 text-primary-500" />
                </motion.div>
                <h3 className="font-heading text-xl font-bold text-secondary-800 mb-2">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader title="Meet Our Team" subtitle="Leadership" description="The people behind Channi Nissan's success." />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg text-center group"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-secondary-800">{member.name}</h3>
                  <p className="text-primary-500 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500 relative overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] border border-white/10 rounded-full" 
        />
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Channi Nissan?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Visit our showroom in Jammu or contact us today to find your perfect Nissan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?type=test-drive">
                <Button variant="white" size="lg">Book Test Drive</Button>
              </Link>
              <Link href="/cars">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-500">
                  Explore Cars
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
