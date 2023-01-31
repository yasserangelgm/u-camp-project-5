const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No ha proporcionado un token' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token no válido' });
    console.log(decoded);
    req.userId = decoded.user.id;
    req.role = decoded.user.role;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const role = req.role;
  if (role !== 1)
    return res.status(403).json({ error: 'Acceso no autorizado' });

  next();
};
