/**
 * MongoDB Database Adapter
 * 
 * Cloud-ready database for production deployments
 * Supports MongoDB Atlas and self-hosted instances
 * 
 * @author Nissan Jammu Development Team
 */

const mongoose = require('mongoose');

class MongoDBAdapter {
  constructor(config) {
    this.config = config;
    this.connection = null;
    this.models = {};
  }

  /**
   * Connect to MongoDB
   */
  async connect() {
    try {
      this.connection = await mongoose.connect(this.config.uri, this.config.options);

      // Event handlers
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected');
      });

      mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconnected');
      });

      console.log(`🍃 MongoDB connected: ${this.connection.connection.host}`);
      
      // Initialize models
      this.initializeModels();
      
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  /**
   * Initialize Mongoose models
   */
  initializeModels() {
    // User Schema
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true, lowercase: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      phone: String,
      avatar: String,
      role: { type: String, enum: ['user', 'admin', 'staff'], default: 'user' },
      isVerified: { type: Boolean, default: false },
      isActive: { type: Boolean, default: true },
      refreshToken: String,
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      lastLogin: Date,
    }, { timestamps: true });

    // Session Schema
    const sessionSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      token: { type: String, required: true },
      userAgent: String,
      ipAddress: String,
      expiresAt: { type: Date, required: true },
    }, { timestamps: true });

    // Inquiry Schema
    const inquirySchema = new mongoose.Schema({
      type: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      car: String,
      variant: String,
      message: String,
      preferredDate: String,
      preferredTime: String,
      status: { type: String, default: 'new' },
      assignedTo: String,
      notes: String,
    }, { timestamps: true });

    // Car Schema
    const carSchema = new mongoose.Schema({
      name: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      tagline: String,
      category: { type: String, required: true },
      price: {
        exShowroom: Number,
        onRoad: Number,
        emi: Number,
      },
      images: {
        main: String,
        gallery: [String],
        colors: [{
          colorName: String,
          colorCode: String,
          image: String,
        }],
      },
      specifications: mongoose.Schema.Types.Mixed,
      features: mongoose.Schema.Types.Mixed,
      variants: [mongoose.Schema.Types.Mixed],
      colors: [mongoose.Schema.Types.Mixed],
      highlights: [String],
      description: String,
      isNewLaunch: { type: Boolean, default: false },
      isBestSeller: { type: Boolean, default: false },
      isElectric: { type: Boolean, default: false },
      isActive: { type: Boolean, default: true },
      rating: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
    }, { timestamps: true });

    // Testimonial Schema
    const testimonialSchema = new mongoose.Schema({
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      review: { type: String, required: true },
      car: String,
      image: String,
      isActive: { type: Boolean, default: true },
    }, { timestamps: true });

    // Accessory Schema
    const accessorySchema = new mongoose.Schema({
      name: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      originalPrice: Number,
      image: String,
      compatibleModels: [String],
      description: String,
      inStock: { type: Boolean, default: true },
      isBestSeller: { type: Boolean, default: false },
      isNew: { type: Boolean, default: false },
      rating: { type: Number, default: 0 },
    }, { timestamps: true });

    // Create or get models
    this.models = {
      users: mongoose.models.User || mongoose.model('User', userSchema),
      sessions: mongoose.models.Session || mongoose.model('Session', sessionSchema),
      inquiries: mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema),
      cars: mongoose.models.Car || mongoose.model('Car', carSchema),
      testimonials: mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema),
      accessories: mongoose.models.Accessory || mongoose.model('Accessory', accessorySchema),
    };
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    await mongoose.disconnect();
    this.connection = null;
  }

  /**
   * Get model for collection
   */
  getModel(collection) {
    const model = this.models[collection];
    if (!model) {
      throw new Error(`Model not found for collection: ${collection}`);
    }
    return model;
  }

  // ============================================
  // CRUD OPERATIONS
  // ============================================

  async create(collection, data) {
    const Model = this.getModel(collection);
    const doc = new Model(data);
    await doc.save();
    return doc.toObject();
  }

  async find(collection, query = {}, options = {}) {
    const Model = this.getModel(collection);
    let queryBuilder = Model.find(query);

    if (options.sort) {
      queryBuilder = queryBuilder.sort(options.sort);
    }
    if (options.skip) {
      queryBuilder = queryBuilder.skip(options.skip);
    }
    if (options.limit) {
      queryBuilder = queryBuilder.limit(options.limit);
    }
    if (options.populate) {
      queryBuilder = queryBuilder.populate(options.populate);
    }

    const docs = await queryBuilder.lean();
    return docs.map(doc => ({ ...doc, id: doc._id.toString() }));
  }

  async findOne(collection, query) {
    const Model = this.getModel(collection);
    const doc = await Model.findOne(query).lean();
    if (!doc) return null;
    return { ...doc, id: doc._id.toString() };
  }

  async findById(collection, id) {
    const Model = this.getModel(collection);
    const doc = await Model.findById(id).lean();
    if (!doc) return null;
    return { ...doc, id: doc._id.toString() };
  }

  async update(collection, query, data) {
    const Model = this.getModel(collection);
    const result = await Model.updateMany(query, { $set: data });
    return { modifiedCount: result.modifiedCount };
  }

  async updateById(collection, id, data) {
    const Model = this.getModel(collection);
    const result = await Model.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
    if (!result) return null;
    return { ...result, id: result._id.toString() };
  }

  async delete(collection, query) {
    const Model = this.getModel(collection);
    const result = await Model.deleteMany(query);
    return { deletedCount: result.deletedCount };
  }

  async deleteById(collection, id) {
    const Model = this.getModel(collection);
    const result = await Model.findByIdAndDelete(id);
    return { deletedCount: result ? 1 : 0 };
  }

  async count(collection, query = {}) {
    const Model = this.getModel(collection);
    return Model.countDocuments(query);
  }

  /**
   * Execute aggregation pipeline
   */
  async aggregate(collection, pipeline) {
    const Model = this.getModel(collection);
    return Model.aggregate(pipeline);
  }

  /**
   * Transaction support
   */
  async transaction(callback) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const result = await callback(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

module.exports = MongoDBAdapter;
