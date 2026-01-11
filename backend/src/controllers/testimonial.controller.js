const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getAllTestimonials = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const testimonials = await Testimonial.find({ isActive: true })
      .sort('-rating -createdAt')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: testimonials,
      count: testimonials.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Public
exports.createTestimonial = async (req, res, next) => {
  try {
    const { name, designation, rating, review, car } = req.body;

    const testimonial = await Testimonial.create({
      name,
      designation,
      rating,
      review,
      car,
      isVerified: false,
      isActive: false, // Requires admin approval
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Your review will be visible after approval.',
      data: { id: testimonial._id },
    });
  } catch (error) {
    next(error);
  }
};
