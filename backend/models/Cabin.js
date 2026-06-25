const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price per night']
  },
  discount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  maxGuests: {
    type: Number,
    required: [true, 'Please specify maximum number of guests']
  },
  bedrooms: {
    type: Number,
    required: true
  },
  beds: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  images: [{
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cabin', cabinSchema);
