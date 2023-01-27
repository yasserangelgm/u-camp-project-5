const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).json({ error: 'No ha proporcionado un token' });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;
    const user = await User.findById(decodedToken.id, { hashed_password: 0 });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (error) {
    return res.status(401).json({ error: 'Token no válido' });
  }

  next();
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId, { hashed_password: 0 });
  if (!user.role)
    return res.status(403).json({ error: 'Acceso no autorizado' });

  next();
};
