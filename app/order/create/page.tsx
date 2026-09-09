'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Home, ShoppingBag, CreditCard } from 'lucide-react';

export default function CreateOrderPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    userName: '',
    email: '',
    countryCode: 'US',
    phone: '',
    address: '',
    pinCode: '',
    city: '',
    country: '',
    paymentMethod: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            <span>Order</span>
            <span>&gt;</span>
            <span className="text-indigo-400">Create</span>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
        
        {/* Section: Select Product */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Product</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-full bg-[#252836] text-gray-200 pl-10 pr-4 py-2 rounded-xl text-xs border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </motion.button>
            </div>
          </div>

          {/* Product Table Header */}
          <div className="border border-gray-800 rounded-2xl overflow-hidden bg-[#252836]/30">
            <div className="grid grid-cols-5 p-4 text-xs font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-800">
              <div>Product</div>
              <div>ID</div>
              <div>Price</div>
              <div>Quantity</div>
              <div className="text-right">Action</div>
            </div>

            {/* Empty Product State */}
            <div className="py-12 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20 shadow-inner">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">No products selected!</h4>
              <p className="text-xs text-gray-400">No products selected. Use the search bar to find and add items, then continue.</p>
            </div>

            {/* Total Footer */}
            <div className="p-4 border-t border-gray-800 flex items-center justify-end gap-4 text-sm font-bold bg-[#1a1c23]">
              <span className="text-gray-400">Total :</span>
              <span className="text-indigo-400 text-base">$0.00</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-800/80" />

        {/* Section: Customer Details */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Customer Details</h3>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">Email <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">Phone Number <span className="text-red-500">*</span></label>
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
                  name="phone" 
                  placeholder="1231fx xxxxx" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-r-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-800/80" />

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

        <hr className="border-gray-800/80" />

        {/* Section: Payment */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Payment</h3>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            <select 
              name="paymentMethod" 
              value={formData.paymentMethod} 
              onChange={handleChange}
              className="w-full bg-[#252836] text-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
            >
              <option value="">Select Payment Method</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="UPI">UPI Payment</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </select>
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

      </div>
    </motion.div>
  );
}