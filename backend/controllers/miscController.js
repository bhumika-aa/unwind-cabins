const Message = require('../models/Message');
const Subscriber = require('../models/Subscriber');
const asyncHandler = require('../middlewares/async');
const sendEmail = require('../utils/email');
const { contactFormConfirmationEmail, newsletterSubscriptionEmail } = require('../utils/emailTemplates');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  await Message.create({ name, email, message });

  // Send confirmation email to user
  await sendEmail({
    email,
    subject: 'We received your message!',
    html: contactFormConfirmationEmail(name)
  });

  res.status(200).json({ success: true, data: 'Message received' });
});

// @desc    Get all messages
// @route   GET /api/contact
// @access  Private/Admin
exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().sort('-createdAt');
  res.status(200).json({ success: true, count: messages.length, data: messages });
});

// @desc    Delete message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
exports.subscribeNewsletter = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const existing = await Subscriber.findOne({ email });
  if (existing) {
    return res.status(400).json({ success: false, message: 'Already subscribed' });
  }

  await Subscriber.create({ email });

  await sendEmail({
    email,
    subject: 'Welcome to the UnwindCabins Newsletter',
    html: newsletterSubscriptionEmail()
  });

  res.status(200).json({ success: true, data: 'Subscribed successfully' });
});

// @desc    Get all subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
exports.getSubscribers = asyncHandler(async (req, res, next) => {
  const subscribers = await Subscriber.find().sort('-createdAt');
  res.status(200).json({ success: true, count: subscribers.length, data: subscribers });
});

// @desc    Delete subscriber
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
exports.deleteSubscriber = asyncHandler(async (req, res, next) => {
  await Subscriber.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});
