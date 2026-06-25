const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  comment: {
    type: String,
    required: [true, 'Please add a review comment']
  },
  cabin: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cabin',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function(cabinId) {
  const obj = await this.aggregate([
    {
      $match: { cabin: cabinId }
    },
    {
      $group: {
        _id: '$cabin',
        averageRating: { $avg: '$rating' },
        numberOfReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    if (obj.length > 0) {
      await this.model('Cabin').findByIdAndUpdate(cabinId, {
        rating: Math.round(obj[0].averageRating * 10) / 10,
        reviews: obj[0].numberOfReviews
      });
    } else {
      await this.model('Cabin').findByIdAndUpdate(cabinId, {
        rating: 0,
        reviews: 0
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', async function() {
  await this.constructor.getAverageRating(this.cabin);
});

// Call getAverageRating after deleteOne
reviewSchema.post('deleteOne', { document: true, query: false }, async function() {
  await this.constructor.getAverageRating(this.cabin);
});

module.exports = mongoose.model('Review', reviewSchema);
