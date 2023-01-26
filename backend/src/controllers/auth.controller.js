const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
require('dotenv').config();
const User = require('../models/user.model');

exports.signup = async (req, res) => {
  const { name, lastname, email, password, role } = req.body;
  try {
    const newUser = new User({
      name,
      lastname,
      email,
      hashed_password: await User.encryptPassword(password),
    });

    if (role) {
      newUser.role = role;
    }

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 2400,
    });
    const payload = { token, user: { id: savedUser._id } };
    res.status(200).json({ payload });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (!userFound)
    return res.status(400).json({
      error: 'El usuario o email no existen',
    });

  const matchPassword = User.comparePasswords(
    userFound.hashed_password,
    password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ error: 'El usuario y la contraseña no coinciden' });

  const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
    expiresIn: 2400,
  });
  res.status(200).json({ token });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Cierre de sesión exitoso' });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'], // added later
  userProperty: 'auth',
});

exports.isAuthenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  const openToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(token, openToken);

  /* let user = req.auth; */ /* && req.profile._id == req.auth._id; */
  /*  if (!user) {
    return res.status(403).json({
      error: 'Acceso denegado',
    });
  } */

  req.auth = openToken;

  next();
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id).select('-hashed_password');
    if (user.role === 0) {
      return res.status(403).json({
        error: 'Acceso denegado: (resource admin)',
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error',
      error,
    });
  }
  next();
};
