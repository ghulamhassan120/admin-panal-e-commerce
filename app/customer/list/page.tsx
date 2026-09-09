'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Plus, MoreVertical, ChevronLeft, ChevronRight, Home } from 'lucide-react';

const customersData = [
  { id: 1, name: 'Caroline Pandolfi', email: 'caroline1@gmail.com', phone: '6187873453', country: 'United States', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces' },
  { id: 2, name: 'Liam Smith', email: 'liam2@gmail.com', phone: '2125551234', country: 'United States', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' },
  { id: 3, name: 'Emma Johnson', email: 'emma3@gmail.com', phone: '3105555678', country: 'Canada', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces' },
  { id: 4, name: 'Noah Brown', email: 'noah4@gmail.com', phone: '4155559999', country: 'United Kingdom', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces' },
  { id: 5, name: 'Olivia Davis', email: 'olivia5@gmail.com', phone: '6465551111', country: 'United States', status: 'Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces' },
  { id: 6, name: 'William Miller', email: 'william6@gmail.com', phone: '7185552222', country: 'Canada', status: 'Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces' },
  { id: 7, name: 'Sophia Wilson', email: 'sophia7@gmail.com', phone: '9175553333', country: 'United States', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces' },
  { id: 8, name: 'James Moore', email: 'james8@gmail.com', phone: '2025554444', country: 'United Kingdom', status: 'Active', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces' },
  { id: 9, name: 'Isabella Taylor', email: 'isabella9@gmail.com', phone: '3055555555', country: 'Canada', status: 'Active', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces' },
  { id: 10, name: 'Benjamin Anderson', email: 'benjamin10@gmail.com', phone: '4085556666', country: 'United States', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces' },
];

export default function CustomerListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customersData.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-xl font-bold text-white mb-1">List</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Home className="w-3.5 h-3.5" />
            <span>&gt;</span>
            <span>Customer</span>
            <span>&gt;</span>
            <span className="text-indigo-400">List</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1c23] border border-gray-800 text-sm font-medium hover:bg-[#252836] transition-colors shadow-lg"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Download</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </motion.button>
        </div>
      </div>

      {/* Main Table Card Container */}
      <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Search Bar Toolbar */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#252836] text-gray-200 pl-10 pr-4 py-2 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400 font-semibold bg-[#252836]/30">
                <th className="p-4 w-12 text-center">
                  <input type="checkbox" className="rounded bg-[#252836] border-gray-700 text-indigo-600 focus:ring-0 cursor-pointer" />
                </th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Country</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {filteredCustomers.map((customer, index) => (
                <motion.tr 
                  key={customer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  whileHover={{ backgroundColor: 'rgba(37, 40, 54, 0.4)' }}
                  className="transition-colors"
                >
                  <td className="p-4 text-center">
                    <input type="checkbox" className="rounded bg-[#252836] border-gray-700 text-indigo-600 focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <img src={customer.avatar} alt={customer.name} className="w-9 h-9 rounded-full object-cover border border-gray-700 shadow" />
                    <span className="font-semibold text-white">{customer.name}</span>
                  </td>
                  <td className="p-4 text-gray-300">{customer.email}</td>
                  <td className="p-4 text-gray-300">{customer.phone}</td>
                  <td className="p-4 text-gray-300">{customer.country}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === 'Active' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 rounded-xl hover:bg-[#252836] text-gray-400 hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="bg-[#252836] border border-gray-800 text-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span>1-10 of 14</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg bg-[#252836] border border-gray-800 text-gray-400 hover:text-white disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg bg-[#252836] border border-gray-800 text-gray-400 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}