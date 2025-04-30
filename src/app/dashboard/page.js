'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_id: ''
  });

  // Backend url   
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error(res.status === 401 ? 'Unauthorized - Please login again' : `HTTP error! status: ${res.status}`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchBookings();
  }, []);

  // Handle delete
  const deleteBooking = async (id) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const res = await fetch(`${API_BASE}booking/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Booking deleted!');
      fetchBookings();
    } catch (err) {
      toast.error(err.message || 'Error deleting booking');
    }
  };

  // Handle form edit
  const startEdit = (booking) => {
    setEditingId(booking.id);
    setFormData({
      customer_name: booking.customer_name,
      address: booking.address,
      date_time: booking.date_time.slice(0, 16),
      service_id: booking.service_id
    });
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle update submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}booking/${editingId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success('Booking updated!');
      setEditingId(null);
      setFormData({ customer_name: '', address: '', date_time: '', service_id: '' });
      fetchBookings();
    } catch (err) {
      toast.error(err.message || 'Error updating booking');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
        <p className="text-red-500">{error}</p>
        {error.includes('Unauthorized') && (
          <button
            onClick={() => (window.location.href = '/login')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Go to Login
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-indigo-700">
        Booking List
      </motion.h1>

      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        // 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* fetch booking list */}
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 border"
            >
              {editingId === booking.id ? (
                
                // form for update booking
                <form onSubmit={handleUpdate}>

                  {/* customer name */}
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="w-full mb-2 px-3 py-2 border rounded"
                    required />

                {/* address */}
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full mb-2 px-3 py-2 border rounded"
                    required />

                {/* date time */}
                  <input
                    type="datetime-local"
                    name="date_time"
                    value={formData.date_time}
                    onChange={handleChange}
                    className="w-full mb-2 px-3 py-2 border rounded"
                    required />

                {/* Service Id  */}
                  <input
                    type="number"
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    className="w-full mb-2 px-3 py-2 border rounded"
                    required />

                {/* save and cancel button */}
                  <div className="flex justify-end gap-3 mt-2">
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-700" >
                      <FaCheck className="inline mr-1 cursor-pointer" /> Save
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400" >
                      <FaTimes className="inline mr-1 cursor-pointer" /> Cancel
                    </button>

                  </div>

                </form>
              ) : (
                <>

                  <div className="flex items-center mb-2 text-indigo-600 font-medium">
                    <FaUser className="mr-2" /> {booking.customer_name}
                  </div>

                  <div className="flex items-center mb-2 text-gray-700">
                    <FaMapMarkerAlt className="mr-2" /> {booking.address}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(booking.date_time).toLocaleString()}
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Service: {booking.Service?.name || 'N/A'}
                  </p>

                  <div className="flex justify-end gap-4 mt-4">
                    <button onClick={() => startEdit(booking)} className="text-blue-600 hover:underline cursor-pointer" >
                        <FaEdit className="inline mr-1" /> Edit
                    </button>

                    <button onClick={() => deleteBooking(booking.id)} className="text-red-600 hover:underline cursor-pointer" >
                      <FaTrash className="inline mr-1" /> Delete
                    </button>
                  </div>

                </>
              )}

            </motion.div>

          ))}
        </div>
      )}
    </div>
  );
}
