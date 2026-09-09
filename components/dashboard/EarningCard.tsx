'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, MoreHorizontal, ArrowUpRight, Store } from 'lucide-react';
import OrderCard from './OrderCard';

export default function EarningCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
      {/* Total Earning Card */}
      <motion.div 
        whileHover={{ y: -4 }}
        className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-[#1a1c23] p-6 rounded-3xl overflow-hidden border border-gray-800 shadow-xl flex flex-col justify-between h-full"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-300" />
          </button>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-3xl font-extrabold text-white">$500.00</h2>
            <span className="p-1 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-sm text-gray-400 font-medium">Total Earning</p>
        </div>
      </motion.div>

      {/* Total Order Card */}
      <div className="h-full">
        <OrderCard />
      </div>

      {/* Total Income Stacked Cards */}
      <div className="grid grid-rows-2 gap-4 h-full">
        <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">$203k</h3>
              <p className="text-xs text-blue-100">Total Income</p>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="bg-[#1a1c23] border border-gray-800 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#252836] rounded-xl">
              <Store className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">$203k</h3>
              <p className="text-xs text-gray-400">Total Income</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}