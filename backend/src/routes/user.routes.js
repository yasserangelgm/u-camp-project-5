const express = require('express');
const router = express.Router();

const {
  getUsers,
  signin,
  signup,
  updateUserById,
  getUserById,
} = require('../controllers/user.controller');

const { verifyToken, isAdmin } = require('../middlewares/authJWT');

router.get('/users', verifyToken, isAdmin, getUsers);
router.get('/user/', verifyToken, getUserById);
router.post('/signin', signin);
router.post('/signup', signup);
router.put('/users/:userId', verifyToken, updateUserById);

module.exports = router;
