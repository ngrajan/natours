const express = require('express');

const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
// ! should check on isLoggedIn functionality
router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
// login routes
router.get('/login', viewController.getLoginForm);

module.exports = router;
