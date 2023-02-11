const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

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
    });

    if (role) newUser.role = role;

    const savedUser = await newUser.save();

    //Es necesario??????? crear jwt al crear usuario?????????
    const token = jwt.sign({ id: savedUser._id }, process.env.ACCESS_SECRET, {
      expiresIn: '1200s',
    });

    const payload = { token, user: { id: savedUser._id } };
    return res.status(201).json({ payload });
  } catch (err) {
    console.log({ error: err });
    return res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser)
    return res.status(401).json({
      error: 'El usuario o email no existen',
    });

  const matchPassword = await bcryptjs.compare(
    password,
    foundUser.hashed_password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ error: 'El usuario y la contraseña no coinciden' });

  const userInfo = {
    id: foundUser._id,
    role: foundUser.role,
  };

  const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_SECRET, {
    expiresIn: '30m',
  });

  await foundUser.save();

  const responseUserInfo = {
    id: foundUser._id,
    name: foundUser.name,
    lastname: foundUser.lastname,
    email: foundUser.email,
    role: foundUser.role,
  };

  return res.status(200).json({ accessToken, user: responseUserInfo });
};

exports.updateUserById = async (req, res) => {
  console.log(req.userId, req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    const accessToken = req.accessToken;
    responseUser = {
      id: updatedUser._id,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      role: updatedUser.role,
    };

    res.status(200).json({ accessToken, user: responseUser });
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error en la base de datos' + error,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const foundUser = await User.findById(req.userId);
    const accessToken = req.accessToken;
    console.log('ACCESS TOKEN', accessToken);
    responseUser = {
      id: foundUser._id,
      name: foundUser.name,
      lastname: foundUser.lastname,
      email: foundUser.email,
      role: foundUser.role,
    };

    res.status(200).json({ accessToken, user: responseUser });
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error en la base de datos' + error,
    });
  }
};
