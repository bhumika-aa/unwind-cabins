const Cabin = require('../models/Cabin');
const asyncHandler = require('../middlewares/async');
const AppError = require('../utils/AppError');
const { deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Get all cabins
// @route   GET /api/cabins
// @access  Public
exports.getCabins = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  let filterObj = JSON.parse(queryStr);

  // Text search on title or location
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    filterObj.$or = [{ title: searchRegex }, { location: searchRegex }];
  }

  query = Cabin.find(filterObj);

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Cabin.countDocuments(filterObj);

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const cabins = await query;

  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  res.status(200).json({
    success: true,
    count: cabins.length,
    pagination,
    data: cabins
  });
});

// @desc    Get single cabin
// @route   GET /api/cabins/:id
// @access  Public
exports.getCabin = asyncHandler(async (req, res, next) => {
  const cabin = await Cabin.findById(req.params.id);

  if (!cabin) {
    return next(new AppError(`Cabin not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: cabin
  });
});

// @desc    Create new cabin
// @route   POST /api/cabins
// @access  Private/Admin
exports.createCabin = asyncHandler(async (req, res, next) => {
  const cabin = await Cabin.create(req.body);

  res.status(201).json({
    success: true,
    data: cabin
  });
});

// @desc    Update cabin
// @route   PUT /api/cabins/:id
// @access  Private/Admin
exports.updateCabin = asyncHandler(async (req, res, next) => {
  let cabin = await Cabin.findById(req.params.id);

  if (!cabin) {
    return next(new AppError(`Cabin not found with id of ${req.params.id}`, 404));
  }

  cabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: cabin
  });
});

// @desc    Delete cabin
// @route   DELETE /api/cabins/:id
// @access  Private/Admin
exports.deleteCabin = asyncHandler(async (req, res, next) => {
  const cabin = await Cabin.findById(req.params.id);

  if (!cabin) {
    return next(new AppError(`Cabin not found with id of ${req.params.id}`, 404));
  }

  // Delete images from Cloudinary
  if (cabin.images && cabin.images.length > 0) {
    for (const image of cabin.images) {
      if (image.public_id) {
        await deleteFromCloudinary(image.public_id);
      }
    }
  }

  await cabin.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
