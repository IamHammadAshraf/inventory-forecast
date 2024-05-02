import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [role, setRole] = useState("employee");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    

    // Simple validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const signupData = { name, email, password, role };
    console.log("Sign Up Data:", signupData);  // Log the object

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert('Signup successful!');
        // Redirect to login page or dashboard, depending on your app flow
        navigate('/login'); 

      } else {
        alert(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      {/* Signup Section */}
      <section id="signup" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            Create Your Account
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Sign Up
            </h3>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <select
                  value={role}
                  onChange={handleRoleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="manager">Manager</option>
                  <option value="owner">Owner</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
              >
                Sign Up
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;
