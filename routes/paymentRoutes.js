const express = require('express');
const payments = require('../utils/payments');

const router = express.Router();

router.post('/create-checkout-session', payments.purchaseTour);
router.get('/session-status', payments.getSessionStatus);

module.exports = router;
