const express = require('express');
const {
  getInventory,
  getInventoryItem,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getLowStockItems
} = require('../controllers/inventoryController');

const Inventory = require('../models/Inventory');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    protect,
    advancedResults(Inventory, ['supplier', 'store']),
    getInventory
  )
  .post(protect, authorize('owner', 'manager'), addInventoryItem);

router
  .route('/:id')
  .get(protect, getInventoryItem)
  .put(protect, authorize('owner', 'manager'), updateInventoryItem)
  .delete(protect, authorize('owner', 'manager'), deleteInventoryItem);

router.route('/lowstock').get(protect, getLowStockItems);

module.exports = router;