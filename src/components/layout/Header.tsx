import React from 'react';
import { Bell, Menu } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10 h-16">
      <div className="px-6 h-full flex items-center justify-between">
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-700">{currentUser?.name}</div>
              <div className="text-xs text-gray-500 capitalize">
                {currentUser?.role === 'hr_manager' ? 'HR Manager' : 'Employee'}
              </div>
            </div>
            <Avatar 
              src={currentUser?.avatar} 
              name={currentUser?.name} 
              size="sm" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;