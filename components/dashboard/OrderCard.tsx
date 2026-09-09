'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const stockChartData = [
  { day: '1', val: 20 },
  { day: '2', val: 40 },
  { day: '3', val: 30 },
  { day: '4', val: 70 },
  { day: '5', val: 50 },
  { day: '6', val: 60 },
  { day: '7', val: 85 },
];

export default function OrderCard() {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="relative bg-gradient-to-br from-blue-900 via-[#1a1c23] to-[#1a1c23] p-6 rounded-3xl overflow-hidden border border-gray-800 shadow-xl flex flex-col justify-between h-full"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-3 bg-blue-500/20 rounded-2xl">
          <ShoppingBag className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex bg-[#252836] p-1 rounded-xl border border-gray-800 text-xs font-semibold">
          <button className="px-3 py-1 rounded-lg text-gray-400 hover:text-white transition-colors">Month</button>
          <button className="px-3 py-1 rounded-lg bg-blue-600 text-white shadow">Year</button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-1">$961</h2>
          <p className="text-sm text-gray-400 font-medium">Total Order</p>
        </div>
        <div className="w-28 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stockChartData}>
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#orderGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}