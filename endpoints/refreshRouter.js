const express = require('express');
const router = express.Router();
const refreshController = require('../handlers/refreshController');

router.route('/')
  .get(refreshController.handleRefreshToken);

module.exports = router;
