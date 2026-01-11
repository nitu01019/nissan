const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceBySlug,
  getPopularServices,
} = require('../controllers/service.controller');

router.get('/', getAllServices);
router.get('/popular', getPopularServices);
router.get('/:slug', getServiceBySlug);

module.exports = router;
