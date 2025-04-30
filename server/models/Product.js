const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
  price: Number,
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
