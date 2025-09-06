import React, { useState } from 'react';
import { Search, Plus, MoreVertical, CheckSquare, Calendar, User, Flag, ListTodo, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { mockTasks } from '../../data/mockData';
import { format } from 'date-fns';

const TasksList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'badge-danger';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-success';
      default:
        return 'badge-primary';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'in-progress':
        return 'badge-primary';
      case 'pending':
        return 'badge-warning';
      default:
        return 'badge-primary';
    }
  };

  const getStatIcon = (key: string) => {
    switch (key) {
      case 'total':
        return ListTodo;
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'overdue':
        return AlertTriangle;
      default:
        return ListTodo;
    }
  };

  const getStatColor = (key: string) => {
    switch (key) {
      case 'total':
        return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'completed':
        return 'bg-gradient-to-br from-green-500 to-green-600';
      case 'pending':
        return 'bg-gradient-to-br from-yellow-500 to-yellow-600';
      case 'overdue':
        return 'bg-gradient-to-br from-red-500 to-red-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const taskStats = {
    total: mockTasks.length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
    pending: mockTasks.filter(t => t.status === 'pending').length,
    overdue: mockTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-6 sm:mb-8 animate-slide-down">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">Tasks</h1>
        <p className="text-gray-600 text-base sm:text-lg">Organize and track your tasks and activities.</p>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {Object.entries(taskStats).map(([key, value], index) => {
          const StatIcon = getStatIcon(key);
          const statColor = getStatColor(key);
          
          return (
            <div 
              key={key}
              className="stat-card-compact animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <div className={`p-2 sm:p-2.5 rounded-lg ${statColor} shadow-soft group-hover:shadow-medium transition-all duration-300 flex-shrink-0`}>
                    <StatIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="ml-2 flex-1">
                    <p className="text-xs font-medium text-gray-600 capitalize">{key}</p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center text-center">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-none mb-1">{value}</p>
                  <p className="text-xs text-gray-500">tasks</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="card mb-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
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
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="input-field-compact flex-1"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="btn-primary-compact flex items-center justify-center py-2 px-3 text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="card animate-slide-up" style={{ animationDelay: '600ms' }}>
        <div className="table-container custom-scrollbar">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Task</th>
                <th className="table-header-cell hidden md:table-cell">Assigned To</th>
                <th className="table-header-cell">Priority</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell hidden lg:table-cell">Due Date</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredTasks.map((task, index) => (
                <tr 
                  key={task.id} 
                  className="table-row"
                  style={{ animationDelay: `${700 + index * 50}ms` }}
                >
                  <td className="table-cell">
                    <div className="flex items-center min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft mr-3 sm:mr-4 flex-shrink-0">
                        <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{task.title}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{task.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell hidden md:table-cell">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm sm:text-base text-gray-900 truncate">{task.assignedTo}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                      <Flag className="w-3 h-3 mr-1" />
                      {task.priority}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="table-cell hidden lg:table-cell">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className={`text-sm sm:text-base ${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-danger-600 font-semibold' : 'text-gray-600'}`}>
                        {format(task.dueDate, 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-success-600 hover:bg-success-50 rounded-xl transition-all duration-300">
                        <CheckSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                        <Calendar className="w-4 h-4" />
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

        {/* Mobile-friendly task cards for small screens */}
        <div className="md:hidden space-y-4 mt-6">
          {filteredTasks.map((task, index) => (
            <div 
              key={task.id}
              className="bg-gradient-to-r from-gray-50 to-primary-50 rounded-2xl p-4 hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft mr-3 flex-shrink-0">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-base truncate">{task.title}</p>
                    <p className="text-sm text-gray-600 truncate">{task.assignedTo}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                    <Flag className="w-3 h-3 mr-1" />
                    {task.priority}
                  </span>
                  <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className={new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-danger-600 font-semibold' : ''}>
                      Due: {format(task.dueDate, 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-success-600 hover:bg-success-50 rounded-xl transition-all duration-300">
                      <CheckSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                      <Calendar className="w-4 h-4" />
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

export default TasksList;

