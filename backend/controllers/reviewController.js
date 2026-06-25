const Review = require('../models/Review');
const asyncHandler = require('../middlewares/async');
const AppError = require('../utils/AppError');
const { deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find().populate('user', 'firstName lastName avatar').populate('cabin', 'title').sort('-createdAt');
  res.status(200).json({ success: true, count: reviews.length, data: reviews });
});

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate('user', 'firstName lastName avatar').populate('cabin', 'title');
  if (!review) return next(new AppError('Review not found', 404));
  res.status(200).json({ success: true, data: review });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) return next(new AppError('Review not found', 404));

  // Make sure user is owner or admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this review', 401));
  }

  // delete image if present
  if (review.image && review.image.public_id) {
    await deleteFromCloudinary(review.image.public_id);
  }

  await review.deleteOne();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
  const cabinId = req.body.cabin || req.params.cabinId;
  if (!cabinId) {
    return next(new AppError('Please provide a cabin ID', 400));
  }

  req.body.cabin = cabinId;
  req.body.user = req.user.id;

  const existingReview = await Review.findOne({ cabin: cabinId, user: req.user.id });
  if (existingReview) {
    return next(new AppError('You have already reviewed this cabin', 400));
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to update this review', 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  await Review.getAverageRating(review.cabin);

  res.status(200).json({
    success: true,
    data: review
  });
});
