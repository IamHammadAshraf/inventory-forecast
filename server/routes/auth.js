const express = require('express');
const {
  register,
  login,
  getMe,
  logout
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.get('/verify-token', protect, (req, res) => {
  res.status(200).json({
    success: true,
    valid: true,
    user: req.user
  });
});
module.exports = router;