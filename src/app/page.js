'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // backend url
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch(`${baseUrl}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }
  
      // Store token in localStorage
       localStorage.setItem('token', result.token);
  
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">

        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 dark:text-white" >
            Sign In
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm py-2">
            Welcome back! Please enter your Username and Password.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          >
            {error}
          </motion.div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-md shadow hover:bg-indigo-700 transition"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <FaSpinner className="animate-spin" />
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
