import React from 'react';
import { Menu, Search, Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 sm:h-20 px-3 sm:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 sm:p-3 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4 lg:mx-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl sm:rounded-2xl leading-5 bg-white/50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-soft focus:shadow-medium transition-all duration-300 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
          {/* Notifications */}
          <button className="relative p-2 sm:p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 transform hover:scale-105 group">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce-gentle" />
            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 block h-1.5 w-1.5 sm:h-2 sm:w-2 bg-danger-500 rounded-full animate-pulse-slow"></span>
          </button>

          {/* Settings - Hidden on very small screens */}
          <button className="hidden sm:block p-2 sm:p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 transform hover:scale-105">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* User menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300">
                {user?.avatar ? (
                  <span className="text-white font-medium text-xs sm:text-sm">{user.avatar}</span>
                ) : (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'User Name'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
              </div>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-large border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

