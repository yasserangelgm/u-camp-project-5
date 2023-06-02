const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");

const { verifyToken, isAdmin } = require("../middlewares/authJWT");

router.get("/", getCategories);
router.post("/", [verifyToken, isAdmin], createCategory);
router.put("/:categoryId", [verifyToken, isAdmin], updateCategoryById);
router.delete("/:categoryId", [verifyToken, isAdmin], deleteCategoryById);

module.exports = router;
