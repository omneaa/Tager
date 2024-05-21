const mongoose = require('mongoose') ;
const reviewSchema=mongoose.Schema({
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products',
      },
      userId: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      reviewText: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      }
})
var reviewModel = mongoose.model('reviews', reviewSchema)
module.exports = reviewModel;