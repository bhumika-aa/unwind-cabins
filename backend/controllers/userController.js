const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const AppError = require('../utils/AppError');
const { deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().sort('-createdAt');
  res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, data: user });
});

// @desc    Create user (admin creates user manually)
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));

  // Protect against demoting primary admin if logic needed
  if (req.body.role === 'user' && user.email === 'admin@unwindcabins.com') {
    return next(new AppError('Cannot demote the primary admin', 403));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: user });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));

  if (user.email === 'admin@unwindcabins.com') {
    return next(new AppError('Cannot delete the primary admin', 403));
  }

  if (user.avatar && user.avatar.public_id) {
    await deleteFromCloudinary(user.avatar.public_id);
  }

  await user.deleteOne();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Add cabin to wishlist
// @route   POST /api/users/wishlist/:cabinId
// @access  Private
exports.addToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.wishlist.includes(req.params.cabinId)) {
    user.wishlist.push(req.params.cabinId);
    await user.save();
  }
  res.status(200).json({ success: true, data: user.wishlist });
});

// @desc    Remove cabin from wishlist
// @route   DELETE /api/users/wishlist/:cabinId
// @access  Private
exports.removeFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== req.params.cabinId
  );
  await user.save();
  res.status(200).json({ success: true, data: user.wishlist });
});
