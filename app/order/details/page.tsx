'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Phone, Mail } from 'lucide-react';

const productsOrdered = [
  { 
    name: 'Apple iPhone 14 Pro', 
    price: '$999', 
    total: '$3996.00', 
    qty: 'Qty 4', 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop' 
  },
  { 
    name: 'Samsung Galaxy S23 Ultra', 
    price: '$1199', 
    total: '$2398.00', 
    qty: 'Qty 2', 
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop' 
  }
];

const activityTimeline = [
  {
    date: 'Saturday, 10 January',
    events: [
      { time: '01:43 PM', title: 'Parcel has been delivered', subtitle: 'Recipient: Steve Sutton', active: true },
      { time: '09:02 AM', title: 'Parcel is out for delivery', subtitle: '', active: true },
      { time: '08:49 AM', title: 'Parcel has arrived at delivery station', subtitle: '', active: true },
    ]
  },
  {
    date: 'Friday, 09 January',
    events: [
      { time: '07:16 PM', title: 'Parcel has been picked up by courier', subtitle: '', active: true },
      { time: '09:30 AM', title: 'Seller is preparing to ship your parcel', subtitle: '', active: true },
    ]
  }
];

export default function OrderDetailsPage() {
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
            <span>Order</span>
            <span>&gt;</span>
            <span className="text-indigo-400">Details</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Products, Summary & Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Header Card */}
          <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-6">Order: #790955</h2>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Products Ordered</h3>
            
            {/* Products List */}
            <div className="space-y-4 mb-6">
              {productsOrdered.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-800/60 last:border-none">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover border border-gray-700" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-400">{item.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-white text-sm">{item.total}</p>
                    <p className="text-xs text-indigo-400 font-medium">{item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="bg-[#252836]/40 border border-gray-800 rounded-2xl p-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span className="font-semibold text-white">$6394.00</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="font-semibold text-white">$20.00</span>
              </div>
              <div className="flex justify-between text-gray-300 border-b border-gray-800 pb-3">
                <span>Tax</span>
                <span className="font-semibold text-white">$105.00</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-1">
                <span>Total</span>
                <span className="text-indigo-400 text-lg">$6519.00</span>
              </div>
            </div>
          </div>

          {/* Activity Timeline Card */}
          <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <h3 className="text-base font-bold text-white mb-2">Activity</h3>

            {activityTimeline.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400">{group.date}</h4>
                <div className="space-y-6 pl-2 border-l-2 border-indigo-500/30 ml-2">
                  {group.events.map((event, eventIdx) => (
                    <div key={eventIdx} className="relative pl-6">
                      {/* Timeline Node Dot */}
                      <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 bg-indigo-600 border-2 border-[#1a1c23] rounded-full shadow" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <p className="text-sm font-bold text-white">{event.title}</p>
                          {event.subtitle && <p className="text-xs text-indigo-400 font-medium mt-0.5">{event.subtitle}</p>}
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Customer Details & Addresses */}
        <div className="space-y-6">
          
          {/* Customer Details Widget */}
          <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Customer Details</h3>
            
            <div className="flex items-center gap-3 p-3 bg-[#252836]/40 border border-gray-800 rounded-2xl">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-700 shadow">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
                  alt="Joseph William" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Joseph William</h4>
                <p className="text-xs text-indigo-400">@joseph_william</p>
              </div>
            </div>

            <div className="space-y-3 text-sm pt-2">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+1 5622590742</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>john.doe@example.com</span>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 shadow-2xl">
            <h4 className="font-bold text-white text-sm mb-3">Shipping Address</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              123 Main Street,<br />
              New York,<br />
              100011<br />
              US
            </p>
          </div>

          {/* Billing Address Card */}
          <div className="bg-[#1a1c23] border border-gray-800 rounded-3xl p-6 shadow-2xl">
            <h4 className="font-bold text-white text-sm mb-3">Billing Address</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              123 Main Street,<br />
              New York,<br />
              100011<br />
              US
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}