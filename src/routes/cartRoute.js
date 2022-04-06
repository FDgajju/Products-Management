const express = require('express');
const router = express.Router();

const {
  addCart,
  updateCart,
  getCart,
  deleteCart,
} = require('../controllers/cartController');

const { verifyUser } = require('../middleware/verify');

// router.post("/:userId/cart", verifyUser, cartController.addCart);
// router.put("/:userId/cart", verifyUser, cartController.updateCart);
// router.get("/:userId/cart", verifyUser, cartController.getCart);
// router.delete("/:userId/cart", verifyUser, cartController.deleteCart);

router
  .route('/:userId/cart')
  .post(verifyUser, addCart)
  .put(verifyUser, updateCart)
  .get(verifyUser, getCart)
  .delete(verifyUser, deleteCart);

module.exports = router;
