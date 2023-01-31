const express = require('express');
const router = express.Router();

const { getUsers, signin, signup } = require('../controllers/user.controller');

const { verifyToken, isAdmin } = require('../middlewares/authJwt');

router.get('/users', verifyToken, isAdmin, getUsers);
router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;
