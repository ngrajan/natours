// required fields ==> rating, createdAt, ref to Tour and User

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Reveiws can't be empty"],
    },
    rating: {
      type: Number,
      default: 4.6,
      min: [1, 'rating should be minimum of 1'],
      max: [5, 'ratings should be maximum of 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Query Middleware
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'author',
  //   select: 'name',
  // });

  this.populate({
    path: 'author',
    select: 'name',
  });
  next();
});

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;
