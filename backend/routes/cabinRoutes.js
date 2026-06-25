const express = require('express');
const {
  getCabins,
  getCabin,
  createCabin,
  updateCabin,
  deleteCabin
} = require('../controllers/cabinController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Include other resource routers
const bookingRouter = require('./bookingRoutes');
const reviewRouter = require('./reviewRoutes');

// Re-route into other resource routers
router.use('/:cabinId/bookings', bookingRouter);
router.use('/:cabinId/reviews', reviewRouter);

router
  .route('/')
  .get(getCabins)
  .post(protect, authorize('admin'), createCabin);

router
  .route('/:id')
  .get(getCabin)
  .put(protect, authorize('admin'), updateCabin)
  .delete(protect, authorize('admin'), deleteCabin);

module.exports = router;
