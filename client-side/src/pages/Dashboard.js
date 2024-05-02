import React, { useState, useEffect } from 'react';
import { FiUser, FiShoppingCart, FiDollarSign, FiPackage, FiUsers, FiBell, FiSettings, FiSearch, FiCalendar, FiPieChart, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { FiSun, FiMoon } from 'react-icons/fi';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const userRes = await axios.get("http://localhost:5000/api/v1/auth/me", { headers });
        setUser(userRes.data.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/v1/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/v1/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setNotifications([
      { id: 1, message: 'Your product is running low on stock', read: false, time: '2 hours ago' },
      { id: 2, message: 'New system update available', read: false, time: '5 hours ago' },
      { id: 3, message: 'Order #1234 has been shipped', read: true, time: '1 day ago' }
    ]);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading user info...</p>
      </div>
    );
  }

  const getStats = () => {
    if (user.role === 'customer') {
      return [
        { title: 'Orders Placed', value: 12, icon: <FiShoppingCart size={24} />, trend: 'up' },
        { title: 'Total Spending', value: 1259.87, icon: <FiDollarSign size={24} />, trend: 'up' },
        { title: 'Rewards Points', value: 1250, icon: <FiTrendingUp size={24} />, trend: 'up' }
      ];
    } else if (user.role === 'vendor') {
      return [
        { title: 'Total Sales', value: 24599.99, icon: <FiDollarSign size={24} />, trend: 'up' },
        { title: 'Pending Orders', value: 5, icon: <FiShoppingCart size={24} />, trend: 'down' },
        { title: 'Inventory Items', value: products.length, icon: <FiPackage size={24} />, trend: 'neutral' }
      ];
    } else {
      return [
        { title: 'Active Users', value: 24, icon: <FiUsers size={24} />, trend: 'up' },
        { title: 'New Sign-ups', value: 5, icon: <FiUser size={24} />, trend: 'up' },
        { title: 'Total Revenue', value: 48999.99, icon: <FiDollarSign size={24} />, trend: 'up' }
      ];
    }
  };

  const recentActivities = [
    { id: 1, type: 'order', message: 'New order #1234 placed', time: '2 hours ago' },
    { id: 2, type: 'system', message: 'System update available', time: '5 hours ago' },
    { id: 3, type: 'inventory', message: 'Product "Wireless Headphones" low stock', time: '1 day ago' },
    { id: 4, type: 'message', message: 'New message from support team', time: '2 days ago' }
  ];

  const orders = [
    { id: 'ORD-1234', date: '2023-05-15', customer: 'Alice Smith', status: 'Pending', amount: 149.99 },
    { id: 'ORD-1233', date: '2023-05-14', customer: 'Bob Johnson', status: 'Completed', amount: 89.99 },
    { id: 'ORD-1232', date: '2023-05-13', customer: 'Charlie Brown', status: 'Shipped', amount: 199.99 },
    { id: 'ORD-1231', date: '2023-05-12', customer: 'Diana Prince', status: 'Completed', amount: 59.99 }
  ];

  const events = [
    { id: 1, title: 'Product Launch', date: '2023-06-01', type: 'event' },
    { id: 2, title: 'Inventory Audit', date: '2023-06-15', type: 'task' },
    { id: 3, title: 'Quarterly Meeting', date: '2023-06-20', type: 'meeting' }
  ];

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 18000, 22000, 24000],
        backgroundColor: '#123458',
        borderColor: '#123458',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  const inventoryData = {
    labels: products.map(p => p.name),
    datasets: [
      {
        label: 'Stock Level',
        data: products.map(p => p.stock),
        backgroundColor: '#D4C9BE',
        borderColor: '#123458',
        borderWidth: 1
      }
    ]
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-softCream'}`}>
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 w-64 p-4 ${darkMode ? 'dark:bg-almostBlack' : 'bg-deepNavy'} text-white`}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">SmartStock</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white">
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </div>
  
          {/* User Profile */}
          <div className="flex items-center mb-8">
            <img src={user.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IYhSn8Y9S9_HF3tVaYOepJBcrYcd809pBA&s'} alt="Profile" className="w-12 h-12 rounded-full mr-3" />
            <div>
              <h2 className="font-medium">{user.name}</h2>
              <p className="text-sm opacity-75 capitalize">{user.role}</p>
            </div>
          </div>
  
          {/* Navigation */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'overview' ? 'bg-lightTan text-deepNavy' : 'hover:bg-opacity-20 hover:bg-white'}`}
            >
              <FiPieChart className="mr-3" />
              Overview
            </button>
  
            {user.role !== 'customer' && (
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'orders' ? 'bg-lightTan text-deepNavy' : 'hover:bg-opacity-20 hover:bg-white'}`}
              >
                <FiShoppingCart className="mr-3" />
                Orders
              </button>
            )}
  
            {user.role !== 'customer' && (
              <button
                onClick={() => setActiveTab('inventory')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'inventory' ? 'bg-lightTan text-deepNavy' : 'hover:bg-opacity-20 hover:bg-white'}`}
              >
                <FiPackage className="mr-3" />
                Inventory
              </button>
            )}
  
            {user.role === 'admin' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'users' ? 'bg-lightTan text-deepNavy' : 'hover:bg-opacity-20 hover:bg-white'}`}
              >
                <FiUsers className="mr-3" />
                Users
              </button>
            )}
  
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'calendar' ? 'bg-lightTan text-deepNavy' : 'hover:bg-opacity-20 hover:bg-white'}`}
            >
              <FiCalendar className="mr-3" />
              Calendar
            </button>
  
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'settings' ? 'bg-lightTan text-deepNavy' : 'hover:bg-opacity-20 hover:bg-white'}`}
            >
              <FiSettings className="mr-3" />
              Settings
            </button>
          </nav>
        </div>
  
        {/* Main Content */}
        <div className="ml-64 p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-deepNavy dark:text-white">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'inventory' && 'Inventory Management'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'calendar' && 'Calendar'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
  
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-deepNavy focus:border-transparent"
                />
              </div>
  
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative"
                >
                  <FiBell size={20} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
  
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-gray-100 dark:border-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-gray-700' : ''}`}
                        >
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View All
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
  
          {/* Dashboard Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getStats().map((stat, index) => (
                  <div 
                    key={index} 
                    className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                        <h3 className="text-2xl font-bold mt-1 text-deepNavy dark:text-white">
                          {typeof stat.value === 'number' && stat.value.toLocaleString('en-US', {
                            style: stat.title.includes('Revenue') || stat.title.includes('Sales') || stat.title.includes('Spending') ? 'currency' : undefined,
                            currency: 'USD'
                          })}
                        </h3>
                      </div>
                      <div className={`p-3 rounded-full ${darkMode ? 'dark:bg-gray-700' : 'bg-lightTan'}`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                        {stat.trend === 'up' ? '↑ 12%' : stat.trend === 'down' ? '↓ 5%' : '→ 0%'} from last month
                      </span>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
                  <h3 className="font-medium mb-4 text-deepNavy dark:text-white">Revenue Overview</h3>
                  <div className="h-64">
                    <Line 
                      data={revenueData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
  
                {user.role !== 'customer' && (
                  <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
                    <h3 className="font-medium mb-4 text-deepNavy dark:text-white">Inventory Levels</h3>
                    <div className="h-64">
                      <Bar 
                        data={inventoryData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
  
              {/* Recent Activity */}
              <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
                <h3 className="font-medium mb-4 text-deepNavy dark:text-white">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${darkMode ? 'dark:bg-gray-700' : 'bg-lightTan'}`}>
                        {activity.type === 'order' && <FiShoppingCart size={16} />}
                        {activity.type === 'system' && <FiAlertCircle size={16} />}
                        {activity.type === 'inventory' && <FiPackage size={16} />}
                        {activity.type === 'message' && <FiUser size={16} />}
                      </div>
                      <div>
                        <p className="text-deepNavy dark:text-white">{activity.message}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
  
          {activeTab === 'orders' && (
            <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
              <h3 className="font-medium mb-4 text-deepNavy dark:text-white">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Order ID</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Date</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Customer</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Amount</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className={`border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-3 px-4 text-deepNavy dark:text-white">{order.id}</td>
                        <td className="py-3 px-4 text-deepNavy dark:text-white">{order.date}</td>
                        <td className="py-3 px-4 text-deepNavy dark:text-white">{order.customer}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-deepNavy dark:text-white">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 dark:text-blue-400 hover:underline mr-2">
                            View
                          </button>
                          <button className="text-deepNavy dark:text-white hover:underline">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
  
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-deepNavy dark:text-white">Product Inventory</h3>
                  <button className="px-4 py-2 bg-deepNavy text-white rounded-lg hover:bg-opacity-90">
                    Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
                        <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Product</th>
                        <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Category</th>
                        <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Stock</th>
                        <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Price</th>
                        <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className={`border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
                          <td className="py-3 px-4 text-deepNavy dark:text-white">{product.name}</td>
                          <td className="py-3 px-4 text-deepNavy dark:text-white">{product.category}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.stock < 10 ? 'bg-red-100 text-red-800' :
                              product.stock < 20 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {product.stock} in stock
                            </span>
                          </td>
                          <td className="py-3 px-4 text-deepNavy dark:text-white">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-blue-600 dark:text-blue-400 hover:underline mr-2">
                              Edit
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:underline">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
  
              <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
                <h3 className="font-medium mb-4 text-deepNavy dark:text-white">Low Stock Alerts</h3>
                <div className="space-y-3">
                  {products.filter(p => p.stock < 10).map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-deepNavy dark:text-white">{product.name}</p>
                        <p className="text-sm text-red-600 dark:text-red-400">Only {product.stock} left in stock</p>
                      </div>
                      <button className="px-3 py-1 bg-deepNavy text-white rounded-lg text-sm hover:bg-opacity-90">
                        Reorder
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
  
          {activeTab === 'users' && (
            <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-deepNavy dark:text-white">User Management</h3>
                <button className="px-4 py-2 bg-deepNavy text-white rounded-lg hover:bg-opacity-90">
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Name</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Email</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Role</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 text-deepNavy dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className={`border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-3 px-4 text-deepNavy dark:text-white">{user.name}</td>
                        <td className="py-3 px-4 text-deepNavy dark:text-white">{user.email}</td>
                        <td className="py-3 px-4 text-deepNavy dark:text-white capitalize">{user.role}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 dark:text-blue-400 hover:underline mr-2">
                            Edit
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
  
          {activeTab === 'calendar' && (
            <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
              <h3 className="font-medium mb-4 text-deepNavy dark:text-white">Upcoming Events</h3>
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className={`p-4 rounded-lg border ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-start">
                      <div className={`p-2 rounded mr-3 ${darkMode ? 'dark:bg-gray-700' : 'bg-lightTan'}`}>
                        <FiCalendar className="text-deepNavy dark:text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-deepNavy dark:text-white">{event.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
  
          {activeTab === 'settings' && (
            <div className={`p-6 rounded-xl shadow ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
              <h3 className="font-medium mb-6 text-deepNavy dark:text-white">Account Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4 text-deepNavy dark:text-white">Profile Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-deepNavy dark:text-white">Name</label>
                      <input 
                        type="text" 
                        defaultValue={user.name}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-deepNavy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-deepNavy dark:text-white">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user.email}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-deepNavy focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
  
                <div>
                  <h4 className="text-lg font-medium mb-4 text-deepNavy dark:text-white">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="email-notifications" defaultChecked className="mr-2" />
                      <label htmlFor="email-notifications" className="text-deepNavy dark:text-white">Email Notifications</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="order-updates" defaultChecked className="mr-2" />
                      <label htmlFor="order-updates" className="text-deepNavy dark:text-white">Order Updates</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="inventory-alerts" defaultChecked className="mr-2" />
                      <label htmlFor="inventory-alerts" className="text-deepNavy dark:text-white">Inventory Alerts</label>
                    </div>
                  </div>
                </div>
  
                <div>
                  <h4 className="text-lg font-medium mb-4 text-deepNavy dark:text-white">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-deepNavy dark:text-white">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-deepNavy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-deepNavy dark:text-white">New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-deepNavy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-deepNavy dark:text-white">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-deepNavy focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
  
                <div className="pt-4">
                  <button className="px-6 py-2 bg-deepNavy text-white rounded-lg hover:bg-opacity-90">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default Dashboard;
