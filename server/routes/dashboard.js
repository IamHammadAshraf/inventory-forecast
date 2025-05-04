const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Import controller functions (if using controllers)
const {
  getDashboardStats,
  getActivities,
  getRevenue,
  getNotifications,
  getEvents
} = require('../controllers/dashboardController');

// Route: /api/v1/dashboard/stats
router.get('/stats', protect, getDashboardStats);

// Route: /api/v1/dashboard/activities
router.get('/activities', protect, getActivities);

// Route: /api/v1/dashboard/revenue
router.get('/revenue', protect, getRevenue);

// Route: /api/v1/notifications
router.get('/notifications', protect, getNotifications);

// Route: /api/v1/events
router.get('/events', protect, getEvents);

module.exports = router;
