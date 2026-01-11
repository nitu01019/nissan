"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, Wrench, Users, Clock, ThumbsUp, Car, Headphones } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Shield,
    title: "Authorized Nissan Dealer",
    description: "Official Nissan dealership in Jammu with 100% genuine vehicles and certified services.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Award,
    title: "Award Winning Service",
    description: "Recognized by Nissan India for excellence in customer satisfaction and sales performance.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    description: "Nissan-certified technicians using genuine parts and latest diagnostic equipment.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Users,
    title: "2500+ Happy Customers",
    description: "Trusted by families across Jammu & Kashmir for their Nissan vehicle purchases.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Clock,
    title: "Quick Delivery",
    description: "Fast vehicle delivery with hassle-free documentation and registration.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: ThumbsUp,
    title: "Best Deals & Finance",
    description: "Competitive on-road prices with easy EMI options and attractive exchange offers.",
    color: "from-red-500 to-red-700",
  },
];

const stats = [
  { value: "10+", label: "Years in Jammu", icon: Award },
  { value: "2500+", label: "Cars Delivered", icon: Users },
  { value: "6", label: "Nissan Models", icon: Car },
  { value: "100%", label: "Genuine Service", icon: Headphones },
];

export const WhyChooseUs: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-gray-100 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] border border-gray-100 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeader
          badge="Why Us"
          subtitle="Your Trusted Nissan Partner"
          title="Why Choose Nissan Jammu"
          description="As an authorized Nissan dealer in Channi Himmat, we're committed to delivering excellence in sales, service, and customer satisfaction."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="font-heading text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner Decoration */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-red-500" />
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            <div className="relative z-10 p-10 md:p-14">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.p 
                      className="text-4xl md:text-5xl font-bold text-white mb-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
