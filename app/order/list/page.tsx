'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Plus, MoreVertical, ChevronLeft, ChevronRight, Home, ArrowUpDown } from 'lucide-react';

const ordersData = [
  { id: '#790955', customer: 'Joseph William', branch: 'USA', paymentType: 'Card', quantity: 6, date: '08 Sept 2026', status: 'Pending' },
  { id: '#790956', customer: 'Emma Watson', branch: 'Canada', paymentType: 'Card', quantity: 1, date: '07 Sept 2026', status: 'Complete' },
  { id: '#790957', customer: 'Rahul Sharma', branch: 'India', paymentType: 'UPI', quantity: 2, date: '06 Sept 2026', status: 'Pending' },
  { id: '#790958', customer: 'Oliver Smith', branch: 'UK', paymentType: 'COD', quantity: 1, date: '05 Sept 2026', status: 'Cancel' },
  { id: '#790959', customer: 'Liam Brown', branch: 'Australia', paymentType: 'Card', quantity: 1, date: '04 Sept 2026', status: 'Hold' },
  { id: '#790960', customer: 'Hans Muller', branch: 'USA', paymentType: 'UPI', quantity: 1, date: '03 Sept 2026', status: 'Pending' },
  { id: '#790961', customer: 'Jean Dupont', branch: 'USA', paymentType: 'Card', quantity: 1, date: '02 Sept 2026', status: 'Hold' },
  { id: '#790962', customer: 'Yuki Tanaka', branch: 'UK', paymentType: 'UPI', quantity: 2, date: '01 Sept 2026', status: 'Pending' },
  { id: '#790963', customer: 'Ahmed Khan', branch: 'USA', paymentType: 'COD', quantity: 1, date: '31 Aug 2026', status: 'Complete' },
  { id: '#790964', customer: 'Wei Lim', branch: 'UK', paymentType: 'Card', quantity: 2, date: '30 Aug 2026', status: 'Pending' },
];

export default function OrderListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = ordersData.filter(o => 
    o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Cancel':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'Hold':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
    }
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
          <h1 className="text-xl font-bold text-white mb-1">List</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Home className="w-3.5 h-3.5" />
            <span>&gt;</span>
            <span>Order</span>
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
                <th className="p-4 flex items-center gap-1.5 cursor-pointer hover:text-white">
                  <span>ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Payment Type</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Order Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {filteredOrders.map((order, index) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  whileHover={{ backgroundColor: 'rgba(37, 40, 54, 0.4)' }}
                  className="transition-colors"
                >
                  <td className="p-4 text-center">
                    <input type="checkbox" className="rounded bg-[#252836] border-gray-700 text-indigo-600 focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="p-4 font-semibold text-indigo-400">{order.id}</td>
                  <td className="p-4 font-medium text-white">{order.customer}</td>
                  <td className="p-4 text-gray-300">{order.branch}</td>
                  <td className="p-4 text-gray-300">{order.paymentType}</td>
                  <td className="p-4 text-gray-300">{order.quantity}</td>
                  <td className="p-4 text-gray-300">{order.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                      {order.status}
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
            <span>1-10 of 13</span>
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