const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const {
  createInquiry,
  bookTestDrive,
  requestPriceQuote,
  getInquiry,
} = require('../controllers/inquiry.controller');

const inquiryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').optional({ nullable: true, checkFalsy: true }).isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit phone number is required'),
];

router.post('/', inquiryValidation, validate, createInquiry);
router.post('/test-drive', inquiryValidation, validate, bookTestDrive);
router.post('/price-quote', inquiryValidation, validate, requestPriceQuote);
router.get('/:id', getInquiry);

module.exports = router;
