const Review = require('../models/reviewsModel');
const Reviews = require('../models/reviewsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Reviews.find(filter);

  if (reviews.length === 0) return next(new AppError('No reviews found', 404));

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createNewReivew = catchAsync(async (req, res, next) => {
  // nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.auhtor) req.body.author = req.user.id;
  const newReviews = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newReviews,
  });
});

exports.deleteReview = factory.deleteOne(Reviews);
