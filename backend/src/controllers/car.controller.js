const Car = require('../models/Car');

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
exports.getAllCars = async (req, res, next) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      isNewLaunch,
      isBestSeller,
      sort = '-createdAt',
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (category) query.category = category;
    if (isNewLaunch === 'true') query.isNewLaunch = true;
    if (isBestSeller === 'true') query.isBestSeller = true;
    if (minPrice || maxPrice) {
      query['price.exShowroom'] = {};
      if (minPrice) query['price.exShowroom'].$gte = parseInt(minPrice);
      if (maxPrice) query['price.exShowroom'].$lte = parseInt(maxPrice);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const [cars, total] = await Promise.all([
      Car.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .select('-__v'),
      Car.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: cars,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasMore: skip + cars.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single car by slug
// @route   GET /api/cars/:slug
// @access  Public
exports.getCarBySlug = async (req, res, next) => {
  try {
    const car = await Car.findOne({ slug: req.params.slug, isActive: true });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found',
      });
    }

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured cars (best sellers + new launches)
// @route   GET /api/cars/featured
// @access  Public
exports.getFeaturedCars = async (req, res, next) => {
  try {
    const [bestSellers, newLaunches] = await Promise.all([
      Car.find({ isBestSeller: true, isActive: true }).limit(4),
      Car.find({ isNewLaunch: true, isActive: true }).limit(4),
    ]);

    res.status(200).json({
      success: true,
      data: { bestSellers, newLaunches },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get cars by category
// @route   GET /api/cars/category/:category
// @access  Public
exports.getCarsByCategory = async (req, res, next) => {
  try {
    const cars = await Car.find({
      category: req.params.category,
      isActive: true,
    }).sort('price.exShowroom');

    res.status(200).json({
      success: true,
      data: cars,
      count: cars.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Compare cars
// @route   POST /api/cars/compare
// @access  Public
exports.compareCars = async (req, res, next) => {
  try {
    const { carIds } = req.body;

    if (!carIds || !Array.isArray(carIds) || carIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least 2 car IDs to compare',
      });
    }

    const cars = await Car.find({
      _id: { $in: carIds },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};
