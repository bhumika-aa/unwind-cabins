const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, authorize('admin'), createBlog);

router.route('/:id')
  .get(getBlog)
  .put(protect, authorize('admin'), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

module.exports = router;
