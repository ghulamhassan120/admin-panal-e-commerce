import '@/styles/globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import AdminLayout from '@/components/layout/AdminLayout';

export const metadata = {
  title: 'Berry Admin Panel',
  description: 'E-commerce Admin Dashboard built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="en">
      <body className="bg-[#0f1117] text-gray-200 antialiased overflow-hidden">
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}