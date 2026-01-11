const Inquiry = require('../models/Inquiry');
const emailService = require('../services/email.service');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res, next) => {
  try {
    const {
      type,
      name,
      email,
      phone,
      car,
      carName,
      carModel, // Support carModel from popup form
      variant,
      preferredDate,
      preferredTime,
      message,
      financingRequired,
      exchangeVehicle,
      source, // Track inquiry source (website_popup, contact_form, etc.)
    } = req.body;

    // Create inquiry
    const inquiry = await Inquiry.create({
      type: type || 'general',
      name,
      email: email || null,
      phone,
      car,
      carName: carName || carModel, // Support both field names
      variant,
      preferredDate,
      preferredTime,
      message,
      financingRequired,
      exchangeVehicle,
      source: source || 'website',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Send confirmation email (non-blocking)
    emailService.sendInquiryConfirmation(inquiry).catch(console.error);

    // Send notification to admin (non-blocking)
    emailService.sendAdminNotification(inquiry).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will contact you soon!',
      data: {
        id: inquiry._id,
        type: inquiry.type,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Book test drive
// @route   POST /api/inquiries/test-drive
// @access  Public
exports.bookTestDrive = async (req, res, next) => {
  try {
    const { name, email, phone, car, carName, variant, preferredDate, preferredTime, message } = req.body;

    const inquiry = await Inquiry.create({
      type: 'test-drive',
      name,
      email,
      phone,
      car,
      carName,
      variant,
      preferredDate,
      preferredTime,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    emailService.sendTestDriveConfirmation(inquiry).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Test drive booked successfully! We will confirm your appointment shortly.',
      data: { id: inquiry._id },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Request price quote
// @route   POST /api/inquiries/price-quote
// @access  Public
exports.requestPriceQuote = async (req, res, next) => {
  try {
    const { name, email, phone, car, carName, variant, financingRequired, exchangeVehicle, message } = req.body;

    const inquiry = await Inquiry.create({
      type: 'price-quote',
      name,
      email,
      phone,
      car,
      carName,
      variant,
      financingRequired,
      exchangeVehicle,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    emailService.sendPriceQuoteConfirmation(inquiry).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Price quote request submitted! Our team will send you the best offer.',
      data: { id: inquiry._id },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inquiry by ID (for admin)
// @route   GET /api/inquiries/:id
// @access  Private
exports.getInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate('car');

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};
