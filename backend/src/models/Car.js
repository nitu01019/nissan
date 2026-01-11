const mongoose = require('mongoose');

const colorImageSchema = new mongoose.Schema({
  colorName: { type: String, required: true },
  colorCode: { type: String, required: true },
  image: { type: String, required: true },
}, { _id: false });

const carColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, enum: ['solid', 'metallic', 'pearl'], default: 'solid' },
}, { _id: false });

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  fuelType: { type: String, enum: ['petrol', 'diesel', 'electric', 'hybrid'], required: true },
  transmission: { type: String, enum: ['manual', 'automatic', 'cvt'], required: true },
  keyFeatures: [{ type: String }],
}, { _id: false });

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  tagline: {
    type: String,
    trim: true,
    maxlength: [200, 'Tagline cannot exceed 200 characters'],
  },
  category: {
    type: String,
    required: true,
    enum: ['suv', 'sedan', 'hatchback', 'crossover', 'electric', 'premium'],
  },
  price: {
    exShowroom: { type: Number, required: true },
    onRoad: { type: Number, required: true },
    emi: { type: Number },
  },
  images: {
    main: { type: String, required: true },
    gallery: [{ type: String }],
    colors: [colorImageSchema],
  },
  specifications: {
    engine: {
      type: { type: String },
      displacement: String,
      power: String,
      torque: String,
      transmission: String,
    },
    performance: {
      topSpeed: String,
      acceleration: String,
      fuelType: String,
      mileage: String,
    },
    dimensions: {
      length: String,
      width: String,
      height: String,
      wheelbase: String,
      bootSpace: String,
      fuelTank: String,
      groundClearance: String,
    },
    capacity: {
      seating: { type: Number, default: 5 },
      doors: { type: Number, default: 4 },
    },
  },
  features: {
    safety: [{ type: String }],
    comfort: [{ type: String }],
    technology: [{ type: String }],
    exterior: [{ type: String }],
    interior: [{ type: String }],
  },
  variants: [variantSchema],
  colors: [carColorSchema],
  highlights: [{ type: String }],
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  isNewLaunch: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isElectric: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes for better query performance
carSchema.index({ slug: 1 });
carSchema.index({ category: 1 });
carSchema.index({ 'price.exShowroom': 1 });
carSchema.index({ isNewLaunch: 1 });
carSchema.index({ isBestSeller: 1 });
carSchema.index({ isActive: 1 });

// Virtual for formatted price
carSchema.virtual('formattedPrice').get(function() {
  const lakhs = this.price.exShowroom / 100000;
  return `₹ ${lakhs.toFixed(2)} Lakh*`;
});

// Pre-save middleware to generate slug
carSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

module.exports = mongoose.model('Car', carSchema);
