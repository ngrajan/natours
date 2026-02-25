const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('./catchAsync');

exports.purchaseTour = catchAsync(async (req, res, next) => {
  const returnUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  // 1) create session
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [{ price: 1234, quantity: 1 }],
    mode: 'payment',
    // getting the current url
    return_url: returnUrl,
  });

  res.json({ clientSecret: session.client_secret });
});

exports.getSessionStatus = catchAsync(async (req, res) => {
  const session = await stripe.checkout.sessions.retrive(req.query.session_id);

  res.json({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});
