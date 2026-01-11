const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  designation: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: [true, 'Review is required'],
    maxlength: [500, 'Review cannot exceed 500 characters'],
  },
  car: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  source: {
    type: String,
    enum: ['google', 'facebook', 'website', 'manual'],
    default: 'website',
  },
}, {
  timestamps: true,
});

testimonialSchema.index({ isActive: 1, rating: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
