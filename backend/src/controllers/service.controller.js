const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort('order')
      .select('-__v');

    res.status(200).json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get service by slug
// @route   GET /api/services/:slug
// @access  Public
exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get popular services
// @route   GET /api/services/popular
// @access  Public
exports.getPopularServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isPopular: true, isActive: true })
      .sort('order')
      .limit(6);

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};
