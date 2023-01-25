const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/auth.controller');
const { getUsers } = require('../controllers/user.controller');

router.get('/users', getUsers);
router.post('/signup', signup);

module.exports = router;
