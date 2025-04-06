import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiGlobe } from "react-icons/fi";
import { FiSun, FiMoon } from "react-icons/fi";

const AboutPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-softCream"
      }`}
    >
      {/* Navbar - Reused from HomePage */}
      <nav
        className={`sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm transition-all duration-300 ${
          darkMode ? "dark" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              SmartStock Forecast
            </motion.h1>

            <div className="hidden md:flex items-center space-x-6">
              <motion.a
                href="/"
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </motion.a>
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Vision
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "dark:text-gray-300" : "text-gray-700"
            }`}
          >
            Empowering retailers with AI-driven inventory solutions to reduce
            waste, optimize stock, and maximize profits through intelligent
            forecasting.
          </p>
        </motion.section>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-xl shadow-lg ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-3xl font-bold mb-2 text-deepNavy dark:text-white">
              6+
            </h3>
            <p
              className={`${darkMode ? "dark:text-gray-400" : "text-gray-600"}`}
            >
              Projects Built
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-xl shadow-lg ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-3xl font-bold mb-2 text-deepNavy dark:text-white">
              10+
            </h3>
            <p
              className={`${darkMode ? "dark:text-gray-400" : "text-gray-600"}`}
            >
              AI Models Trained
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-xl shadow-lg ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-3xl font-bold mb-2 text-deepNavy dark:text-white">
              200+
            </h3>
            <p
              className={`${darkMode ? "dark:text-gray-400" : "text-gray-600"}`}
            >
              Community Users
            </p>
          </motion.div>
        </motion.div>

        {/* Founders Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-deepNavy dark:text-white">
            Meet The Founders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hammad */}
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-2xl shadow-lg ${
                darkMode ? "dark:bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div
                    className={`absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur opacity-75 ${
                      darkMode ? "dark:opacity-50" : ""
                    }`}
                  ></div>
                  <img
                    src="/images/Hammad.png"
                    alt="Hammad"
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 z-10"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-deepNavy dark:text-white">
                  Hammad
                </h3>
                <p
                  className={`text-lg mb-4 ${
                    darkMode ? "dark:text-gray-400" : "text-gray-600"
                  }`}
                >
                  Co-Founder & AI Engineer
                </p>
                <p
                  className={`italic mb-6 ${
                    darkMode ? "dark:text-gray-300" : "text-gray-700"
                  }`}
                >
                  "I believe AI isn't just a tool—it's a mindset shift for how
                  we solve problems and learn."
                </p>
                <p
                  className={`mb-6 ${
                    darkMode ? "dark:text-gray-300" : "text-gray-700"
                  }`}
                >
                  Hammad is a developer with a strong foundation in AI, machine
                  learning, and systems thinking. With a deep passion for
                  building practical, impactful tools, he co-founded this
                  platform to help retailers optimize their inventory through
                  AI-assisted forecasting.
                </p>
                <p
                  className={`mb-6 ${
                    darkMode ? "dark:text-gray-300" : "text-gray-700"
                  }`}
                >
                  Despite facing challenges in breaking into traditional tech
                  roles due to market saturation, he's turned that struggle into
                  a mission—creating something new instead of waiting for
                  permission. His work blends intuitive user experience, solid
                  engineering, and a bold vision for accessible business
                  optimization tools.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="#"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiLinkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiGithub size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiMail size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Nareen */}
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-2xl shadow-lg ${
                darkMode ? "dark:bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div
                    className={`absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur opacity-75 ${
                      darkMode ? "dark:opacity-50" : ""
                    }`}
                  ></div>
                  <img
                    src="/images/Nareen.png"
                    alt="Nareen"
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 z-10"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-deepNavy dark:text-white">
                  Nareen
                </h3>
                <p
                  className={`text-lg mb-4 ${
                    darkMode ? "dark:text-gray-400" : "text-gray-600"
                  }`}
                >
                  Co-Founder & Creative Technologist
                </p>
                <p
                  className={`italic mb-6 ${
                    darkMode ? "dark:text-gray-300" : "text-gray-700"
                  }`}
                >
                  "I love designing things that feel human—and building tools
                  that empower others to do their best work."
                </p>
                <p
                  className={`mb-6 ${
                    darkMode ? "dark:text-gray-300" : "text-gray-700"
                  }`}
                >
                  Nareen is a Computer Science undergrad with a flair for
                  design, education, and AI. She's passionate about rethinking
                  how people learn, collaborate, and solve complex
                  problems—especially in a world shaped by generative
                  technologies.
                </p>
                <p
                  className={`mb-6 ${
                    darkMode ? "dark:text-gray-300" : "text-gray-700"
                  }`}
                >
                  With a strong background in project-based learning and tech
                  mentorship, she brings a rare mix of technical depth and
                  human-centered thinking. She's the creative engine behind the
                  platform's look, feel, and vision—focused on making it as
                  intuitive as it is powerful.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="#"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiLinkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiGithub size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiMail size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`py-12 px-6 rounded-2xl text-center ${
            darkMode ? "dark:bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <h2 className="text-3xl font-bold mb-4 text-deepNavy dark:text-white">
            Ready to Transform Your Inventory?
          </h2>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto ${
              darkMode ? "dark:text-gray-300" : "text-gray-700"
            }`}
          >
            Join our growing community of retailers who are saving money and
            reducing waste with smart forecasting.
          </p>
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Now
          </motion.a>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartStock Forecast
              </h3>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "dark:text-gray-400" : "text-gray-600"
                }`}
              >
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className={`p-2 ${
                  darkMode ? "dark:text-gray-300" : "text-gray-700"
                } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className={`p-2 ${
                  darkMode ? "dark:text-gray-300" : "text-gray-700"
                } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className={`p-2 ${
                  darkMode ? "dark:text-gray-300" : "text-gray-700"
                } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                <FiMail size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className={`p-2 ${
                  darkMode ? "dark:text-gray-300" : "text-gray-700"
                } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                <FiGlobe size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
