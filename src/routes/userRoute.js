const express = require('express');
const router = express.Router();

const {
  registerUser,
  getUser,
  updateUserDetails,
  login,
} = require('../controllers/userController');

const { verifyUser } = require('../middleware/verify');

router.post('/register', registerUser);
router.post('/login', login);

router
  .route('/:userId/profile')
  .get(verifyUser, getUser)
  .put(verifyUser, updateUserDetails);

module.exports = router;
