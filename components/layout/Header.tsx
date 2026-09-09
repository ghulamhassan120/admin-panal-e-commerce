'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  Menu, 
  Radio, 
  Languages, 
  Bell, 
  Maximize, 
  Settings 
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full bg-[#1a1c23] border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md"
    >
      {/* Left Section: Logo & Sidebar Toggle */}
      <div className="flex items-center gap-15 ">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            🍇
          </div>
          <span className="text-xl font-extrabold text-white tracking-wider hidden sm:inline-block">
            BERRY
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl bg-[#252836] text-indigo-400 hover:text-white transition-colors border border-gray-800"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#252836] text-gray-200 pl-10 pr-12 py-2.5 rounded-xl text-sm border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button className="absolute right-2 p-1.5 rounded-lg bg-[#1a1c23] text-indigo-400 hover:text-white transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Section: Icons & Profile Widget */}
      <div className="flex items-center gap-2 sm:gap-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 rounded-xl bg-[#252836] text-indigo-400 hover:text-white transition-colors border border-gray-800 hidden sm:flex items-center justify-center"
        >
          <Radio className="w-4 h-4" />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 rounded-xl bg-[#252836] text-indigo-400 hover:text-white transition-colors border border-gray-800 flex items-center justify-center"
        >
          <Languages className="w-4 h-4" />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 rounded-xl bg-[#252836] text-amber-400 hover:text-white transition-colors border border-gray-800 flex items-center justify-center relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 rounded-xl bg-[#252836] text-indigo-400 hover:text-white transition-colors border border-gray-800 hidden lg:flex items-center justify-center"
        >
          <Maximize className="w-4 h-4" />
        </motion.button>

        {/* Profile & Settings Pill */}
        <div className="flex items-center bg-[#252836] p-1.5 rounded-2xl border border-gray-800 gap-2">
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-indigo-600 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
              alt="User Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <motion.button 
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="p-2 text-indigo-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}