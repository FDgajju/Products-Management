const express = require('express');
const router = express.Router();

const {
  releaseProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProductByID,
} = require('../controllers/productController');

// router.post("/", productController.releaseProduct);
// router.get("/", productController.getProduct);
// router.get("/:productId", productController.getProductById);
// router.put("/:productId", productController.updateProduct);
// router.delete("/:productId", productController.deleteProductByID);

router.route('/:productId').post(releaseProduct).get(getProduct);
router
  .route('/:productId')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProductByID);

module.exports = router;
