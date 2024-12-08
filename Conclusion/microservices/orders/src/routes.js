const express = require('express');
const { publishOrder } = require('./publisher');
const router = express.Router();

router.post('/', async (req, res) => {
  const order = { id: Date.now(), ...req.body };
  await publishOrder(order);
  res.status(201).json({ message: 'Order created', order });
});

module.exports = router;
