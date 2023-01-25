const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/user.controller");
const {
  requireSignIn,
  isAuthenticate,
  isAdmin,
} = require("../controllers/auth.controller");

router.get("/users", /* isAuthenticate, isAdmin, */ getUsers);

module.exports = router;
