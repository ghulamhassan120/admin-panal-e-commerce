'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Camera, Upload } from 'lucide-react';

export default function CreateCustomerPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    countryCode: 'US',
    contact: '',
    address: '',
    pinCode: '',
    city: '',
    country: '',
    notes: '',
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
          <h1 className="text-xl font-bold text-white mb-1">Create</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Home className="w-3.5 h-3.5" />
            <span>&gt;</span>
            <span>Customer</span>
            <span>&gt;</span>
            <span className="text-indigo-400">Create</span>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-lg font-bold text-white mb-6">New Customer</h2>

        {/* Profile Picture Upload Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#252836]/40 border border-gray-800 rounded-2xl mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#252836] border border-gray-700 flex items-center justify-center text-gray-400 shadow-inner">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Personal Information</h4>
              <p className="text-xs text-gray-400">Add a profile picture (optional)</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#252836] border border-gray-700 text-xs font-semibold text-indigo-400 hover:text-white hover:bg-gray-800 transition-colors shadow"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Picture</span>
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
                  placeholder="Enter first name" 
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
                  placeholder="Enter last name" 
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
                  placeholder="Enter user name" 
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
                  placeholder="Enter your mail" 
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
                  <option value="PK">PK</option>
                </select>
                <input 
                  type="text" 
                  name="contact" 
                  placeholder="123456 xxxxx" 
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
                placeholder="Enter your address" 
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
                  placeholder="123456" 
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
                  <option value="">Select City</option>
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
                  <option value="">Select Country</option>
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
                placeholder="Add any additional information about this customer..." 
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
              Add
            </motion.button>
          </div>

        </form>
      </div>
    </motion.div>
  );
}