const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No ha proporcionado un token' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token no válido' });
    req.userId = decoded.userInfo.id;
    req.role = decoded.userInfo.role;
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  const role = req.role;
  if (role !== 1)
    return res.status(403).json({ error: 'Acceso no autorizado' });

  next();
};
