/* eslint-disable */
const { default: axios } = require('axios');

const stripe = Stripe(
  'pk_test_51T2PeY5HXcOptToiYuP7HlJdh0CMBAE0e3bFpPPNx4LPAloS1Hdp0KNSq0w3rtDBp7YhM16qr58Sqivg17zUs05s00Zl03du00',
);

initialize();

async function initialize() {
  const fetchClientSecret = async () => {
    const response = await axios({
      method: 'POST',
      url: '/create-checkout-session',
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({ fetchClientSecret });

  checkout.mount('#checkout');
}
