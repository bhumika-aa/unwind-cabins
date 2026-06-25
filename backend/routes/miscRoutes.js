const express = require('express');
const { submitContactForm, subscribeNewsletter, getMessages, deleteMessage, getSubscribers, deleteSubscriber } = require('../controllers/miscController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/contact')
  .post(submitContactForm)
  .get(protect, authorize('admin'), getMessages);

router.route('/contact/:id')
  .delete(protect, authorize('admin'), deleteMessage);

router.route('/newsletter')
  .post(subscribeNewsletter)
  .get(protect, authorize('admin'), getSubscribers);

router.route('/newsletter/:id')
  .delete(protect, authorize('admin'), deleteSubscriber);

module.exports = router;
