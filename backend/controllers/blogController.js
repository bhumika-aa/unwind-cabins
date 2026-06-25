const Blog = require('../models/Blog');
const asyncHandler = require('../middlewares/async');
const AppError = require('../utils/AppError');
const { deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find().sort('-createdAt');
  res.status(200).json({ success: true, count: blogs.length, data: blogs });
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return next(new AppError('Blog not found', 404));
  res.status(200).json({ success: true, data: blog });
});

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, data: blog });
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = asyncHandler(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);
  if (!blog) return next(new AppError('Blog not found', 404));

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: blog });
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return next(new AppError('Blog not found', 404));

  if (blog.image && blog.image.public_id) {
    await deleteFromCloudinary(blog.image.public_id);
  }

  await blog.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
