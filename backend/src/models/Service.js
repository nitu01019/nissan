const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters'],
  },
  icon: String,
  image: String,
  features: [{ type: String }],
  price: {
    starting: Number,
    type: { type: String, enum: ['fixed', 'variable'], default: 'variable' },
  },
  duration: String,
  isPopular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

serviceSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('Service', serviceSchema);
