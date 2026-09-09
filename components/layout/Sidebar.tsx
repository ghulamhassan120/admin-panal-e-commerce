'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems, MenuItem } from '@/config/menu';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  ShoppingCart, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Customer: <UserCheck className="w-5 h-5" />,
  Order: <ShoppingCart className="w-5 h-5" />,
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Users: true,
    Customer: false,
    Order: false,
  });

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
  {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container with Framer Motion Dynamic Animation */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -280,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`absolute md:relative inset-y-0 left-0 z-50 w-64 bg-[#1a1c23] text-gray-300 min-h-screen p-4 flex flex-col border-r border-gray-800 shadow-2xl ${
          !isOpen && 'pointer-events-none md:pointer-events-auto md:w-0 md:p-0 md:overflow-hidden'
        }`}
      >
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item: MenuItem) => {
            const isMenuOpen = openMenus[item.title];
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.title} className="space-y-1">
                {hasChildren ? (
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#252836] transition-colors text-sm font-medium"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && iconMap[item.icon]}
                      <span>{item.title}</span>
                    </div>
                    {isMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors text-sm font-medium ${
                      pathname === item.path ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'hover:bg-[#252836]'
                    }`}
                  >
                    {item.icon && iconMap[item.icon]}
                    <span>{item.title}</span>
                  </Link>
                )}

                {hasChildren && (
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-9 space-y-1 my-1 overflow-hidden"
                      >
                        {item.children?.map((child) => {
                          const isActive = pathname === child.path;
                          return (
                            <Link
                              key={child.path}
                              href={child.path}
                              className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                                isActive ? 'text-indigo-400 font-semibold bg-[#252836]/50' : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              {child.title}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}