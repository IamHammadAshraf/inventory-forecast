const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  sku: {
    type: String,
    required: [true, 'Please add a SKU'],
    unique: true,
    trim: true,
    maxlength: [20, 'SKU cannot exceed 20 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Electronics',
      'Clothing',
      'Food',
      'Furniture',
      'Books',
      'Other'
    ]
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity'],
    min: [0, 'Quantity cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Please add price'],
    min: [0, 'Price cannot be negative']
  },
  cost: {
    type: Number,
    required: [true, 'Please add cost'],
    min: [0, 'Cost cannot be negative']
  },
  threshold: {
    type: Number,
    required: [true, 'Please add threshold'],
    min: [0, 'Threshold cannot be negative'],
    default: 10
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    required: [true, 'Please add a supplier']
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: [true, 'Please add a store']
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Static method to get inventory status
inventorySchema.statics.getInventoryStatus = async function(storeId) {
  const obj = await this.aggregate([
    {
      $match: { store: storeId }
    },
    {
      $group: {
        _id: null,
        totalItems: { $sum: 1 },
        totalValue: { $sum: { $multiply: ['$price', '$quantity'] } },
        lowStock: {
          $sum: {
            $cond: [{ $lte: ['$quantity', '$threshold'] }, 1, 0]
          }
        }
      }
    }
  ]);

  try {
    await this.model('Store').findByIdAndUpdate(storeId, {
      inventoryStatus: obj[0] || {
        totalItems: 0,
        totalValue: 0,
        lowStock: 0
      }
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getInventoryStatus after save
inventorySchema.post('save', function() {
  this.constructor.getInventoryStatus(this.store);
});

// Call getInventoryStatus after remove
inventorySchema.post('remove', function() {
  this.constructor.getInventoryStatus(this.store);
});

module.exports = mongoose.model('Inventory', inventorySchema);