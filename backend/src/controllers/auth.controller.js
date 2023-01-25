const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
require('dotenv').config();
const User = require('../models/user.model');

exports.signin = (req, res) => {
  //find user
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'El usuario o email no existen',
      });
    }
    //If user is found, authenticate
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user.hashed_password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ error: 'El usuario y la contraseña no coinciden' });
    }

    //genetate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('t', token, { expire: new Date() + 3600000 });
    const { _id, name, email, role } = user;
    return res.json({ token: token, user: { _id, name, email, role } });
  });
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
