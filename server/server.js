require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Auth routes
const auth = require('./routes/auth');
app.use('/api/v1/auth', auth);

// Inventory routes - Add this after other routes
const inventory = require('./routes/inventory');
app.use('/api/v1/inventory', inventory);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handler middleware
const errorHandler = require('./middleware/error');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
