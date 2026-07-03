const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser, addToWishlist, removeFromWishlist } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.route('/wishlist/:cabinId')
  .post(addToWishlist)
  .delete(removeFromWishlist);

router.use(authorize('admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
