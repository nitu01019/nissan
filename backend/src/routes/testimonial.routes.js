const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const {
  getAllTestimonials,
  createTestimonial,
} = require('../controllers/testimonial.controller');

const testimonialValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').trim().notEmpty().withMessage('Review is required'),
];

router.get('/', getAllTestimonials);
router.post('/', testimonialValidation, validate, createTestimonial);

module.exports = router;
