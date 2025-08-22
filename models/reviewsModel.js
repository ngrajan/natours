// required fields ==> rating, createdAt, ref to Tour and User

const mongoose = require('mongoose');
const Tour = require('./tourModel');

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
    user: {
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

// Query Middleware (instance method)
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

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
// static method
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  // saving ratings average and rating count to tours
  await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: stats[0].nRating || 1,
    ratingsAverage: stats[0].avgRating || 4.5,
  });
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.current = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.current.constructor.calcAverageRatings(this.current.tour);
});

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;
