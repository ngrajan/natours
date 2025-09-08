const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) get the tours
  const tours = await Tour.find();
  // 2) build template for the tour

  // 3) render the template with the tour data from step 1.
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});
