"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Navigation, Clock, Phone, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactInfo } from "@/data/navigation";

export const LocationSection: React.FC = () => {
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.123456789!2d${contactInfo.mapCoordinates.lng}!3d${contactInfo.mapCoordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNissan%20Channi%20Himmat!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin`;
  
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${contactInfo.mapCoordinates.lat},${contactInfo.mapCoordinates.lng}&destination_place_id=Nissan+Channi+Himmat+Jammu`;

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Find Us"
          subtitle="Visit Our"
          title="Showroom"
          description="Experience the complete range of Nissan vehicles at our state-of-the-art showroom in Channi Himmat, Jammu."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-full min-h-[400px]"
          >
            {/* Google Maps Embed */}
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nissan Showroom Location"
              className="absolute inset-0"
            />
            
            {/* Map Overlay with CTA */}
            <div className="absolute bottom-4 left-4 right-4">
              <motion.a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl shadow-lg transition-colors"
              >
                <Navigation className="w-5 h-5" />
                <span className="font-semibold">Get Directions</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Showroom Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-xl text-gray-900">Nissan Dealer Pvt. Ltd</h3>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Open Now
                    </span>
                  </div>
                  <p className="text-primary-600 font-medium text-sm mb-3">Authorized Nissan Dealer</p>
                  <address className="text-gray-600 not-italic leading-relaxed">
                    {contactInfo.address.line2}<br />
                    {contactInfo.address.line3}, {contactInfo.address.city}<br />
                    {contactInfo.address.state} - {contactInfo.address.pincode}
                  </address>
                </div>
              </div>
              
              {/* Google Rating */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-5 h-5 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/50 text-yellow-400/50'}`} />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">4.7/5 on Google Reviews</span>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Phone */}
              <motion.a
                href={`tel:${contactInfo.phone[0].replace(/\s/g, '')}`}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:border-primary-300 transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-500 transition-colors">
                  <Phone className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-500 text-sm mb-1">Sales Enquiry</p>
                <p className="font-bold text-gray-900">{contactInfo.phone[0]}</p>
              </motion.a>

              {/* Timing */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-5 shadow-md border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-500 text-sm mb-1">Working Hours</p>
                <p className="font-bold text-gray-900 text-sm">Mon-Sat: {contactInfo.timing.weekdays}</p>
                <p className="text-gray-600 text-sm">Sun: {contactInfo.timing.weekends}</p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/contact?type=test-drive" className="flex-1">
                <Button variant="primary" size="lg" fullWidth>
                  Book Test Drive
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button variant="outline" size="lg" fullWidth>
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
