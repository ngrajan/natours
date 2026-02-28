const showAlert = require('./alert');

/* eslint-disable */
const axios = require('axios').default;

const stripe = Stripe(
  'pk_test_51T2PeY5HXcOptToiYuP7HlJdh0CMBAE0e3bFpPPNx4LPAloS1Hdp0KNSq0w3rtDBp7YhM16qr58Sqivg17zUs05s00Zl03du00',
);

const bookTour = async (tourId) => {
  try {
    // get a checkout session
    const session = await axios(
      `http://localhost:8000/api/v1/bookings/checkout-session/${tourId}`,
    );
    window.location.href = session.data.session.url;
  } catch (error) {
    console.log(error);
    showAlert('error', error.response);
  }
};

module.exports = { bookTour };
