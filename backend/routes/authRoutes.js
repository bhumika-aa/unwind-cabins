const express = require('express');
const { 
  register, 
  login, 
  logout, 
  getMe, 
  forgotPassword, 
  resetPassword,
  updateDetails,
  updatePassword
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/logout', logout); // Support POST /logout as well
router.get('/me', protect, getMe);
router.put('/profile', protect, updateDetails);
router.put('/password', protect, updatePassword);

// Support both path structures for forgot/reset password
router.post('/forgotpassword', forgotPassword);
router.post('/forgot-password', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
