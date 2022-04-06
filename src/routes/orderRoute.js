const express = require('express');
const router = express.Router();

const { createOrder, updateOrder } = require('../controllers/orderController');
//middleWare
const { verifyUser } = require('../middleware/verify');

//order Routes------------->
router
  .route('/:userId/orders')
  .post(verifyUser, createOrder)
  .put(verifyUser, updateOrder);

module.exports = router;
