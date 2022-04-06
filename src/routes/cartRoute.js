const express = require('express');
const router = express.Router();

const {
  addCart,
  updateCart,
  getCart,
  deleteCart,
} = require('../controllers/cartController');

const { verifyUser } = require('../middleware/verify');

router
  .route('/:userId/cart')
  .post(verifyUser, addCart)
  .put(verifyUser, updateCart)
  .get(verifyUser, getCart)
  .delete(verifyUser, deleteCart);

module.exports = router;
