export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  source: string;
  createdAt: Date;
  lastContact: Date;
  notes: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed' | 'lost';
  probability: number;
  expectedCloseDate: Date;
  closeDate: Date;
  createdAt: Date;
  notes: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  customerId?: string;
  dealId?: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalCustomers: number;
  totalDeals: number;
  totalValue: number;
  activeDeals: number;
  thisMonthRevenue: number;
  conversionRate: number;
}
