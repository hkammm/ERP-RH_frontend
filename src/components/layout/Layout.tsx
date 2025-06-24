import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 z-50">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:pl-64">
        <Header toggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 pt-16 pb-8 px-4 md:px-6 lg:px-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;