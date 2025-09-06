import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, CheckSquare, BarChart3, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Deals', href: '/deals', icon: Briefcase },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-white to-gray-50 shadow-large transform transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-soft glow">
              <span className="text-white font-bold text-lg sm:text-xl">C</span>
            </div>
            <div className="ml-3 sm:ml-4">
              <span className="text-lg sm:text-xl font-bold gradient-text">Modern CRM</span>
              <p className="text-xs text-gray-500">v2.0</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Navigation */}
          <nav className="mt-6 sm:mt-8 px-3 sm:px-4">
            <div className="space-y-1 sm:space-y-2">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group sidebar-item ${isActive ? 'sidebar-item-active' : ''}
                      animate-slide-up
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`
                      p-2 rounded-xl mr-3 transition-all duration-300
                      ${isActive
                        ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-soft'
                        : 'text-gray-400 group-hover:text-primary-600 group-hover:bg-primary-100'
                      }
                    `}>
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse-slow"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Quick Stats */}
          <div className="mt-6 sm:mt-8 px-3 sm:px-4 pb-4">
            <div className="card-hover">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Today's Activity</span>
                <span className="text-xs text-success-600 font-medium">+12%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 sm:p-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-soft">
              <span className="text-white font-medium text-xs sm:text-sm">U</span>
            </div>
            <div className="ml-2 sm:ml-3 flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">User Name</p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
