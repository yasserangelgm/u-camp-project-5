const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    quantity: {
      type: Number,
    },
    imgURL: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Product', productSchema);
