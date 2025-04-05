const Inventory = require('../models/Inventory');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all inventory items
// @route   GET /api/v1/inventory
// @route   GET /api/v1/stores/:storeId/inventory
// @access  Private
exports.getInventory = asyncHandler(async (req, res, next) => {
  if (req.params.storeId) {
    const inventory = await Inventory.find({ store: req.params.storeId })
      .populate('supplier', 'name email phone')
      .populate('store', 'name address');

    return res.status(200).json({
      success: true,
      count: inventory.length,
      data: inventory
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single inventory item
// @route   GET /api/v1/inventory/:id
// @access  Private
exports.getInventoryItem = asyncHandler(async (req, res, next) => {
  const item = await Inventory.findById(req.params.id)
    .populate('supplier', 'name email phone')
    .populate('store', 'name address');

  if (!item) {
    return next(
      new ErrorResponse(`No inventory item with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: item
  });
});

// @desc    Add inventory item
// @route   POST /api/v1/stores/:storeId/inventory
// @access  Private (owner, manager)
exports.addInventoryItem = asyncHandler(async (req, res, next) => {
  req.body.store = req.params.storeId;
  req.body.user = req.user.id;

  const item = await Inventory.create(req.body);

  res.status(201).json({
    success: true,
    data: item
  });
});

// @desc    Update inventory item
// @route   PUT /api/v1/inventory/:id
// @access  Private (owner, manager)
exports.updateInventoryItem = asyncHandler(async (req, res, next) => {
  let item = await Inventory.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`No inventory item with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is inventory owner or admin
  if (item.user.toString() !== req.user.id && req.user.role !== 'owner') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this item`,
        401
      )
    );
  }

  item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: item
  });
});

// @desc    Delete inventory item
// @route   DELETE /api/v1/inventory/:id
// @access  Private (owner, manager)
exports.deleteInventoryItem = asyncHandler(async (req, res, next) => {
  const item = await Inventory.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`No inventory item with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is inventory owner or admin
  if (item.user.toString() !== req.user.id && req.user.role !== 'owner') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this item`,
        401
      )
    );
  }

  await item.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get low stock items
// @route   GET /api/v1/inventory/lowstock
// @access  Private
exports.getLowStockItems = asyncHandler(async (req, res, next) => {
  const items = await Inventory.find({
    quantity: { $lte: '$threshold' }
  }).populate('store', 'name address');

  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});