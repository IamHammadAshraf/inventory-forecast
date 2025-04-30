require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany();
  await Order.deleteMany();
  await Product.deleteMany();

  const owner = await User.create({
    name: 'Owner User',
    email: 'owner@example.com',
    password: '123456',
    role: 'owner',
    status: 'Active'
  });
  
  const manager = await User.create({
    name: 'Manager User',
    email: 'manager@example.com',
    password: '123456',
    role: 'manager',
    status: 'Active'
  });
  
  const employee = await User.create({
    name: 'Employee User',
    email: 'employee@example.com',
    password: '123456',
    role: 'employee',
    status: 'Active'
  });  

  const products = await Product.insertMany([
    { name: 'Wireless Headphones', category: 'Electronics', stock: 12, price: 99.99, vendor: manager._id },
    { name: 'Smart Watch', category: 'Electronics', stock: 8, price: 199.99, vendor: manager._id },
    { name: 'USB-C Cable', category: 'Accessories', stock: 42, price: 12.99, vendor: manager._id }
  ]);
  
  await Order.insertMany([
    { orderId: 'ORD-1001', customer: employee._id, vendor: manager._id, amount: 99.99, date: '2023-12-01', status: 'Completed' },
    { orderId: 'ORD-1002', customer: employee._id, vendor: manager._id, amount: 199.99, date: '2023-12-05', status: 'Pending' }
  ]);
  

  console.log('✅ Seed complete');
  process.exit();
};

seed();
