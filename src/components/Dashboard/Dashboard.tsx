import React from 'react';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp,
  Calendar,
  CheckCircle,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { mockDashboardStats, mockDeals } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;

  const StatCard = ({ title, value, icon: Icon, color, change, delay = 0 }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    change?: string;
    delay?: number;
  }) => (
    <div 
      className="stat-card-compact animate-slide-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-3">
          <div className={`p-2 sm:p-2.5 rounded-lg ${color} shadow-soft group-hover:shadow-medium transition-all duration-300 flex-shrink-0`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="ml-2 flex-1">
            <p className="text-xs font-medium text-gray-600">{title}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center text-center">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-none mb-1">{value}</p>
          {change && (
            <div className="flex items-center justify-center">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success-600 mr-1 flex-shrink-0" />
              <span className="text-xs text-success-600 font-medium">{change}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const RecentDeals = () => (
    <div className="card animate-slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Recent Deals</h3>
        <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-all duration-300 text-sm sm:text-base">
          View All
          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
        </button>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {mockDeals.slice(0, 3).map((deal, index) => (
          <div 
            key={deal.id} 
            className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-primary-50 rounded-2xl hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            style={{ animationDelay: `${500 + index * 100}ms` }}
          >
            <div className="flex items-center min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft mr-3 sm:mr-4 flex-shrink-0">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{deal.title}</p>
                <p className="text-xs sm:text-sm text-gray-600 truncate">{deal.customerName}</p>
              </div>
            </div>
            <div className="text-right ml-3 flex-shrink-0 min-w-0">
              <p className="text-sm sm:text-lg font-bold text-gray-900 truncate">${deal.value.toLocaleString()}</p>
              <span className={`badge badge-${deal.stage === 'closed' ? 'success' : 'primary'} text-xs`}>
                {deal.stage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="card animate-slide-up" style={{ animationDelay: '600ms' }}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">Quick Actions</h3>
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-soft">
          <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <button className="group relative overflow-hidden p-2.5 sm:p-3 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-medium">
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-soft mr-2 sm:mr-3 group-hover:shadow-medium transition-all duration-300 flex-shrink-0">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:animate-bounce-gentle" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs sm:text-sm text-blue-900">Add Customer</p>
              <p className="text-xs text-blue-600 mt-0.5">New profile</p>
            </div>
          </div>
        </button>
        
        <button className="group relative overflow-hidden p-2.5 sm:p-3 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-medium">
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md flex items-center justify-center shadow-soft mr-2 sm:mr-3 group-hover:shadow-medium transition-all duration-300 flex-shrink-0">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:animate-bounce-gentle" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs sm:text-sm text-purple-900">New Deal</p>
              <p className="text-xs text-purple-600 mt-0.5">Sales deal</p>
            </div>
          </div>
        </button>
        
        <button className="group relative overflow-hidden p-2.5 sm:p-3 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-medium">
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-md flex items-center justify-center shadow-soft mr-2 sm:mr-3 group-hover:shadow-medium transition-all duration-300 flex-shrink-0">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:animate-bounce-gentle" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs sm:text-sm text-green-900">Create Task</p>
              <p className="text-xs text-green-600 mt-0.5">Add task</p>
            </div>
          </div>
        </button>
        
        <button className="group relative overflow-hidden p-2.5 sm:p-3 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 text-orange-700 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-medium">
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center shadow-soft mr-2 sm:mr-3 group-hover:shadow-medium transition-all duration-300 flex-shrink-0">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:animate-bounce-gentle" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs sm:text-sm text-orange-900">Schedule Meeting</p>
              <p className="text-xs text-orange-600 mt-0.5">Book meeting</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const ActivityChart = () => (
    <div className="card animate-slide-up" style={{ animationDelay: '800ms' }}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Activity Overview</h3>
        <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-gray-600">Sales Activity</span>
          <span className="text-xs sm:text-sm font-bold text-gray-900">85%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '85%' }}></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-gray-600">Customer Engagement</span>
          <span className="text-xs sm:text-sm font-bold text-gray-900">72%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '72%' }}></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-gray-600">Task Completion</span>
          <span className="text-xs sm:text-sm font-bold text-gray-900">91%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '91%' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-6 sm:mb-8 animate-slide-down">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-gray-600 text-base sm:text-lg">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          change="+12% from last month"
          delay={0}
        />
        <StatCard
          title="Active Deals"
          value={stats.activeDeals}
          icon={Briefcase}
          color="bg-gradient-to-br from-green-500 to-green-600"
          change="+5% from last month"
          delay={100}
        />
        <StatCard
          title="Total Value"
          value={`$${stats.totalValue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          change="+8% from last month"
          delay={200}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          change="+2% from last month"
          delay={300}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        <div className="xl:col-span-2 space-y-6 sm:space-y-8">
          <RecentDeals />
          <ActivityChart />
        </div>
        <div className="xl:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
