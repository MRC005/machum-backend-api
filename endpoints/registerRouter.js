const express = require('express');
const router = express.Router();
const registerController = require('../../handlers/registerController');

router.route('/')
  .post(registerController.handleNewUser);

module.exports = router;
