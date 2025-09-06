import React, { useState } from 'react';
import { Search, Plus, MoreVertical, User, Mail, Phone, Building } from 'lucide-react';
import { mockCustomers } from '../../data/mockData';
import { format } from 'date-fns';

const CustomersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'inactive':
        return 'badge-danger';
      case 'prospect':
        return 'badge-warning';
      default:
        return 'badge-primary';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-6 sm:mb-8 animate-slide-down">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">Customers</h1>
        <p className="text-gray-600 text-base sm:text-lg">Manage your customer relationships and contacts.</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field-compact pl-8 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field-compact flex-1"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospect</option>
            </select>
            <button className="btn-primary-compact flex items-center justify-center py-2 px-3 text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              <span className="hidden sm:inline">Add Customer</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card animate-slide-up" style={{ animationDelay: '400ms' }}>
        <div className="table-container custom-scrollbar">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Customer</th>
                <th className="table-header-cell hidden md:table-cell">Company</th>
                <th className="table-header-cell hidden lg:table-cell">Contact</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell hidden lg:table-cell">Last Contact</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredCustomers.map((customer, index) => (
                <tr 
                  key={customer.id} 
                  className="table-row"
                  style={{ animationDelay: `${500 + index * 50}ms` }}
                >
                  <td className="table-cell">
                    <div className="flex items-center min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft mr-3 sm:mr-4 flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{customer.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell hidden md:table-cell">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm sm:text-base text-gray-900 truncate">{customer.company}</span>
                    </div>
                  </td>
                  <td className="table-cell hidden lg:table-cell">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm sm:text-base text-gray-600">{customer.phone}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${getStatusBadgeClass(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="table-cell hidden lg:table-cell">
                    <span className="text-sm sm:text-base text-gray-600">
                      {format(customer.lastContact, 'MMM dd, yyyy')}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                        <Phone className="w-4 h-4" />
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

        {/* Mobile-friendly customer cards for small screens */}
        <div className="md:hidden space-y-4 mt-6">
          {filteredCustomers.map((customer, index) => (
            <div 
              key={customer.id}
              className="bg-gradient-to-r from-gray-50 to-primary-50 rounded-2xl p-4 hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft mr-3 flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-base truncate">{customer.name}</p>
                    <p className="text-sm text-gray-600 truncate">{customer.email}</p>
                  </div>
                </div>
                <span className={`badge ${getStatusBadgeClass(customer.status)}`}>
                  {customer.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="w-4 h-4 mr-2" />
                  <span className="truncate">{customer.company}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">
                    Last contact: {format(customer.lastContact, 'MMM dd, yyyy')}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                      <Phone className="w-4 h-4" />
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

export default CustomersList;
