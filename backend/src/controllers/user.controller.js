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
  console.log(req.body);
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
    expiresIn: '60s',
  });

  const refreshToken = jwt.sign(
    { id: foundUser._id, role: foundUser.role },
    process.env.REFRESH_SECRET,
    {
      expiresIn: '1h',
    }
  );
  foundUser.refresh_token = refreshToken;
  const result = await foundUser.save();

  const updatedUserInfo = {
    id: foundUser._id,
    name: foundUser.name,
    lastname: foundUser.lastname,
    email: foundUser.email,
    refreshToken: foundUser.refresh_token,
    role: foundUser.role,
  };

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
  });

  /* console.log(accessToken);
  console.log(userInfo);
  console.log(updatedUserInfo); */

  return res.status(200).json({ accessToken, user: updatedUserInfo });
};

exports.logout = async (req, res) => {
  //En el cliente borrar el accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No hay cookie

  const refresh_token = cookies.jwt;

  const foundUser = await User.findOne({ refresh_token }).exec();

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }

  foundUser.refresh_token = '';
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
  return res.status(204).json({ message: `${foundUser.name} cerro sesion` });
};

exports.updateUserById = async (req, res) => {
  console.log(req.params.userId, req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error en la base de datos' + error,
    });
  }
};
