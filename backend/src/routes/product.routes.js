const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require('../controllers/product.controller');

const { verifyToken, isAdmin } = require('../middlewares/authJwt');

router.get('/', getProducts);
router.post('/', [verifyToken, isAdmin], createProduct);
router.get('/:productId', getProductById);
router.put('/:productId', [verifyToken, isAdmin], updateProductById);
router.delete('/:productId', [verifyToken, isAdmin], deleteProductById);

module.exports = router;
