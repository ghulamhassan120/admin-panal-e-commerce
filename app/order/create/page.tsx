"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

// TypeScript Interfaces for Order Data
interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
}

interface OrderItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  price?: number;
}

interface Order {
  _id: string;
  userId: {
    _id: string;
    name?: string;
    email?: string;
  } | string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Orders fetch karne ka function
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('https://e-cormarce-8qgn.vercel.app/api/orders/admin/all');
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Order status update karne ka function
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await axios.put(`https://e-cormarce-8qgn.vercel.app/api/orders/admin/status/${orderId}`, {
        status: newStatus
      });
      toast.success('Order status updated successfully!');
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error('Failed to update status.');
    }
  };

  // Search filter
  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress?.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-20 text-gray-400 bg-[#0f172a] min-h-screen">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6 lg:p-10 font-sans">
      
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Orders Managment</h1>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#1e293b] border border-gray-800 rounded-2xl shadow-xl overflow-hidden p-6">
        
        {/* Search Bar & Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Search by ID, Name, City..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button className="flex items-center gap-2 bg-[#0f172a] border border-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer text-gray-300">
              📥 Download
            </button>
        
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 w-10">
                  <input type="checkbox" className="rounded bg-[#0f172a] border-gray-700 cursor-pointer" />
                </th>
                <th className="p-4">ID</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Branch / City</th>
                <th className="p-4">Payment Type</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Order Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const totalQty = order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 1;
                  const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

                  return (
                    <tr key={order._id} className="hover:bg-[#162032] transition-colors group">
                      <td className="p-4">
                        <input type="checkbox" className="rounded bg-[#0f172a] border-gray-700 cursor-pointer" />
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-400 font-medium">#{order._id.slice(-6)}</td>
                      <td className="p-4 font-semibold text-gray-200">{order.shippingAddress?.fullName}</td>
                      <td className="p-4 text-gray-300">{order.shippingAddress?.city || 'N/A'}</td>
                      <td className="p-4 text-gray-300">{order.paymentMethod}</td>
                      <td className="p-4 text-gray-300">{totalQty}</td>
                      <td className="p-4 text-gray-400 text-xs">{orderDate}</td>
                      <td className="p-4">
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold outline-none cursor-pointer border border-transparent ${
                            order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                            order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            order.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          }`}
                        >
                          <option value="Pending" className="bg-[#1e293b] text-gray-200">Pending</option>
                          <option value="Processing" className="bg-[#1e293b] text-gray-200">Processing</option>
                          <option value="Shipped" className="bg-[#1e293b] text-gray-200">Shipped</option>
                          <option value="Delivered" className="bg-[#1e293b] text-gray-200">Delivered</option>
                          <option value="Cancelled" className="bg-[#1e293b] text-gray-200">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-gray-400 hover:text-white px-2 py-1 rounded transition-colors font-bold tracking-wider">
                          ⋮
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}