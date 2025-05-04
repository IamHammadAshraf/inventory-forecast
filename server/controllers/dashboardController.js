const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// GET /api/v1/dashboard/stats
exports.getDashboardStats = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user._id;

    let stats = [];

    if (role === 'admin') {
      const totalUsers = await User.countDocuments();
      const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);

      stats = [
        { title: 'Active Users', value: totalUsers, icon: 'users', trend: 'up', change: 12 },
        { title: 'New Sign-ups', value: 5, icon: 'user', trend: 'up', change: 10 },
        { title: 'Total Revenue', value: totalRevenue[0]?.total || 0, icon: 'dollar', trend: 'up', change: 15 }
      ];
    }

    if (role === 'vendor') {
      const sales = await Order.aggregate([
        { $match: { vendor: userId } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      const pending = await Order.countDocuments({ vendor: userId, status: 'Pending' });
      const inventory = await Product.countDocuments({ vendor: userId });

      stats = [
        { title: 'Total Sales', value: sales[0]?.total || 0, icon: 'dollar', trend: 'up', change: 10 },
        { title: 'Pending Orders', value: pending, icon: 'cart', trend: 'down', change: 5 },
        { title: 'Inventory Items', value: inventory, icon: 'package', trend: 'neutral', change: 0 }
      ];
    }

    if (role === 'customer') {
      const myOrders = await Order.find({ customer: userId });
      const spending = myOrders.reduce((sum, order) => sum + order.amount, 0);

      stats = [
        { title: 'Orders Placed', value: myOrders.length, icon: 'cart', trend: 'up', change: 8 },
        { title: 'Total Spending', value: spending, icon: 'dollar', trend: 'up', change: 5 },
        { title: 'Rewards Points', value: 1250, icon: 'trending', trend: 'up', change: 2 }
      ];
    }

    res.status(200).json({ success: true, data: stats });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to load dashboard stats' });
  }
};

// GET /api/v1/dashboard/activities
exports.getActivities = (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: 1, type: 'order', message: 'Order #1234 placed', time: '2 hours ago' },
      { id: 2, type: 'system', message: 'System update available', time: '5 hours ago' }
    ]
  });
};


// GET /api/v1/dashboard/revenue
exports.getRevenue = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      values: [12000, 15000, 18000, 20000]
    }
  });
};

// GET /api/v1/notifications
exports.getNotifications = (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: 1, message: 'Low stock on Item A', read: false, time: '1 hour ago' },
      { id: 2, message: 'New order received', read: true, time: '3 hours ago' }
    ]
  });
};

// GET /api/v1/events
exports.getEvents = (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: 1, title: 'Inventory Audit', date: '2025-05-10' },
      { id: 2, title: 'Team Meeting', date: '2025-05-15' }
    ]
  });
};
