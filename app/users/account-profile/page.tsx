'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Search, MessageSquare, Home, ChevronRight } from 'lucide-react';
import { IUser } from '@/types/user';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  console.log(users)
  const fetchUsers = async () => {
    try {
      const response = await axios.get<IUser[]>('https://e-cormarce-8qgn.vercel.app/api/auth');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`https://e-cormarce-8qgn.vercel.app/api/auth/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  // Search filter
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center py-20 text-gray-400 bg-[#0f172a] min-h-screen">Loading users...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6 sm:p-8">
      
    
      {/* Main Card Container */}
      <div className="bg-[#1e293b] border border-gray-800 rounded-2xl shadow-xl overflow-hidden p-6">
        
        {/* Header with Title and Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pb-6 mb-4 border-b border-gray-800 gap-4">
          <h2 className="text-xl font-bold text-white">Users Managment</h2>
          
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
                <th className="py-4 px-4">#</th>
                <th className="py-4 px-4">User Profile</th>
                <th className="py-4 px-4">Country</th>
                <th className="py-4 px-4">Friends</th>
                <th className="py-4 px-4">Followers</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                  // Dummy status / country mapping for visual match if fields don't exist in DB yet
                  const status = user.role === 'admin' ? 'Active' :  'Active';
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-800/40 transition">
                      <td className="py-4 px-4 text-gray-400 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      
                      <td className="py-4 px-4 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white overflow-hidden flex-shrink-0">
                          {/* Agar user ki image ho to wo dikhayein, warna pehla letter */}
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            {user.name}
                            {user.role === 'admin' && <span className="text-emerald-400 text-xs">✓</span>}
                          </div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-gray-300">Pakistan</td>
                      <td className="py-4 px-4 text-gray-300">{(index + 1) * 142}</td>
                      <td className="py-4 px-4 text-gray-300">{(index + 1) * 850}</td>

                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right space-x-3">
                        <button className="text-sky-400 hover:text-sky-300 transition inline-block">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        {user.role !== 'admin' && (
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-400 hover:text-red-300 transition inline-block"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}