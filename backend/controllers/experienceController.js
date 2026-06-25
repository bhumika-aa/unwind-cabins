const Experience = require('../models/Experience');
const asyncHandler = require('../middlewares/async');
const AppError = require('../utils/AppError');
const { deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
exports.getExperiences = asyncHandler(async (req, res, next) => {
  const experiences = await Experience.find().sort('-createdAt');
  res.status(200).json({ success: true, count: experiences.length, data: experiences });
});

// @desc    Get single experience
// @route   GET /api/experiences/:id
// @access  Public
exports.getExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) return next(new AppError('Experience not found', 404));
  res.status(200).json({ success: true, data: experience });
});

// @desc    Create experience
// @route   POST /api/experiences
// @access  Private/Admin
exports.createExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ success: true, data: experience });
});

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private/Admin
exports.updateExperience = asyncHandler(async (req, res, next) => {
  let experience = await Experience.findById(req.params.id);
  if (!experience) return next(new AppError('Experience not found', 404));

  experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: experience });
});

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private/Admin
exports.deleteExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) return next(new AppError('Experience not found', 404));

  if (experience.image && experience.image.public_id) {
    await deleteFromCloudinary(experience.image.public_id);
  }

  await experience.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
