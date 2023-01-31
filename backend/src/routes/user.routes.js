const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers/user.controller');

const { verifyToken, isAdmin } = require('../middlewares/authJwt');

router.get('/users', verifyToken, isAdmin, getUsers);

module.exports = router;
