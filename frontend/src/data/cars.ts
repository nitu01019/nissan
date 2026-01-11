import { Car } from "@/types";

// Nissan Official Cars - Jammu Nissan Dealership (Channi Himmat)
export const cars: Car[] = [
  {
    id: "1",
    name: "Nissan Magnite",
    slug: "nissan-magnite",
    tagline: "Big. Bold. Beautiful.",
    category: "suv",
    pricePerDay: 599000, // Ex-showroom price
    pricePerWeek: 599000,
    pricePerMonth: 599000,
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=75&auto=format",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=75&auto=format",
    ],
    specs: {
      seats: 5,
      transmission: "manual",
      fuelType: "petrol",
      mileage: "20 km/l",
      ac: true,
      luggage: "336L",
      engine: "1.0L Turbo Petrol"
    },
    features: ["8\" Touchscreen", "Wireless Apple CarPlay", "360° Camera", "LED DRLs", "Cruise Control", "Push Button Start"],
    description: "The Nissan Magnite is a bold and stylish compact SUV that offers big features in a compact package. Perfect for city driving and weekend getaways.",
    isAvailable: true,
    isPopular: true,
    rating: 4.7,
    reviewCount: 1250,
    variants: [
      { name: "XE", price: 599000 },
      { name: "XL", price: 699000 },
      { name: "XV", price: 799000 },
      { name: "XV Premium", price: 899000 },
      { name: "XV Premium Turbo CVT", price: 1099000 }
    ]
  },
  {
    id: "2",
    name: "Nissan Kicks",
    slug: "nissan-kicks",
    tagline: "Intelligent Mobility",
    category: "suv",
    pricePerDay: 984000,
    pricePerWeek: 984000,
    pricePerMonth: 984000,
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=75&auto=format",
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=75&auto=format",
    ],
    specs: {
      seats: 5,
      transmission: "manual",
      fuelType: "petrol",
      mileage: "14.2 km/l",
      ac: true,
      luggage: "400L",
      engine: "1.5L Petrol"
    },
    features: ["8\" Touchscreen", "Around View Monitor", "Climate Control", "LED Headlamps", "Rear AC Vents", "6 Airbags"],
    description: "The Nissan Kicks combines bold design with intelligent features. A premium SUV experience with advanced safety and connectivity.",
    isAvailable: true,
    isPopular: true,
    rating: 4.5,
    reviewCount: 890,
    variants: [
      { name: "XL", price: 984000 },
      { name: "XV", price: 1099000 },
      { name: "XV Premium", price: 1199000 },
      { name: "XV Premium Turbo", price: 1399000 }
    ]
  },
  {
    id: "3",
    name: "Nissan X-Trail",
    slug: "nissan-x-trail",
    tagline: "Adventure Redefined",
    category: "premium",
    pricePerDay: 3499000,
    pricePerWeek: 3499000,
    pricePerMonth: 3499000,
    images: [
      "https://images.unsplash.com/photo-1625231334168-76bc42068e0f?w=800&q=75&auto=format",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75&auto=format",
    ],
    specs: {
      seats: 7,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: "12 km/l",
      ac: true,
      luggage: "565L",
      engine: "1.5L VC-Turbo e-POWER"
    },
    features: ["e-POWER Technology", "ProPILOT Assist", "Panoramic Sunroof", "Bose Audio", "Wireless Charging", "12.3\" Display"],
    description: "The all-new Nissan X-Trail brings revolutionary e-POWER technology to the premium SUV segment. Experience electrified performance without charging.",
    isAvailable: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 320,
    variants: [
      { name: "XV", price: 3499000 },
      { name: "XV Premium", price: 3899000 }
    ]
  },
  {
    id: "4",
    name: "Nissan Sunny",
    slug: "nissan-sunny",
    tagline: "Comfort Meets Efficiency",
    category: "sedan",
    pricePerDay: 899000,
    pricePerWeek: 899000,
    pricePerMonth: 899000,
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=75&auto=format",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=75&auto=format",
    ],
    specs: {
      seats: 5,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: "18 km/l",
      ac: true,
      luggage: "490L",
      engine: "1.5L Petrol"
    },
    features: ["8\" Touchscreen", "Rear AC Vents", "Push Button Start", "ABS with EBD", "Dual Airbags", "Rear Parking Sensors"],
    description: "The Nissan Sunny offers exceptional space, comfort and fuel efficiency. The perfect sedan for families who value practicality.",
    isAvailable: true,
    isPopular: false,
    rating: 4.3,
    reviewCount: 560,
    variants: [
      { name: "XE", price: 899000 },
      { name: "XL", price: 999000 },
      { name: "XV", price: 1099000 },
      { name: "XV CVT", price: 1199000 }
    ]
  },
  {
    id: "5",
    name: "Nissan Micra",
    slug: "nissan-micra",
    tagline: "City Smart",
    category: "hatchback",
    pricePerDay: 599000,
    pricePerWeek: 599000,
    pricePerMonth: 599000,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=75&auto=format",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=75&auto=format",
    ],
    specs: {
      seats: 5,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: "19.5 km/l",
      ac: true,
      luggage: "251L",
      engine: "1.2L Petrol"
    },
    features: ["CVT Transmission", "Touchscreen Infotainment", "Reverse Parking Sensors", "ABS", "Driver Airbag", "Power Windows"],
    description: "The Nissan Micra is the perfect city companion. Compact, efficient, and easy to maneuver in tight spaces.",
    isAvailable: true,
    isPopular: false,
    rating: 4.2,
    reviewCount: 780,
    variants: [
      { name: "XE", price: 599000 },
      { name: "XL", price: 679000 },
      { name: "XV CVT", price: 779000 }
    ]
  },
  {
    id: "6",
    name: "Nissan Terrano",
    slug: "nissan-terrano",
    tagline: "Urban Explorer",
    category: "suv",
    pricePerDay: 1099000,
    pricePerWeek: 1099000,
    pricePerMonth: 1099000,
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=75&auto=format",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format",
    ],
    specs: {
      seats: 5,
      transmission: "manual",
      fuelType: "diesel",
      mileage: "19.6 km/l",
      ac: true,
      luggage: "475L",
      engine: "1.5L dCi Diesel"
    },
    features: ["Touchscreen Navigation", "Climate Control", "6 Airbags", "Hill Start Assist", "ESP", "Cruise Control"],
    description: "The Nissan Terrano is built for urban adventures. Robust, stylish and packed with features for the modern explorer.",
    isAvailable: true,
    isPopular: false,
    rating: 4.4,
    reviewCount: 650,
    variants: [
      { name: "XE", price: 1099000 },
      { name: "XL", price: 1199000 },
      { name: "XV", price: 1349000 },
      { name: "XV Premium", price: 1499000 }
    ]
  }
];

// Helper functions
export const getCarBySlug = (slug: string): Car | undefined => {
  return cars.find((car) => car.slug === slug);
};

export const getCarsByCategory = (category: string): Car[] => {
  return cars.filter((car) => car.category === category);
};

export const getPopularCars = (): Car[] => {
  return cars.filter((car) => car.isPopular);
};

export const getAvailableCars = (): Car[] => {
  return cars.filter((car) => car.isAvailable);
};

export const searchCars = (query: string): Car[] => {
  const lowerQuery = query.toLowerCase();
  return cars.filter(
    (car) =>
      car.name.toLowerCase().includes(lowerQuery) ||
      car.category.toLowerCase().includes(lowerQuery) ||
      car.description.toLowerCase().includes(lowerQuery)
  );
};
