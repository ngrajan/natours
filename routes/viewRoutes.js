const express = require('express');

const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.get('/login', viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);

// ! should check on isLoggedIn functionality
router.use(authController.isLoggedIn);
router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.post(
  '/update-user-data',
  authController.protect,
  viewController.updateUserData,
);

module.exports = router;
