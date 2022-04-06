const express = require('express');
const router = express.Router();

const {
  releaseProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProductByID,
} = require('../controllers/productController');

router.route('/:productId').post(releaseProduct).get(getProduct);
router
  .route('/:productId')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProductByID);

module.exports = router;
