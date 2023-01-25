const express = require('express');
const router = express.Router();

const { getUsers, signup } = require('../controllers/user.controller');
const {
  requireSignIn,
  isAuthenticate,
  isAdmin,
} = require('../controllers/auth.controller');

router.get('/users', isAuthenticate, isAdmin, getUsers);
router.post('/signup', signup);

module.exports = router;
