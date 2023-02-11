const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(req?.query?.limit)
      .sort({ createdAt: req?.query?.sort });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error en la base de datos' + error,
    });
  }
};
exports.deleteProductById = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json({ msg: 'El producto se eliminó con éxito' });
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error en la base de datos ' + error,
    });
  }
};
