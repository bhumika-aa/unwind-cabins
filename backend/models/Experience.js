const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Experience', experienceSchema);
