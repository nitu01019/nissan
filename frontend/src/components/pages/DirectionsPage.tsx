"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, Clock, Navigation, 
  Car, Bus, Truck, Copy, Check,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const locationData = {
  name: "Nissan Authorized Dealer - Channi Himmat",
  address: "NH-1A, Bye Pass, Opp. Channi Himmat, Jammu, Jammu & Kashmir - 180015",
  coordinates: { lat: 32.7266, lng: 74.8570 },
  phone: "+91 78895 59631",
  mobile: "+91 80625 11352",
  email: "sales@nissanjammu.com",
  hours: {
    weekdays: "9:30 AM - 7:00 PM",
    saturday: "9:30 AM - 7:00 PM",
    sunday: "10:00 AM - 6:00 PM"
  },
  landmarks: [
    "Opposite Channi Himmat",
    "On NH-1A Bypass Road",
    "Near Jammu Bypass",
    "Easy access from Ring Road"
  ]
};

const directions = [
  {
    from: "Jammu Railway Station",
    distance: "10 km",
    time: "25-30 mins",
    icon: Bus,
    steps: [
      "Exit the railway station from the main gate",
      "Head towards BC Road and join the main highway",
      "Take the bypass road (NH-1A) towards Channi Himmat",
      "Continue on the bypass - look for Channi Himmat area",
      "Nissan showroom is on the bypass road, opposite Channi Himmat"
    ]
  },
  {
    from: "Jammu Airport",
    distance: "8 km",
    time: "20-25 mins",
    icon: Navigation,
    steps: [
      "Exit the airport and take Airport Road",
      "Join NH-1A Bypass Road",
      "Head towards Channi Himmat area",
      "Continue on bypass road for approximately 6 km",
      "Nissan is on your right, opposite Channi Himmat"
    ]
  },
  {
    from: "Jammu Bus Stand",
    distance: "8 km",
    time: "20-25 mins",
    icon: Car,
    steps: [
      "Exit the bus stand and head towards bypass road",
      "Take NH-1A bypass towards Channi Himmat",
      "Continue straight on the bypass",
      "Cross the main intersection at Channi",
      "Nissan Dealer showroom is on your right"
    ]
  },
  {
    from: "Katra (Vaishno Devi)",
    distance: "45 km",
    time: "1 hour",
    icon: Truck,
    steps: [
      "Take NH-44 from Katra towards Jammu",
      "Continue on the highway past Udhampur",
      "As you approach Jammu, take NH-1A bypass",
      "Head towards Channi Himmat on bypass road",
      "Nissan showroom is opposite Channi Himmat"
    ]
  }
];

export function DirectionsPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeDirection, setActiveDirection] = useState(0);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${locationData.coordinates.lat},${locationData.coordinates.lng}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${locationData.coordinates.lat},${locationData.coordinates.lng}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <MapPin size={18} />
            <span>Find Us</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Directions & Location
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto"
          >
            Visit Nissan showroom at Channi Himmat, Jammu for the best car buying experience
          </motion.p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-[300px] md:h-[450px] lg:h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.8!2d74.857!3d32.7266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e8412a1c0f27d%3A0x8e9e2c0e4f4c6f1a!2sSignature%20Tower%2C%20National%20Highway%2C%20Sainik%20Colony%2C%20Jammu!5e0!3m2!1sen!2sin!4v1704999999999!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Nissan Channi Himmat Jammu - Showroom Location"
                    className="absolute inset-0"
                  />
                </div>
                
                <div className="p-4 bg-gray-50 flex flex-wrap gap-3">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-xl hover:bg-primary-700 transition-colors font-medium"
                  >
                    <Navigation size={18} />
                    Google Maps
                  </a>
                  <a
                    href={appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-xl hover:bg-gray-900 transition-colors font-medium"
                  >
                    <MapPin size={18} />
                    Apple Maps
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Location Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-primary-600" />
                  Our Location
                </h2>
                <p className="text-gray-700 mb-4">{locationData.address}</p>
                <button
                  onClick={() => copyToClipboard(locationData.address, 'address')}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  {copiedText === 'address' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedText === 'address' ? 'Copied!' : 'Copy Address'}
                </button>

                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-semibold text-gray-900 mb-2">Nearby Landmarks:</h3>
                  <ul className="space-y-2">
                    {locationData.landmarks.map((landmark, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                        {landmark}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Phone className="text-primary-600" />
                  Contact
                </h2>
                <div className="space-y-3">
                  <a
                    href={`tel:${locationData.mobile}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Phone className="text-primary-600" size={18} />
                    </div>
                    <div>
                      <p className="font-medium">{locationData.mobile}</p>
                      <p className="text-xs text-gray-500">Mobile</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="text-primary-600" />
                  Working Hours
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mon - Fri</span>
                    <span className="font-medium">{locationData.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">{locationData.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">{locationData.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Reach Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Step-by-step directions from major landmarks in Jammu
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {directions.map((dir, index) => (
              <button
                key={index}
                onClick={() => setActiveDirection(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  activeDirection === index
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <dir.icon size={18} />
                <span className="hidden sm:inline">{dir.from}</span>
                <span className="sm:hidden">{dir.from.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={activeDirection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    From {directions[activeDirection].from}
                  </h3>
                  <p className="text-gray-600">to Nissan, Channi Himmat</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">
                      {directions[activeDirection].distance}
                    </p>
                    <p className="text-xs text-gray-500">Distance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {directions[activeDirection].time}
                    </p>
                    <p className="text-xs text-gray-500">Est. Time</p>
                  </div>
                </div>
              </div>

              <ol className="space-y-4">
                {directions[activeDirection].steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-6 pt-6 border-t flex flex-wrap gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-colors font-medium"
                >
                  <ExternalLink size={16} />
                  Open in Maps
                </a>
                <a
                  href={`tel:${locationData.mobile}`}
                  className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  <Phone size={16} />
                  Call for Help
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parking Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Car className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Free Parking</h3>
                <p className="text-gray-600">
                  Complimentary parking available for all customers. Our spacious parking lot can accommodate up to 20 vehicles.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Truck className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Test Drive at Home</h3>
                <p className="text-gray-600">
                  Can't visit us? We offer doorstep test drive service across Jammu. Book in advance and experience your dream Nissan at your location.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
