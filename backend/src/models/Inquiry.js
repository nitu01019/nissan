const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['test-drive', 'test_drive', 'price-quote', 'quote', 'general', 'service', 'insurance', 'finance'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: false, // Email is optional for popup forms
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please provide a valid Indian phone number'],
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  },
  carName: {
    type: String,
    trim: true,
  },
  variant: {
    type: String,
    trim: true,
  },
  preferredDate: {
    type: Date,
  },
  preferredTime: {
    type: String,
  },
  message: {
    type: String,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  // Additional fields for specific inquiry types
  financingRequired: {
    type: Boolean,
    default: false,
  },
  exchangeVehicle: {
    type: Boolean,
    default: false,
  },
  currentVehicle: {
    type: String,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'scheduled', 'completed', 'cancelled'],
    default: 'new',
  },
  source: {
    type: String,
    enum: ['website', 'website_popup', 'contact_form', 'phone', 'walk-in', 'referral', 'campaign'],
    default: 'website',
  },
  assignedTo: {
    type: String,
  },
  notes: [{
    content: String,
    addedBy: String,
    addedAt: { type: Date, default: Date.now },
  }],
  followUpDate: {
    type: Date,
  },
  convertedToSale: {
    type: Boolean,
    default: false,
  },
  ipAddress: String,
  userAgent: String,
}, {
  timestamps: true,
});

// Indexes
inquirySchema.index({ status: 1 });
inquirySchema.index({ type: 1 });
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ email: 1 });
inquirySchema.index({ phone: 1 });

// Pre-save middleware
inquirySchema.pre('save', function(next) {
  // Clean phone number
  if (this.phone) {
    this.phone = this.phone.replace(/\D/g, '').slice(-10);
  }
  next();
});

module.exports = mongoose.model('Inquiry', inquirySchema);
