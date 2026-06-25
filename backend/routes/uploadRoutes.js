const express = require('express');
const { uploadImage, uploadMultipleImages, deleteImage } = require('../controllers/uploadController');
const upload = require('../middlewares/upload');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect); // All upload routes require authentication

router.post('/', upload.single('image'), uploadImage);
router.post('/multiple', upload.array('images', 10), uploadMultipleImages);
router.delete('/', deleteImage);

module.exports = router;
