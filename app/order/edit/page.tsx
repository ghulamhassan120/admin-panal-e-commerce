'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Home, Trash2, CreditCard, Minus } from 'lucide-react';

export default function EditOrderPage() {
  const [products, setProducts] = useState([
    { id: '090250XH', name: 'Apple iPhone 14 Pro', price: 999.00, qty: 4, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop' },
    { id: '090226NT', name: 'Samsung Galaxy S23 Ultra', price: 1199.00, qty: 2, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop' }
  ]);

  const [formData, setFormData] = useState({
    firstName: 'Joseph William',
    userName: 'joseph_william',
    email: 'john.doe@example.com',
    countryCode: 'US',
    phone: '5622590742',
    address: '123 Main Street',
    pinCode: '100011',
    city: 'New York',
    country: 'United States',
    paymentMethod: 'Credit Card',
    cardNumber: '••••••••',
    expirationDate: '12/29',
    cvv: '•••'
  });

  const updateQuantity = (index: number, delta: number) => {
    const updated = [...products];
    const newQty = updated[index].qty + delta;
    if (newQty > 0) {
      updated[index].qty = newQty;
      setProducts(updated);
    }
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return products.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
  };

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
          <h1 className="text-xl font-bold text-white mb-1">Edit</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Home className="w-3.5 h-3.5" />
            <span>&gt;</span>
            <span>Order</span>
            <span>&gt;</span>
            <span className="text-indigo-400">Edit</span>
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

          {/* Product Table */}
          <div className="border border-gray-800 rounded-2xl overflow-hidden bg-[#252836]/30">
            <div className="grid grid-cols-5 p-4 text-xs font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-800">
              <div>Product</div>
              <div>ID</div>
              <div>Price</div>
              <div>Quantity</div>
              <div className="text-right">Action</div>
            </div>

            <div className="divide-y divide-gray-800/60">
              {products.map((item, index) => (
                <div key={item.id} className="grid grid-cols-5 items-center p-4 text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-9 h-9 rounded-xl object-cover border border-gray-700" />
                    <span className="font-semibold text-white">{item.name}</span>
                  </div>
                  <div className="text-indigo-400 font-medium text-xs">{item.id}</div>
                  <div className="text-gray-300">${item.price.toFixed(2)}</div>
                  <div>
                    <div className="inline-flex items-center bg-[#252836] border border-gray-700 rounded-xl px-2 py-1 gap-3">
                      <button onClick={() => updateQuantity(index, -1)} className="text-gray-400 hover:text-white">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-white text-xs">{item.qty}</span>
                      <button onClick={() => updateQuantity(index, 1)} className="text-gray-400 hover:text-white">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <button 
                      onClick={() => removeProduct(index)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors inline-flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Footer */}
            <div className="p-4 border-t border-gray-800 flex items-center justify-end gap-4 text-sm font-bold bg-[#1a1c23]">
              <span className="text-gray-400">Total :</span>
              <span className="text-indigo-400 text-base">${calculateTotal()}</span>
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

        <hr className="border-gray-800/80" />

        {/* Section: Payment & Card Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Payment</h3>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            <select 
              name="paymentMethod" 
              value={formData.paymentMethod} 
              onChange={handleChange}
              className="w-full bg-[#252836] text-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI Payment</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Credit Card Number <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="cardNumber" 
              value={formData.cardNumber} 
              onChange={handleChange}
              className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">Expiration Date <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="expirationDate" 
                value={formData.expirationDate} 
                onChange={handleChange}
                className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">CVV <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="cvv" 
                value={formData.cvv} 
                onChange={handleChange}
                className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
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

      </div>
    </motion.div>
  );
}