const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
require('dotenv').config();
const User = require('../models/user.model');

exports.signup = async (req, res) => {
  const { name, lastname, email, password, role } = req.body;
  console.log(req.body);
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
    console.log({ error: error });
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

  const accessToken = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
    expiresIn: '60s',
  });

  const refreshToken = jwt.sign(
    { id: userFound._id },
    process.env.REFRESH_SECRET,
    {
      expiresIn: '1d',
    }
  );
  //TODO: Guardar el refresh token en la base de datos
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ token, user: { name: userFound.name } });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Cierre de sesión exitoso' });
};
