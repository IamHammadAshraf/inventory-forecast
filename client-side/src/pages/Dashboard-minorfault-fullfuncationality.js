import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiBell,
  FiSettings,
  FiSearch,
  FiCalendar,
  FiPieChart,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { FiSun, FiMoon } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:5000';

// Register ChartJS components
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dynamic data states
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [revenueData, setRevenueData] = useState(null);
  const [inventoryData, setInventoryData] = useState(null);
  const navigate = useNavigate();

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch user profile
        const userRes = await axios.get('http://localhost:5000/api/v1/auth/me', { headers });
        setUser(userRes.data.data);

        // Fetch dashboard stats based on role
        const statsRes = await axios.get("http://localhost:5000/api/v1/dashboard/stats", {
          headers,
        });
        setStats(statsRes.data.data);

        // Fetch recent activities
        const activitiesRes = await axios.get("http://localhost:5000/api/v1/dashboard/activities", {
          headers,
        });
        setRecentActivities(activitiesRes.data.data);

        // Fetch revenue data for chart
        const revenueRes = await axios.get("http://localhost:5000/api/v1/dashboard/revenue", {
          headers,
        });
        setRevenueData({
          labels: revenueRes.data.data.labels,
          datasets: [
            {
              label: "Revenue",
              data: revenueRes.data.data.values,
              backgroundColor: "#123458",
              borderColor: "#123458",
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        });

        // Only fetch role-specific data when needed
        if (userRes.data.data.role !== "customer") {
          const ordersRes = await axios.get("http://localhost:5000/api/v1/orders", { headers });
          setOrders(ordersRes.data.data);

          const productsRes = await axios.get("http://localhost:5000/api/v1/products", { headers });
          setProducts(productsRes.data.data);

          // Prepare inventory data for chart
          setInventoryData({
            labels: productsRes.data.data.map((p) => p.name),
            datasets: [
              {
                label: "Stock Level",
                data: productsRes.data.data.map((p) => p.stock),
                backgroundColor: "#D4C9BE",
                borderColor: "#123458",
                borderWidth: 1,
              },
            ],
          });
        }

        if (userRes.data.data.role === "admin") {
          const usersRes = await axios.get("http://localhost:5000/api/v1/users", { headers });
          setUsers(usersRes.data.data);
        }

        // Fetch calendar events
        const eventsRes = await axios.get("http://localhost:5000/api/v1/events", { headers });
        setEvents(eventsRes.data.data);

        // Fetch notifications
        const notificationsRes = await axios.get("http://localhost:5000/api/v1/notifications", {
          headers,
        });
        setNotifications(notificationsRes.data.data);

        setLoading(false);
      } catch (err) {
        navigate("/dashboard");
        setError(
          err.response?.data?.message || "Failed to fetch dashboard data"
        );
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [activeTab]); // Re-fetch when tab changes

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">User data not available</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-softCream"
      }`}
    >
      {/* Sidebar - Remains largely the same */}
      <div
        className={`fixed inset-y-0 left-0 w-64 p-4 ${
          darkMode ? "dark:bg-almostBlack" : "bg-deepNavy"
        } text-white`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">SmartStock</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center mb-8">
          <img
            src={user.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <h2 className="font-medium">{user.name}</h2>
            <p className="text-sm opacity-75 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Navigation - Remains the same */}
        {/* ... */}
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header - Remains the same */}
        {/* ... */}

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow ${
                    darkMode ? "dark:bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold mt-1 text-deepNavy dark:text-white">
                        {typeof stat.value === "number" &&
                          stat.value.toLocaleString("en-US", {
                            style:
                              stat.title.includes("Revenue") ||
                              stat.title.includes("Sales") ||
                              stat.title.includes("Spending")
                                ? "currency"
                                : undefined,
                            currency: "USD",
                          })}
                      </h3>
                    </div>
                    <div
                      className={`p-3 rounded-full ${
                        darkMode ? "dark:bg-gray-700" : "bg-lightTan"
                      }`}
                    >
                      {stat.icon === "user" && <FiUser size={24} />}
                      {stat.icon === "cart" && <FiShoppingCart size={24} />}
                      {stat.icon === "dollar" && <FiDollarSign size={24} />}
                      {stat.icon === "package" && <FiPackage size={24} />}
                      {stat.icon === "users" && <FiUsers size={24} />}
                      {stat.icon === "trending" && <FiTrendingUp size={24} />}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span
                      className={`text-sm ${
                        stat.trend === "up"
                          ? "text-green-500"
                          : stat.trend === "down"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {stat.trend === "up"
                        ? `↑ ${stat.change}%`
                        : stat.trend === "down"
                        ? `↓ ${stat.change}%`
                        : "→ 0%"}{" "}
                      from last month
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {revenueData && (
                <div
                  className={`p-6 rounded-xl shadow ${
                    darkMode ? "dark:bg-gray-800" : "bg-white"
                  }`}
                >
                  <h3 className="font-medium mb-4 text-deepNavy dark:text-white">
                    Revenue Overview
                  </h3>
                  <div className="h-64">
                    <Line
                      data={revenueData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "top",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}

              {user.role !== "customer" && inventoryData && (
                <div
                  className={`p-6 rounded-xl shadow ${
                    darkMode ? "dark:bg-gray-800" : "bg-white"
                  }`}
                >
                  <h3 className="font-medium mb-4 text-deepNavy dark:text-white">
                    Inventory Levels
                  </h3>
                  <div className="h-64">
                    <Bar
                      data={inventoryData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "top",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div
              className={`p-6 rounded-xl shadow ${
                darkMode ? "dark:bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="font-medium mb-4 text-deepNavy dark:text-white">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        darkMode ? "dark:bg-gray-700" : "bg-lightTan"
                      }`}
                    >
                      {activity.type === "order" && (
                        <FiShoppingCart size={16} />
                      )}
                      {activity.type === "system" && (
                        <FiAlertCircle size={16} />
                      )}
                      {activity.type === "inventory" && <FiPackage size={16} />}
                      {activity.type === "message" && <FiUser size={16} />}
                    </div>
                    <div>
                      <p className="text-deepNavy dark:text-white">
                        {activity.message}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div
            className={`p-6 rounded-xl shadow ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="font-medium mb-4 text-deepNavy dark:text-white">
              Recent Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr
                    className={`border-b ${
                      darkMode ? "dark:border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="py-3 px-4">{order.orderId}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.status}</td>
                      <td className="py-3 px-4">${order.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div
            className={`p-6 rounded-xl shadow ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="font-medium mb-4 text-deepNavy dark:text-white">
              Product Inventory
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Stock</th>
                    <th className="py-3 px-4 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">{product.stock}</td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && user.role === "admin" && (
          <div
            className={`p-6 rounded-xl shadow ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="font-medium mb-4 text-deepNavy dark:text-white">
              User List
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4 capitalize">{user.role}</td>
                      <td className="py-3 px-4">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div
            className={`p-6 rounded-xl shadow ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="font-medium mb-4 text-deepNavy dark:text-white">
              Upcoming Events
            </h3>
            <ul className="space-y-3">
              {events.map((event) => (
                <li key={event._id} className="flex justify-between">
                  <span>{event.title}</span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "settings" && (
          <div
            className={`p-6 rounded-xl shadow ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="font-medium mb-4 text-deepNavy dark:text-white">
              Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Settings panel is under construction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
