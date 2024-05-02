import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = { email, password };
    console.log("Logging in:", loginData);
  
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        localStorage.setItem("token", result.token); 
        //alert('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard or home page
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Try again later.');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-softCream dark:bg-deepNavy flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-deepNavy dark:text-white mb-8"
        >
          Login to Your Account
        </motion.h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-deepNavy dark:text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-deepNavy dark:text-white mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
          >
            Log In
          </motion.button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?<br/>
            <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
