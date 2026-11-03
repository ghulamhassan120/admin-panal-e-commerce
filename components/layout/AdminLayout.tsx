"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  
  // Yeh pages hain jahan admin layout ki zaroorat nahi hai
  const authPages = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authPages.includes(pathname);

  useEffect(() => {
    // Agar user login/register page par hai toh auth check ki zaroorat nahi
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    // LocalStorage se user check karein
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo || userInfo === "undefined") {
      router.push("/login"); // Agar login nahi hai toh login page par bhej dein
    } else {
      setIsAuthorized(true);
    }
    setLoading(false);
  }, [pathname, isAuthPage, router]);

  // Login/Register pages without admin layout
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Jab tak check ho raha hai, loading screen dikhayein
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center text-white font-medium">
        Loading admin panel...
      </div>
    );
  }

  // Agar authorized nahi hai toh kuch render na ho (redirect hone tak)
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header ko toggle function pass kiya */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar ko open/close state di */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto bg-[#0f1117]">{children}</main>
      </div>
    </div>
  );
}