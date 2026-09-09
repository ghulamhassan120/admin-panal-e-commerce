'use client';

import React from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area 
} from 'recharts';

const growthData = [
  { month: 'Jan', investment: 40, loss: 30, profit: 20, maintenance: 15 },
  { month: 'Feb', investment: 120, loss: 40, profit: 80, maintenance: 45 },
  { month: 'Mar', investment: 50, loss: 20, profit: 60, maintenance: 30 },
  { month: 'Apr', investment: 40, loss: 20, profit: 30, maintenance: 15 },
  { month: 'May', investment: 40, loss: 35, profit: 40, maintenance: 25 },
  { month: 'Jun', investment: 80, loss: 40, profit: 100, maintenance: 120 },
  { month: 'Jul', investment: 70, loss: 40, profit: 60, maintenance: 45 },
  { month: 'Aug', investment: 15, loss: 10, profit: 20, maintenance: 10 },
  { month: 'Sep', investment: 40, loss: 20, profit: 30, maintenance: 25 },
  { month: 'Oct', investment: 50, loss: 40, profit: 60, maintenance: 25 },
  { month: 'Nov', investment: 25, loss: 20, profit: 70, maintenance: 105 },
  { month: 'Dec', investment: 75, loss: 40, profit: 30, maintenance: 15 },
];

const stockChartData = [
  { day: '1', val: 20 },
  { day: '2', val: 40 },
  { day: '3', val: 30 },
  { day: '4', val: 70 },
  { day: '5', val: 50 },
  { day: '6', val: 60 },
  { day: '7', val: 85 },
];

const popularStocks = [
  { name: 'Bajaj Finserv', price: '$1839.00', profit: '10% Profit', isPositive: true },
  { name: 'TTML', price: '$100.00', profit: '10% Loss', isPositive: false },
  { name: 'Reliance', price: '$200.00', profit: '10% Profit', isPositive: true },
  { name: 'TTML', price: '$189.00', profit: '10% Loss', isPositive: false },
  { name: 'Stolon', price: '$189.00', profit: '10% Loss', isPositive: false },
];

export default function GrowthChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Total Growth Bar Chart */}
      <div className="lg:col-span-2 bg-[#1a1c23] border border-gray-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Total Growth</p>
            <h2 className="text-2xl font-bold text-white">$2,324.00</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-[#252836] border border-gray-800 rounded-xl text-xs font-medium">
              <span>Today</span>
            </div>
            <button className="p-2 bg-[#252836] border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData} barSize={12}>
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#252836', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="investment" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
              <Bar dataKey="loss" stackId="a" fill="#60a5fa" />
              <Bar dataKey="profit" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="maintenance" stackId="a" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-800/60 text-xs text-gray-400 font-medium">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600" /> Investment</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400" /> Loss</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500" /> Profit</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-600" /> Maintenance</div>
        </div>
      </div>

      {/* Popular Stocks Widget */}
      <div className="bg-[#1a1c23] border border-gray-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base">Popular Stocks</h3>
            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
          </div>

          <div className="bg-gradient-to-br from-purple-950/60 via-[#252836] to-[#1a1c23] border border-purple-900/50 p-4 rounded-2xl mb-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-bold text-purple-300 text-sm">Bajaj Finery</h4>
                <p className="text-xs text-gray-400">10% Profit</p>
              </div>
              <span className="font-extrabold text-white text-base">$1839.00</span>
            </div>
            <div className="w-full h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stockChartData}>
                  <defs>
                    <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#a855f7" strokeWidth={2} fill="url(#stockGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            {popularStocks.map((stock, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-none text-sm">
                <div>
                  <h5 className="font-semibold text-gray-200">{stock.name}</h5>
                  <p className={`text-xs ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>{stock.profit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-200">{stock.price}</span>
                  {stock.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400 bg-green-500/10 p-0.5 rounded" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400 bg-red-500/10 p-0.5 rounded" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors">
            View All &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}