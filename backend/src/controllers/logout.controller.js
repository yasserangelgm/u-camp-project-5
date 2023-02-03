const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const User = require('../models/user.model');
require('dotenv').config();

//TODO Borrar access token en el cliente

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refresh_token = cookies.jwt;

  const foundUser = await User.findOne({ refresh_token: refresh_token }).exec();

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

module.exports = handleLogout;
