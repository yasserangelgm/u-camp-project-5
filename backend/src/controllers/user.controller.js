const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.signup = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await User.create({
      name,
      lastname,
      email,
      hashed_password: hashedPassword,
    });
    const payload = { user: { id: user._id } };

    res.json({ payload });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
