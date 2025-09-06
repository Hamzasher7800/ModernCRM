import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';
import { mockCustomers, mockDeals, mockTasks } from '../../data/mockData';

const Analytics: React.FC = () => {
  // Calculate analytics data
  const totalRevenue = mockDeals
    .filter(deal => deal.stage === 'closed')
    .reduce((sum, deal) => sum + deal.value, 0);

  const conversionRate = (mockDeals.filter(deal => deal.stage === 'closed').length / mockDeals.length) * 100;

  const averageDealSize = mockDeals.reduce((sum, deal) => sum + deal.value, 0) / mockDeals.length;

  const activeCustomers = mockCustomers.filter(customer => customer.status === 'active').length;

  const completedTasks = mockTasks.filter(task => task.status === 'completed').length;
  const totalTasks = mockTasks.length;
  const taskCompletionRate = (completedTasks / totalTasks) * 100;

  const StatCard = ({ title, value, icon: Icon, color, change }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    change?: string;
  }) => (
    <div className="stat-card-compact animate-slide-up group">
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

  const DealStageChart = () => (
    <div className="card animate-slide-up" style={{ animationDelay: '400ms' }}>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Deal Pipeline</h3>
      <div className="space-y-3 sm:space-y-4">
        {['lead', 'qualified', 'proposal', 'negotiation', 'closed', 'lost'].map((stage) => {
          const stageDeals = mockDeals.filter(deal => deal.stage === stage);
          const percentage = (stageDeals.length / mockDeals.length) * 100;
          const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
          
          return (
            <div key={stage} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary-600 rounded-full mr-2 sm:mr-3"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-900 capitalize">{stage}</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-xs sm:text-sm text-gray-600">{stageDeals.length} deals</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900">${totalValue.toLocaleString()}</span>
                <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-primary-600 h-1.5 sm:h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const CustomerSourceChart = () => {
    const sources = mockCustomers.reduce((acc, customer) => {
      acc[customer.source] = (acc[customer.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="card animate-slide-up" style={{ animationDelay: '600ms' }}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Customer Sources</h3>
        <div className="space-y-2 sm:space-y-3">
          {Object.entries(sources).map(([source, count]) => {
            const percentage = (count / mockCustomers.length) * 100;
            return (
              <div key={source} className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-gray-900">{source}</span>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm text-gray-600">{count} customers</span>
                  <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-secondary-600 h-1.5 sm:h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900">{percentage.toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const RecentActivity = () => (
    <div className="card animate-slide-up" style={{ animationDelay: '800ms' }}>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
      <div className="space-y-2 sm:space-y-3">
        {mockDeals.slice(0, 5).map((deal) => (
          <div key={deal.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-gray-400 mr-2 sm:mr-3" />
              <span className="text-xs sm:text-sm font-medium text-gray-900">{deal.title}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              deal.stage === 'closed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {deal.stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-6 sm:mb-8 animate-slide-down">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">Analytics</h1>
        <p className="text-gray-600 text-base sm:text-lg">Track your business performance and insights.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-green-500 to-green-600"
          change="+15% from last month"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          icon={Target}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          change="+2.5% from last month"
        />
        <StatCard
          title="Average Deal Size"
          value={`$${Math.round(averageDealSize).toLocaleString()}`}
          icon={BarChart3}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          change="+8% from last month"
        />
        <StatCard
          title="Active Customers"
          value={activeCustomers}
          icon={Users}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          change="+12% from last month"
        />
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <DealStageChart />
        <CustomerSourceChart />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="stat-card-compact animate-slide-up" style={{ animationDelay: '1000ms' }}>
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-3">
              <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-soft flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="ml-2 flex-1">
                <p className="text-xs font-medium text-gray-600">Task Completion</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center text-center">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-none mb-1">{taskCompletionRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="stat-card-compact animate-slide-up" style={{ animationDelay: '1100ms' }}>
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-3">
              <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-soft flex-shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="ml-2 flex-1">
                <p className="text-xs font-medium text-gray-600">Pipeline Value</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center text-center">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-none mb-1">
                ${mockDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card-compact animate-slide-up" style={{ animationDelay: '1200ms' }}>
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-3">
              <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-soft flex-shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="ml-2 flex-1">
                <p className="text-xs font-medium text-gray-600">Customer Growth</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center text-center">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-none mb-1">
                {Math.round((activeCustomers / mockCustomers.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="lg:col-span-2">
        <RecentActivity />
      </div>
    </div>
  );
};

export default Analytics;
