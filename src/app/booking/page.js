'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaSpinner, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewBooking() {
  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_id: ''
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingServices, setFetchingServices] = useState(true);
  const [success, setSuccess] = useState(false);

  // backend url
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE}service`);
        if (!response.ok) throw new Error('Failed to fetch services');
        
        const data = await response.json();
        setServices(data.services || []); 
      } catch (error) {
        toast.error(error.message || 'Error loading services');
        console.error('Error fetching services:', error);
      } finally {
        setFetchingServices(false);
      }
    };

    fetchServices();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {

      // fetcht the token
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`${API_BASE}booking`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create booking');

      toast.success('Booking created successfully!');

      setSuccess(true);

      setFormData({
        customer_name: '',
        address: '',
        date_time: '',
        service_id: ''
      });

      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      toast.error(error.message || 'Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto" >
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">New Booking</h1>
        
        {/* booking form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100"
        >
          <div className="space-y-6">
            {/* Customer Name */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
>
              <label className="block text-gray-700 mb-2 font-medium">
                <FaUser className="inline mr-2 text-indigo-600" />
                Customer Name
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                placeholder="Firstname Lastname"
              />
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }} >
              <label className="block text-gray-700 mb-2 font-medium">
                <FaMapMarkerAlt className="inline mr-2 text-indigo-600" />
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                placeholder="123 Main St, City" />

            </motion.div>

            {/* Date & Time */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-700 mb-2 font-medium">
                <FaCalendarAlt className="inline mr-2 text-indigo-600" />
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="date_time"
                value={formData.date_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </motion.div>

            {/* Service Selection */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-gray-700 mb-2 font-medium">
                Service
              </label>
              {fetchingServices ? (
                <div className="flex items-center space-x-2">
                  <FaSpinner className="animate-spin text-indigo-600" />
                  <span>Loading services...</span>
                </div>
              ) : (
                <select
                  name="service_id"
                  value={formData.service_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                >
                  <option value="">Select a service</option>

                  {/* fetching service names */}
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={loading || fetchingServices}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                  success 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : success ? (
                  <>
                    <FaCheck className="mr-2" />
                    Success!
                  </>
                ) : (
                  'Create Booking'
                )}
              </button>
            </motion.div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}