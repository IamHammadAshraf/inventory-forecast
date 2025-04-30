const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: String,
  date: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: { type: String, enum: ['Pending', 'Completed', 'Shipped'], default: 'Pending' },
  amount: Number
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
