'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import axios from 'axios';

export default function OrderCard() {
  const [timeframe, setTimeframe] = useState<'month' | 'year'>('year');
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [chartData, setChartData] = useState<{ day: string; val: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Backend se timeframe ke mutabiq orders aur chart data fetch karna
  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://e-cormarce-8qgn.vercel.app/api/admin/order-stats?timeframe=${timeframe}`);
        
        // Misal ke taur par response mein { totalOrders: 961, chartData: [...] } aa raha ho
        setTotalOrders(response.data.totalOrders || 0);
        setChartData(response.data.chartData || []);
      } catch (err) {
        console.error("Error fetching order stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStats();
  }, [timeframe]);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="relative bg-gradient-to-br from-blue-900 via-[#1a1c23] to-[#1a1c23] p-6 rounded-3xl overflow-hidden border border-gray-800 shadow-xl flex flex-col justify-between h-full"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-3 bg-blue-500/20 rounded-2xl">
          <ShoppingBag className="w-6 h-6 text-blue-400" />
        </div>
        
        {/* Month / Year Toggle Buttons */}
        <div className="flex bg-[#252836] p-1 rounded-xl border border-gray-800 text-xs font-semibold">
          <button 
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              timeframe === 'month' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setTimeframe('year')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              timeframe === 'year' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-1">
            ${loading ? "..." : totalOrders.toLocaleString()}
          </h2>
          <p className="text-sm text-gray-400 font-medium">Total Order ({timeframe === 'year' ? 'Yearly' : 'Monthly'})</p>
        </div>

        {/* Dynamic Chart */}
        <div className="w-28 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData.length > 0 ? chartData : [{ day: '1', val: 0 }]}>
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