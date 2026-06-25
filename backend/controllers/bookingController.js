const Booking = require('../models/Booking');
const Cabin = require('../models/Cabin');
const asyncHandler = require('../middlewares/async');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');
const { bookingConfirmationEmail, bookingCancellationEmail } = require('../utils/emailTemplates');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = asyncHandler(async (req, res, next) => {
  let query;

  if (req.user.role !== 'admin') {
    query = Booking.find({ user: req.user.id }).populate({
      path: 'cabin',
      select: 'title location price images'
    });
  } else {
    query = Booking.find().populate({
      path: 'cabin',
      select: 'title location price'
    }).populate({
      path: 'user',
      select: 'firstName lastName email'
    });
  }

  const bookings = await query;

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id).populate('cabin').populate('user', 'firstName lastName email');

  if (!booking) {
    return next(new AppError(`No booking found with the id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError(`Not authorized to access this booking`, 401));
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Add booking
// @route   POST /api/cabins/:cabinId/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res, next) => {
  req.body.cabin = req.params.cabinId;
  req.body.user = req.user.id;

  const cabin = await Cabin.findById(req.params.cabinId);

  if (!cabin) {
    return next(new AppError(`No cabin with the id of ${req.params.cabinId}`, 404));
  }

  // Calculate total price based on dates (mock logic for now)
  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);
  const diffTime = Math.abs(checkOut - checkIn);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  req.body.totalPrice = (cabin.price * diffDays) + 105; // 105 is mock cleaning + service fee

  const booking = await Booking.create(req.body);

  // Send confirmation email
  const dateStr = `${checkIn.toDateString()} to ${checkOut.toDateString()}`;
  sendEmail({
    email: req.user.email,
    subject: `Booking Confirmed: ${cabin.title}`,
    html: bookingConfirmationEmail(req.user.firstName, cabin.title, dateStr, req.body.totalPrice)
  });

  res.status(201).json({
    success: true,
    data: booking
  });
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError(`No booking with the id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError(`Not authorized to update this booking`, 401));
  }

  // If user is not admin, prevent them from updating status
  if (req.user.role !== 'admin' && req.body.status) {
    delete req.body.status;
    delete req.body.paymentStatus;
  }

  booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id).populate('cabin');

  if (!booking) {
    return next(new AppError(`No booking with the id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError(`Not authorized to delete this booking`, 401));
  }

  await booking.deleteOne();

  // Send cancellation email
  sendEmail({
    email: req.user.email,
    subject: `Booking Cancelled: ${booking.cabin.title}`,
    html: bookingCancellationEmail(req.user.firstName, booking.cabin.title)
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});
