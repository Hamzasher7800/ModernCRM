import React, { useState } from 'react';
import { Search, Plus, MoreVertical, DollarSign, TrendingUp, Eye, Calendar, UserCheck, FileText, CheckCircle, Target, Users } from 'lucide-react';
import { mockDeals } from '../../data/mockData';
import { format } from 'date-fns';

const DealsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getStageBadgeClass = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'badge-warning';
      case 'qualification':
        return 'badge-primary';
      case 'proposal':
        return 'badge-secondary';
      case 'negotiation':
        return 'badge-warning';
      case 'closed':
        return 'badge-success';
      default:
        return 'badge-primary';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return Target;
      case 'qualification':
        return UserCheck;
      case 'proposal':
        return FileText;
      case 'negotiation':
        return Users;
      case 'closed':
        return CheckCircle;
      default:
        return DollarSign;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'bg-gradient-to-br from-orange-500 to-orange-600';
      case 'qualification':
        return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'proposal':
        return 'bg-gradient-to-br from-purple-500 to-purple-600';
      case 'negotiation':
        return 'bg-gradient-to-br from-yellow-500 to-yellow-600';
      case 'closed':
        return 'bg-gradient-to-br from-green-500 to-green-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const pipelineSummary = {
    prospecting: mockDeals.filter(d => d.stage === 'prospecting').length,
    qualification: mockDeals.filter(d => d.stage === 'qualification').length,
    proposal: mockDeals.filter(d => d.stage === 'proposal').length,
    negotiation: mockDeals.filter(d => d.stage === 'negotiation').length,
    closed: mockDeals.filter(d => d.stage === 'closed').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-6 sm:mb-8 animate-slide-down">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">Deals</h1>
        <p className="text-gray-600 text-base sm:text-lg">Track and manage your sales pipeline.</p>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        {Object.entries(pipelineSummary).map(([stage, count], index) => {
          const StageIcon = getStageIcon(stage);
          const stageColor = getStageColor(stage);
          
          return (
            <div 
              key={stage}
              className="stat-card animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className={`p-2.5 sm:p-3 rounded-xl ${stageColor} shadow-soft group-hover:shadow-medium transition-all duration-300 flex-shrink-0`}>
                    <StageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 capitalize">{stage}</p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center text-center">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-none mb-1">{count}</p>
                  <p className="text-xs sm:text-sm text-gray-500">deals</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="card mb-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field-compact pl-8 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="input-field-compact flex-1"
            >
              <option value="all">All Stages</option>
              <option value="prospecting">Prospecting</option>
              <option value="qualification">Qualification</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed">Closed</option>
            </select>
            <button className="btn-primary-compact flex items-center justify-center py-2 px-3 text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              <span className="hidden sm:inline">New Deal</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="card animate-slide-up" style={{ animationDelay: '600ms' }}>
        <div className="table-container custom-scrollbar">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Deal</th>
                <th className="table-header-cell hidden md:table-cell">Customer</th>
                <th className="table-header-cell">Value</th>
                <th className="table-header-cell">Stage</th>
                <th className="table-header-cell hidden lg:table-cell">Close Date</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredDeals.map((deal, index) => (
                <tr 
                  key={deal.id} 
                  className="table-row"
                  style={{ animationDelay: `${700 + index * 50}ms` }}
                >
                  <td className="table-cell">
                    <div className="flex items-center min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft mr-3 sm:mr-4 flex-shrink-0">
                        <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{deal.title}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{deal.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell hidden md:table-cell">
                    <span className="text-sm sm:text-base text-gray-900 truncate">{deal.customerName}</span>
                  </td>
                  <td className="table-cell">
                    <p className="text-sm sm:text-lg font-bold text-gray-900">${deal.value.toLocaleString()}</p>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${getStageBadgeClass(deal.stage)}`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="table-cell hidden lg:table-cell">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm sm:text-base text-gray-600">{format(deal.closeDate, 'MMM dd, yyyy')}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-friendly deal cards for small screens */}
        <div className="md:hidden space-y-4 mt-6">
          {filteredDeals.map((deal, index) => (
            <div 
              key={deal.id}
              className="bg-gradient-to-r from-gray-50 to-primary-50 rounded-2xl p-4 hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft mr-3 flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-base truncate">{deal.title}</p>
                    <p className="text-sm text-gray-600 truncate">{deal.customerName}</p>
                  </div>
                </div>
                <span className={`badge ${getStageBadgeClass(deal.stage)}`}>
                  {deal.stage}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Value:</span>
                  <span className="text-lg font-bold text-gray-900">${deal.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Close: {format(deal.closeDate, 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500 truncate">{deal.description}</span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsList;

