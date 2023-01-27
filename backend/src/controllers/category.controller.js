const Category = require('../models/category.model');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateCategoryById = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error en la base de datos' + error,
    });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json({ msg: 'La categoría se eliminó con éxito' });
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error en la base de datos ' + error,
    });
  }
};
