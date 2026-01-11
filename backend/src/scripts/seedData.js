require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('../models/Car');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const config = require('../config');

const cars = [
  {
    name: 'Nissan Magnite',
    slug: 'nissan-magnite',
    tagline: 'Carismatic by Design',
    category: 'suv',
    price: { exShowroom: 599000, onRoad: 720000, emi: 9999 },
    images: {
      main: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
      gallery: ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'],
      colors: [{ colorName: 'Storm White', colorCode: '#FFFFFF', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800' }],
    },
    specifications: {
      engine: { type: '1.0L Turbo Petrol', displacement: '999 cc', power: '100 PS', torque: '160 Nm', transmission: '5-Speed MT / CVT' },
      performance: { topSpeed: '170 km/h', acceleration: '10.5s', fuelType: 'Petrol', mileage: '20.0 km/l' },
      dimensions: { length: '3994 mm', width: '1758 mm', height: '1572 mm', wheelbase: '2500 mm', bootSpace: '336 L', fuelTank: '40 L', groundClearance: '205 mm' },
      capacity: { seating: 5, doors: 5 },
    },
    features: {
      safety: ['Dual Airbags', 'ABS with EBD', 'Vehicle Dynamic Control'],
      comfort: ['Automatic Climate Control', 'Push Button Start'],
      technology: ['8-inch Touchscreen', 'Apple CarPlay', 'Android Auto'],
      exterior: ['LED Projector Headlamps', '16-inch Alloy Wheels'],
      interior: ['Ambient Lighting', 'Leather Wrapped Steering'],
    },
    variants: [
      { name: 'XE', price: 599000, fuelType: 'petrol', transmission: 'manual', keyFeatures: ['Dual Airbags', 'ABS'] },
      { name: 'XV Premium Turbo CVT', price: 1099000, fuelType: 'petrol', transmission: 'cvt', keyFeatures: ['Turbo Engine', '360 Camera'] },
    ],
    colors: [{ name: 'Storm White', code: '#FFFFFF', type: 'solid' }, { name: 'Onyx Black', code: '#1A1A1A', type: 'solid' }],
    highlights: ['Best-in-class Ground Clearance', 'Turbo Engine Option'],
    description: 'The Nissan Magnite is a compact SUV that redefines the segment with its bold design and powerful performance.',
    isNewLaunch: false,
    isBestSeller: true,
    rating: 4.5,
    reviewCount: 1250,
  },
  {
    name: 'Nissan X-Trail',
    slug: 'nissan-x-trail',
    tagline: 'Adventure Awaits',
    category: 'suv',
    price: { exShowroom: 4990000, onRoad: 5500000, emi: 75000 },
    images: {
      main: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
      gallery: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800'],
      colors: [{ colorName: 'Pearl White', colorCode: '#F5F5F5', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800' }],
    },
    specifications: {
      engine: { type: '1.5L e-POWER Hybrid', displacement: '1498 cc', power: '204 PS', torque: '330 Nm', transmission: 'e-POWER' },
      performance: { topSpeed: '180 km/h', acceleration: '8.5s', fuelType: 'Hybrid', mileage: '18.0 km/l' },
      dimensions: { length: '4680 mm', width: '1840 mm', height: '1725 mm', wheelbase: '2705 mm', bootSpace: '585 L', fuelTank: '55 L', groundClearance: '200 mm' },
      capacity: { seating: 7, doors: 5 },
    },
    features: {
      safety: ['7 Airbags', 'ProPILOT Assist', 'Blind Spot Warning'],
      comfort: ['Panoramic Sunroof', 'Heated Seats'],
      technology: ['12.3-inch Display', 'Bose Sound System'],
      exterior: ['Matrix LED Headlamps', '20-inch Alloy Wheels'],
      interior: ['Leather Seats', 'Digital Cockpit'],
    },
    variants: [{ name: 'XV e-POWER', price: 4990000, fuelType: 'hybrid', transmission: 'automatic', keyFeatures: ['e-POWER Hybrid', 'ProPILOT'] }],
    colors: [{ name: 'Pearl White', code: '#F5F5F5', type: 'pearl' }],
    highlights: ['e-POWER Hybrid Technology', 'ProPILOT Assist'],
    description: 'The all-new Nissan X-Trail combines cutting-edge e-POWER hybrid technology with advanced safety features.',
    isNewLaunch: true,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 320,
  },
];

const services = [
  { name: 'Periodic Service', slug: 'periodic-service', description: 'Regular maintenance service', shortDescription: 'Keep your car in top condition', features: ['Oil Change', 'Filter Replacement', 'Multi-point Inspection'], isPopular: true, order: 1 },
  { name: 'Genuine Parts', slug: 'genuine-parts', description: 'Original Nissan spare parts', shortDescription: '100% genuine Nissan parts', features: ['Warranty Covered', 'Perfect Fit', 'Durable Quality'], isPopular: true, order: 2 },
  { name: 'Insurance', slug: 'insurance', description: 'Comprehensive car insurance', shortDescription: 'Protect your investment', features: ['Cashless Claims', 'Quick Processing', 'Best Rates'], isPopular: true, order: 3 },
  { name: 'Extended Warranty', slug: 'extended-warranty', description: 'Extended protection plans', shortDescription: 'Peace of mind coverage', features: ['Up to 5 Years', 'Comprehensive Coverage'], isPopular: false, order: 4 },
];

const testimonials = [
  { name: 'Rahul Sharma', designation: 'Business Owner', rating: 5, review: 'Excellent service and great deals on the Magnite. The team was very helpful throughout the purchase process.', car: 'Nissan Magnite', isVerified: true, isActive: true },
  { name: 'Priya Malik', designation: 'Doctor', rating: 5, review: 'Best car buying experience! The staff was knowledgeable and made everything smooth.', car: 'Nissan X-Trail', isVerified: true, isActive: true },
  { name: 'Ahmad Khan', designation: 'Engineer', rating: 4, review: 'Great after-sales service. They really care about customer satisfaction.', car: 'Nissan Kicks', isVerified: true, isActive: true },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([Car.deleteMany({}), Service.deleteMany({}), Testimonial.deleteMany({})]);
    console.log('Cleared existing data');

    // Insert new data
    await Promise.all([Car.insertMany(cars), Service.insertMany(services), Testimonial.insertMany(testimonials)]);
    console.log('Database seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
