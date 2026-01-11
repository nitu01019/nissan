const Inquiry = require('../models/Inquiry');
const emailService = require('../services/email.service');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const inquiry = await Inquiry.create({
      type: 'general',
      name,
      email,
      phone,
      message: `Subject: ${subject}\n\n${message}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Send emails
    emailService.sendContactConfirmation({ name, email, subject }).catch(console.error);
    emailService.sendAdminNotification(inquiry).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact information
// @route   GET /api/contact/info
// @access  Public
exports.getContactInfo = async (req, res, next) => {
  try {
    const contactInfo = {
      address: {
        line1: 'Nissan Showroom',
        line2: 'Channi Himmat, National Highway',
        city: 'Jammu',
        state: 'Jammu & Kashmir',
        pincode: '180015',
      },
      phone: ['+91 191 250 0000', '+91 98765 43210'],
      email: ['info@nissanjammu.com', 'sales@nissanjammu.com'],
      timing: {
        weekdays: '9:00 AM - 7:00 PM',
        weekends: '10:00 AM - 6:00 PM',
      },
      socialLinks: {
        facebook: 'https://facebook.com/nissanjammu',
        instagram: 'https://instagram.com/nissanjammu',
        twitter: 'https://twitter.com/nissanjammu',
        youtube: 'https://youtube.com/nissanjammu',
      },
      mapCoordinates: {
        lat: 34.0837,
        lng: 74.7973,
      },
    };

    res.status(200).json({
      success: true,
      data: contactInfo,
    });
  } catch (error) {
    next(error);
  }
};
