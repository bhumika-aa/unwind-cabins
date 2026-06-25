const asyncHandler = require('../middlewares/async');
const AppError = require('../utils/AppError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Upload single image
// @route   POST /api/upload
// @access  Private/Admin
exports.uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an image', 400));
  }

  const folder = req.body.folder || 'unwindcabins';
  const result = await uploadToCloudinary(req.file.buffer, folder);

  res.status(200).json({
    success: true,
    data: result
  });
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private/Admin
exports.uploadMultipleImages = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new AppError('Please upload at least one image', 400));
  }

  const folder = req.body.folder || 'unwindcabins';
  const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer, folder));
  const results = await Promise.all(uploadPromises);

  res.status(200).json({
    success: true,
    data: results
  });
});

// @desc    Delete image
// @route   DELETE /api/upload
// @access  Private/Admin
exports.deleteImage = asyncHandler(async (req, res, next) => {
  const { public_id } = req.body;
  
  if (!public_id) {
    return next(new AppError('Please provide a public_id', 400));
  }

  await deleteFromCloudinary(public_id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
