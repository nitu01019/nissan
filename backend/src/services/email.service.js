const nodemailer = require('nodemailer');
const config = require('../config');

// Create transporter
const createTransporter = () => {
  if (!config.smtp.user || !config.smtp.pass) {
    console.warn('Email service not configured. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });
};

const transporter = createTransporter();

// Email templates
const templates = {
  inquiryConfirmation: (data) => ({
    subject: 'Thank you for your inquiry - Nissan Jammu',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #C3002F; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Nissan Jammu</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #1A1A1A;">Thank you, ${data.name}!</h2>
          <p>We have received your inquiry and our team will contact you shortly.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Inquiry Type:</strong> ${data.type}</p>
            ${data.carName ? `<p><strong>Car:</strong> ${data.carName}</p>` : ''}
            ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ''}
          </div>
          <p>If you have any questions, feel free to call us at <strong>+91 194 250 0000</strong></p>
        </div>
        <div style="background: #1A1A1A; padding: 20px; text-align: center; color: #888;">
          <p>© ${new Date().getFullYear()} Nissan Jammu. All rights reserved.</p>
        </div>
      </div>
    `,
  }),

  testDriveConfirmation: (data) => ({
    subject: 'Test Drive Booking Confirmation - Nissan Jammu',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #C3002F; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Test Drive Booked!</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #1A1A1A;">Hi ${data.name},</h2>
          <p>Your test drive has been scheduled. We'll confirm your appointment shortly.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Car:</strong> ${data.carName || 'To be confirmed'}</p>
            <p><strong>Date:</strong> ${data.preferredDate || 'To be confirmed'}</p>
            <p><strong>Time:</strong> ${data.preferredTime || 'To be confirmed'}</p>
          </div>
          <p style="color: #666;">Please bring your valid driving license for the test drive.</p>
        </div>
      </div>
    `,
  }),

  adminNotification: (data) => ({
    subject: `New ${data.type} Inquiry - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Inquiry Received</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Type</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.type}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone}</td></tr>
          ${data.carName ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Car</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.carName}</td></tr>` : ''}
          ${data.message ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.message}</td></tr>` : ''}
        </table>
      </div>
    `,
  }),
};

// Send email function
const sendEmail = async (to, template) => {
  if (!transporter) {
    console.log('Email skipped (not configured):', template.subject);
    return;
  }

  try {
    await transporter.sendMail({
      from: config.smtp.from,
      to,
      subject: template.subject,
      html: template.html,
    });
    console.log('Email sent:', template.subject);
  } catch (error) {
    console.error('Email error:', error.message);
  }
};

module.exports = {
  sendInquiryConfirmation: (data) => sendEmail(data.email, templates.inquiryConfirmation(data)),
  sendTestDriveConfirmation: (data) => sendEmail(data.email, templates.testDriveConfirmation(data)),
  sendPriceQuoteConfirmation: (data) => sendEmail(data.email, templates.inquiryConfirmation({ ...data, type: 'Price Quote' })),
  sendContactConfirmation: (data) => sendEmail(data.email, templates.inquiryConfirmation({ ...data, type: 'Contact' })),
  sendAdminNotification: (data) => sendEmail(config.smtp.user, templates.adminNotification(data)),
};
