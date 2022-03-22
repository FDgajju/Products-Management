const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const { createOrder , updateOrder } = require("../controllers/orderController");
//middleWare
const { verifyUser } = require("../middleware/verify");

// router.post('/write-file-aws', awsController.createProfilePicture)
//user
// router.post('/register', userController.registerUser)
// router.post('/login', userController.login)
// router.get('/user/:userId/profile', verifyUser, userController.getUser)
// router.put('/user/:userId/profile',verifyUser, userController.updateUserDetailes)

//product routes-------->
// router.post('/products',productController.releaseProduct )
// router.get('/products',productController.getProduct )
// router.get('/products/:productId',productController.getProductById )
// router.put('/products/:productId',productController.updateProduct )
// router.delete('/products/:productId',productController.deleteproductByID )

//cart routes---------->
// router.post('/users/:userId/cart',verifyUser, cartController.getCartDetails)
// router.put('/users/:userId/cart',verifyUser,  cartController.updateCart)
// router.get('/users/:userId/cart', verifyUser, cartController.getCart)
// router.delete('/users/:userId/cart',verifyUser, cartController.deleteCart)

//order Routes------------->
router
  .route("/:userId/orders")
  .post(verifyUser, createOrder)
  .put(verifyUser, updateOrder);

// router.post('/:userId/orders', verifyUser, orderController.createOrder)
// router.put('/:userId/orders', verifyUser, orderController.updateOrder)

module.exports = router;
