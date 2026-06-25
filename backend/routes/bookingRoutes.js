const express = require('express');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .put(protect, authorize('admin'), updateBooking)
  .delete(deleteBooking);

module.exports = router;
