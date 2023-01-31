const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({ error: "No ha proporcionado un token" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token no válido" });
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user?.role !== 1)
    return res.status(403).json({ error: "Acceso no autorizado" });

  next();
};
