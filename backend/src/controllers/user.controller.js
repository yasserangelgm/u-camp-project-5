const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

exports.signup = async (req, res) => {
  const { name, lastname, email, password, role } = req.body;

  //TODO checar por duplicados usando MONGO validation
  try {
    const newUser = new User({
      name,
      lastname,
      email,
      hashed_password: await User.encryptPassword(password),
      role: role ? role : 0,
    });
    /* 
    if (role) {
      newUser.role = role;
    } */

    const savedUser = await newUser.save();

    //Es necesario??????? crear jwt al crear usuario?????????
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
      expiresIn: '60s',
    }
  );

  try {
    const updateUser = await User.findByIdAndUpdate(
      userFound._id,
      { refresh_token: refreshToken },
      { new: true }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken, user: updateUser });
  } catch (err) {
    return res.status(409).json({ errror: 'No se pudo actualizar' });
  }
};
