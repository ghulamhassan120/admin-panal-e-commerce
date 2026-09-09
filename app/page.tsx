import React from 'react';
import EarningCard from '@/components/dashboard/EarningCard';
import GrowthChart from '@/components/dashboard/GrowthChart';

export default function DashboardPage() {
  return (
    <div className="w-full p-6 space-y-6 bg-[#0f1117] min-h-screen text-gray-200">
      {/* Top Row Cards */}
      <div className="w-full">
        <EarningCard />
      </div>

      {/* Main Growth Chart & Stocks Section */}
      <div className="w-full">
        <GrowthChart />
      </div>
    </div>
  );
}