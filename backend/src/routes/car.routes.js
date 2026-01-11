const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarBySlug,
  getFeaturedCars,
  getCarsByCategory,
  compareCars,
} = require('../controllers/car.controller');

router.get('/', getAllCars);
router.get('/featured', getFeaturedCars);
router.get('/category/:category', getCarsByCategory);
router.post('/compare', compareCars);
router.get('/:slug', getCarBySlug);

module.exports = router;
