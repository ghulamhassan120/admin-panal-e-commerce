'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Trash2 } from 'lucide-react';

export default function EditCustomerPage() {
  const [formData, setFormData] = useState({
    firstName: 'Caroline',
    lastName: 'Pandolfi',
    userName: 'caroline_pandolfi',
    email: 'caroline1@gmail.com',
    countryCode: 'US',
    contact: '6187873453',
    address: 'Florida Square, Wouruno',
    pinCode: '393010',
    city: 'New York',
    country: 'United States',
    notes: 'Sample description text for user profile.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 bg-[#0f1117] min-h-screen text-gray-200 w-full"
    >
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Edit</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Home className="w-3.5 h-3.5" />
            <span>&gt;</span>
            <span>Customer</span>
            <span>&gt;</span>
            <span className="text-indigo-400">Edit</span>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-lg font-bold text-white mb-6">Edit Customer</h2>

        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#252836]/40 border border-gray-800 rounded-2xl mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-700 shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Personal Information</h4>
              <p className="text-xs text-gray-400">Add a profile picture (optional)</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors shadow"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Picture</span>
          </motion.button>
        </div>

        {/* Form Fields */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          
          {/* Section: Personal Information */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">First Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Last Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">User Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="userName" 
                  value={formData.userName} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">Contact <span className="text-red-500">*</span></label>
              <div className="flex">
                <select 
                  name="countryCode" 
                  value={formData.countryCode} 
                  onChange={handleChange}
                  className="bg-[#252836] text-gray-200 px-3 py-3 rounded-l-xl text-sm border border-r-0 border-gray-800 focus:outline-none focus:border-indigo-500"
                >
                  <option value="US">US</option>
                  <option value="UK">UK</option>
                  <option value="CA">CA</option>
                </select>
                <input 
                  type="text" 
                  name="contact" 
                  value={formData.contact} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-r-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-800/80 my-6" />

          {/* Section: Address Information */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Address Information</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-300 mb-2">Address <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Pin Code <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="pinCode" 
                  value={formData.pinCode} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">City <span className="text-red-500">*</span></label>
                <select 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Toronto">Toronto</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Country <span className="text-red-500">*</span></label>
                <select 
                  name="country" 
                  value={formData.country} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-800/80 my-6" />

          {/* Section: Additional Notes */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Additional Notes</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">Notes</label>
              <textarea 
                name="notes" 
                rows={4}
                value={formData.notes} 
                onChange={handleChange}
                className="w-full bg-[#252836] text-gray-200 p-4 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button 
              type="button"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
            >
              Discard
            </button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
            >
              Update
            </motion.button>
          </div>

        </form>
      </div>
    </motion.div>
  );
}