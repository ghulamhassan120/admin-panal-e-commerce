'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Phone, Mail, Calendar, Edit2 } from 'lucide-react';

export default function CustomerDetailsPage() {
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
          <h1 className="text-xl font-bold text-white mb-1">Details</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Home className="w-3.5 h-3.5" />
            <span>&gt;</span>
            <span>Customer</span>
            <span>&gt;</span>
            <span className="text-indigo-400">Details</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Card, Stats & Addresses */}
        <div className="space-y-6">
          
          {/* Profile Card */}
          <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces" 
                  alt="Caroline Pandolfi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-[#1a1c23] rounded-full" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Caroline Pandolfi</h3>

            {/* Total Order & Order Values Boxes */}
            <div className="grid grid-cols-2 gap-3 w-full bg-[#252836]/50 p-3 rounded-2xl border border-gray-800/80 mb-6">
              <div className="text-center border-r border-gray-800">
                <p className="text-xs text-gray-400 mb-1">Total Order</p>
                <p className="text-base font-extrabold text-blue-400">185</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Order Values</p>
                <p className="text-base font-extrabold text-white">7421</p>
              </div>
            </div>

            {/* Contact Details List */}
            <div className="w-full space-y-3 text-left text-sm border-t border-gray-800/80 pt-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>6187873453</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>caroline1@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Joined 8 Sep 2026</span>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-white text-sm">Shipping Address</h4>
              <button className="p-2 rounded-xl bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Florida Square, Wouruno,<br />
              New York,<br />
              United States - 393010
            </p>
          </div>

          {/* Billing Address Card */}
          <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-white text-sm">Billing Address</h4>
              <button className="p-2 rounded-xl bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Florida Square, Wouruno,<br />
              New York,<br />
              United States - 393010
            </p>
          </div>

        </div>

        {/* Right Column: Basic Information Form View & Notes */}
        <div className="lg:col-span-2 bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <h3 className="text-base font-bold text-white mb-2">Basic Information</h3>

          {/* Form Fields Display Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">First Name</label>
                <div className="bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800">Caroline</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Last Name</label>
                <div className="bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800">Pandolfi</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">User Name</label>
                <div className="bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800">caroline_pandolfi</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Email</label>
                <div className="bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800">caroline1@gmail.com</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Contact</label>
              <div className="flex">
                <div className="bg-[#252836] text-gray-300 px-4 py-3 rounded-l-xl text-sm border border-r-0 border-gray-800">US</div>
                <div className="w-full bg-[#252836] text-gray-200 px-4 py-3 rounded-r-xl text-sm border border-gray-800">6187873453</div>
              </div>
            </div>
          </div>

          <hr className="border-gray-800/80 my-6" />

          {/* Address Information Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Address Information</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Address</label>
              <div className="bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800">Florida Square, Wouruno</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Pin Code</label>
                <div className="bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800">393010</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">City</label>
                <div className="bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800">New York</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Country</label>
                <div className="bg-[#252836] text-gray-200 px-4 py-3 rounded-xl text-sm border border-gray-800">United States</div>
              </div>
            </div>
          </div>

          <hr className="border-gray-800/80 my-6" />

          {/* Additional Notes Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Additional Notes</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Note</label>
              <div className="bg-[#252836] text-gray-300 p-4 rounded-xl text-sm border border-gray-800 min-h-[100px]">
                Sample description text for user profile.
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}