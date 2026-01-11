// Car Related Types - For Nissan Car Dealership
export interface Car {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: CarCategory;
  pricePerDay: number; // Ex-showroom price in INR
  pricePerWeek?: number;
  pricePerMonth?: number;
  images: string[];
  specs: CarSpecs;
  features: string[];
  description: string;
  isAvailable: boolean;
  isPopular: boolean;
  rating: number;
  reviewCount: number;
  variants?: CarVariantSimple[];
}

export interface CarVariantSimple {
  name: string;
  price: number;
}

export interface CarSpecs {
  seats: number;
  transmission: 'manual' | 'automatic';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  mileage: string;
  ac: boolean;
  luggage: string;
  engine?: string;
}

export type CarCategory = 'hatchback' | 'sedan' | 'suv' | 'muv' | 'luxury' | 'premium';

// Legacy type support for existing components
export interface LegacyCar {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  category: CarCategory;
  price: {
    exShowroom: number;
    onRoad: number;
    emi?: number;
  };
  images: {
    main: string;
    gallery: string[];
    colors: ColorImage[];
  };
  specifications: CarSpecifications;
  features: CarFeatures;
  variants: CarVariant[];
  colors: CarColor[];
  highlights: string[];
  description: string;
  isNewLaunch: boolean;
  isBestSeller: boolean;
  isElectric: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ColorImage {
  colorName: string;
  colorCode: string;
  image: string;
}

export interface CarSpecifications {
  engine: {
    type: string;
    displacement: string;
    power: string;
    torque: string;
    transmission: string;
  };
  performance: {
    topSpeed: string;
    acceleration: string;
    fuelType: string;
    mileage: string;
  };
  dimensions: {
    length: string;
    width: string;
    height: string;
    wheelbase: string;
    bootSpace: string;
    fuelTank: string;
    groundClearance: string;
  };
  capacity: {
    seating: number;
    doors: number;
  };
}

export interface CarFeatures {
  safety: string[];
  comfort: string[];
  technology: string[];
  exterior: string[];
  interior: string[];
}

export interface CarVariant {
  name: string;
  price: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic' | 'cvt';
  keyFeatures: string[];
}

export interface CarColor {
  name: string;
  code: string;
  type: 'solid' | 'metallic' | 'pearl';
}

// Inquiry Types
export interface Inquiry {
  _id: string;
  type: InquiryType;
  name: string;
  email: string;
  phone: string;
  car?: string;
  variant?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  status: InquiryStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export type InquiryType = 'booking' | 'inquiry' | 'general' | 'support';
export type InquiryStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';

// Service Types
export interface Service {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  price?: {
    starting: number;
    type: 'fixed' | 'variable';
  };
  duration?: string;
  isPopular: boolean;
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  name: string;
  designation?: string;
  avatar?: string;
  rating: number;
  review: string;
  car?: string;
  isVerified: boolean;
  createdAt: string;
}

// Contact Types
export interface ContactInfo {
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  phone: string[];
  email: string[];
  timing: {
    weekdays: string;
    weekends: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

// Form Types
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  car: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  withDriver: boolean;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isNew?: boolean;
  icon?: string;
}

// Offer Types
export interface Offer {
  _id: string;
  title: string;
  description: string;
  image: string;
  validTill: string;
  discount?: string;
  applicableCars?: string[];
  termsConditions: string[];
  isActive: boolean;
}
