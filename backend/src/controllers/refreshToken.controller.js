const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refresh_token: refreshToken }).exec();

  if (!foundUser)
    return res.status(403).json({
      error: 'Acceso no autorizado',
    });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err !== null || foundUser._id != decoded.id) {
      return res.status(403).json({ error: 'Token no válido' });
    }

    const userInfo = {
      id: foundUser._id,
      name: foundUser.name,
      lastname: foundUser.lastname,
      email: foundUser.email,
      refreshToken: foundUser.refresh_token,
      role: foundUser.role,
    };

    const accessToken = jwt.sign(
      { id: decoded.id, role: foundUser.role },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '60s', //TODO: Cambiar duracion en produccion
      }
    );

    return res.json({ accessToken, user: userInfo });
  });
};

module.exports = handleRefreshToken;
