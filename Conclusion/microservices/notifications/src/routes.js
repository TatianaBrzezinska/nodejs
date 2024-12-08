const express = require('express');
const { getNotifications } = require('./consumer');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(getNotifications());
});

module.exports = router;
