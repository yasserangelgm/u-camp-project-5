const express = require('express');
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/category.controller');

router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:categoryId', updateCategoryById);
router.delete('/:categoryId', deleteCategoryById);

module.exports = router;
