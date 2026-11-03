"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const authPages = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authPages.includes(pathname);

  // Login/Register pages without admin layout
  if (isAuthPage) {
    return <>{children}</>;
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
