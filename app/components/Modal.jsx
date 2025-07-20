'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
   import { FaUser, FaEnvelope, FaBuilding, FaStar, FaTimes } from 'react-icons/fa';
 import { mockDepartments, mockRatings } from '@/lib/mockData';

export default function Modal({ isOpen, onClose, onSubmit }) {
  
  const [form, setForm] = useState({ name: '', email: '', department: '', rating: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Please fill name and email');
      return;

    }
    onSubmit(form);
    setForm({ name: '', email: '', department: '', rating: '' });
    onClose();
  };

       const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}

          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-xl shadow-cyan-500/30 text-white relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-cyan-400 transition"
          >
            <FaTimes size={20} />
          </button>
          <h2 className="text-2xl font-bold text-cyan-300 text-center mb-6 drop-shadow-md">Add New Employee</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-400 transition">
              <FaUser className="text-white/70" />
              <input
                type="text"
                name="name"

                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full placeholder-white/70 text-white"
                required
              />
            </div>
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-400 transition">
              <FaEnvelope className="text-white/70" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full placeholder-white/70 text-white"
                required
              />

            </div>
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-400 transition">
              <FaBuilding className="text-white/70" />
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full text-white placeholder-white/70"
                required
              >
                <option value="" disabled className="text-white/70 bg-[#243b55]">
                  Select Department
                </option>
                {mockDepartments.map((dept) => (
                  <option key={dept} value={dept} className="text-black bg-white">
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-400 transition">
              <FaStar className="text-white/70" />
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full text-white placeholder-white/70"
                required
              >
                <option value="" disabled className="text-white/70 bg-[#243b55]">
                  Select Rating
                </option>
                {mockRatings.map((rating) => (
                  <option key={rating} value={rating} className="text-black bg-white">
                    {rating} Stars
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl transition duration-300 hover:shadow-[0_0_20px_#0ff]"
              >
                Add
              </button>
              <button
                type="button"
                  
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition duration-300 hover:shadow-[0_0_10px_#f00]"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}