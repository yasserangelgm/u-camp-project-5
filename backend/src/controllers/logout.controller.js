const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const User = require('../models/user.model');
require('dotenv').config();

//TODO Borrar access token en el cliente

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refresh_token = cookies.jwt;

  const userFound = await User.findOne({ refresh_token });

  if (!userFound) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      userFound._id,
      { refresh_token: '' },
      { new: true }
    );
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(204).json({ message: `${updateUser.name} cerro sesion` });
  } catch (err) {
    return res.status(409).json({ errror: 'No se pudo cerrar sesion' });
  }
};

module.exports = handleLogout;
