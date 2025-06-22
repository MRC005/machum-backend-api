const express = require('express');
const router = express.Router();
const logoutController = require('../../handlers/logoutController');

router.route('/')
  .get(logoutController.handleLogout);

module.exports = router;
