const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const userFound = await User.findOne({ refresh_token: refreshToken });

  if (!userFound)
    return res.status(403).json({
      error: 'Acceso no autorizado',
    });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err !== null || userFound._id != decoded.id) {
      return res.status(403).json({ error: 'Token no válido' });
    }
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: '30s', //TODO: Cambiar duracion en produccion
    });

    return res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
