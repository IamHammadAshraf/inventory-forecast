import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiTrendingUp, FiPackage, FiAlertCircle, FiUsers, FiPieChart, FiBell, FiSmartphone } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Owner, FreshMart Grocery Chain",
      content: "This system reduced our waste by 40% in just 3 months. The forecasting accuracy is remarkable.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Operations Manager, UrbanElectronics",
      content: "The real-time alerts have saved us from dozens of stockouts during peak seasons. Game changer.",
      rating: 5
    },
    {
      id: 3,
      name: "David Rodriguez",
      position: "CEO, FashionHub Retail",
      content: "Multi-store integration works flawlessly. We've optimized inventory across all 12 locations.",
      rating: 4
    }
  ];

  // Features data
  const features = [
    {
      icon: <FiTrendingUp size={32} />,
      title: "Demand Forecasting",
      description: "Predict future sales with machine learning algorithms analyzing your past sales data."
    },
    {
      icon: <FiPackage size={32} />,
      title: "Real-Time Stock Monitoring",
      description: "Track inventory levels in real-time across all your locations with instant alerts."
    },
    {
      icon: <FiAlertCircle size={32} />,
      title: "Automated Restocking",
      description: "Get intelligent notifications when stock levels reach critical thresholds."
    },
    {
      icon: <FiUsers size={32} />,
      title: "Supplier Management",
      description: "Manage all your suppliers and optimize order quantities automatically."
    },
    {
      icon: <FiPieChart size={32} />,
      title: "Data Analytics Dashboard",
      description: "Beautiful visualizations of sales trends and inventory performance."
    },
    {
      icon: <FiSmartphone size={32} />,
      title: "Mobile & Web Access",
      description: "Manage your inventory from anywhere with our responsive interface."
    }
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              SmartStock Forecast
            </motion.h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.a 
                href="#hero" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </motion.a>
              <motion.a 
                href="#features" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Features
              </motion.a>
              <motion.a 
                href="#testimonials" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Testimonials
              </motion.a>
              <motion.a 
                href="/about" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About us
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </motion.a>
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:shadow-md transition-all"
              >
                View Demo
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-3 overflow-hidden"
              >
                <motion.a 
                  href="#hero" 
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </motion.a>
                <motion.a 
                  href="#features" 
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Features
                </motion.a>
                <motion.a 
                  href="#testimonials" 
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Testimonials
                </motion.a>
                <motion.a 
                  href="#contact" 
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact
                </motion.a>
                <motion.button
                  onClick={toggleDarkMode}
                  className="flex items-center py-2 text-gray-700 dark:text-gray-300"
                >
                  {darkMode ? (
                    <>
                      <FiSun className="mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <FiMoon className="mr-2" /> Dark Mode
                    </>
                  )}
                </motion.button>
                <motion.a
                  href="/portfolio"
                  onClick={toggleMobileMenu}
                  className="block py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center"
                >
                  View Demo
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`relative py-20 md:py-32 overflow-hidden ${darkMode ? 'dark:bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Smarter Inventory, Bigger Profits
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Our AI-powered forecasting system helps retailers reduce waste, prevent stockouts, and maximize profits by predicting exactly what you'll need and when.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all text-center"
                >
                  Get Started
                </motion.a>
                <motion.a
                  href="#features"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-medium shadow-lg hover:shadow-xl transition-all text-center border border-gray-200 dark:border-gray-600"
                >
                  Learn More
                </motion.a>
              </motion.div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`relative rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'dark:bg-gray-700' : 'bg-white'}`}
              >
                <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600">
                  <div className={`p-4 rounded-lg ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Inventory Dashboard
                      </div>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-md flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">SmartStock Forecast</div>
                        <div className="text-gray-600 dark:text-gray-300">Real-time inventory insights</div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className={`p-2 rounded-md ${darkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} text-center`}>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Stock Level</div>
                        <div className="font-bold text-blue-600 dark:text-blue-400">78%</div>
                      </div>
                      <div className={`p-2 rounded-md ${darkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} text-center`}>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Forecast</div>
                        <div className="font-bold text-purple-600 dark:text-purple-400">92%</div>
                      </div>
                      <div className={`p-2 rounded-md ${darkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} text-center`}>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Alerts</div>
                        <div className="font-bold text-red-600 dark:text-red-400">2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            Powerful Features for Retail Success
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            Trusted by Retailers Worldwide
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-xl ${darkMode ? 'dark:bg-gray-700' : 'bg-white'} shadow-md`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-4">
                  <FaQuoteLeft className="text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="italic">{testimonial.content}</p>
                </div>
                <div className="font-medium text-gray-800 dark:text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            Ready to Transform Your Inventory?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Get in Touch</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
              >
                Request Demo
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartStock Forecast
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;