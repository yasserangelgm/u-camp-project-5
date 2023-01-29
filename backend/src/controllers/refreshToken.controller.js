const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const User = require('../models/user.model');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const userFound = User.findOne(refreshToken);

  if (!userFound)
    return res.status(403).json({
      error: 'Acceso no autorizado',
    });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err || userFound._id !== decoded._id) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign({ id: decoded._id }, process.env.JWT_SECRET, {
      expiresIn: '30s', //TODO: Cambiar duracion en produccion
    });
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
