import { Customer, Deal, Task, DashboardStats } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1-555-0123',
    company: 'Acme Corp',
    status: 'active',
    source: 'Website',
    createdAt: new Date('2024-01-15'),
    lastContact: new Date('2024-03-10'),
    notes: 'Interested in enterprise solution'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@techstart.com',
    phone: '+1-555-0456',
    company: 'TechStart Inc',
    status: 'prospect',
    source: 'LinkedIn',
    createdAt: new Date('2024-02-20'),
    lastContact: new Date('2024-03-08'),
    notes: 'Looking for CRM solution'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.w@globaltech.com',
    phone: '+1-555-0789',
    company: 'GlobalTech Solutions',
    status: 'active',
    source: 'Referral',
    createdAt: new Date('2024-01-30'),
    lastContact: new Date('2024-03-12'),
    notes: 'Current customer, very satisfied'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@innovate.com',
    phone: '+1-555-0321',
    company: 'Innovate Labs',
    status: 'inactive',
    source: 'Trade Show',
    createdAt: new Date('2024-02-10'),
    lastContact: new Date('2024-02-28'),
    notes: 'Budget constraints'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.b@megacorp.com',
    phone: '+1-555-0654',
    company: 'MegaCorp Industries',
    status: 'active',
    source: 'Cold Call',
    createdAt: new Date('2024-03-01'),
    lastContact: new Date('2024-03-15'),
    notes: 'Enterprise deal in progress'
  }
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Acme Corp Enterprise License',
    description: 'Enterprise software license for 500 users',
    customerId: '1',
    customerName: 'John Smith',
    value: 50000,
    stage: 'negotiation',
    probability: 75,
    expectedCloseDate: new Date('2024-04-15'),
    closeDate: new Date('2024-04-15'),
    createdAt: new Date('2024-02-01'),
    notes: 'Final contract review in progress'
  },
  {
    id: '2',
    title: 'TechStart CRM Implementation',
    description: 'Complete CRM system implementation and training',
    customerId: '2',
    customerName: 'Sarah Johnson',
    value: 25000,
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: new Date('2024-04-30'),
    closeDate: new Date('2024-04-30'),
    createdAt: new Date('2024-03-01'),
    notes: 'Proposal sent, waiting for feedback'
  },
  {
    id: '3',
    title: 'GlobalTech Support Renewal',
    description: 'Annual support and maintenance renewal',
    customerId: '3',
    customerName: 'Mike Wilson',
    value: 15000,
    stage: 'closed',
    probability: 100,
    expectedCloseDate: new Date('2024-03-01'),
    closeDate: new Date('2024-03-01'),
    createdAt: new Date('2024-02-15'),
    notes: 'Successfully closed'
  },
  {
    id: '4',
    title: 'MegaCorp Multi-Year Contract',
    description: 'Multi-year enterprise contract with custom features',
    customerId: '5',
    customerName: 'David Brown',
    value: 100000,
    stage: 'qualification',
    probability: 40,
    expectedCloseDate: new Date('2024-06-30'),
    closeDate: new Date('2024-06-30'),
    createdAt: new Date('2024-03-05'),
    notes: 'Initial meeting completed'
  },
  {
    id: '5',
    title: 'Innovate Labs Pilot Program',
    description: 'Pilot program for new product line',
    customerId: '4',
    customerName: 'Emily Davis',
    value: 5000,
    stage: 'prospecting',
    probability: 20,
    expectedCloseDate: new Date('2024-05-15'),
    closeDate: new Date('2024-05-15'),
    createdAt: new Date('2024-03-10'),
    notes: 'Initial contact made'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with Acme Corp',
    description: 'Call John to discuss contract terms',
    customerId: '1',
    dealId: '1',
    dueDate: new Date('2024-03-20'),
    priority: 'high',
    status: 'pending',
    assignedTo: 'Sales Team',
    createdAt: new Date('2024-03-15')
  },
  {
    id: '2',
    title: 'Prepare TechStart proposal',
    description: 'Create detailed proposal for TechStart CRM implementation',
    customerId: '2',
    dealId: '2',
    dueDate: new Date('2024-03-18'),
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Sales Team',
    createdAt: new Date('2024-03-10')
  },
  {
    id: '3',
    title: 'Schedule MegaCorp demo',
    description: 'Arrange product demonstration for MegaCorp team',
    customerId: '5',
    dealId: '4',
    dueDate: new Date('2024-03-25'),
    priority: 'medium',
    status: 'pending',
    assignedTo: 'Sales Team',
    createdAt: new Date('2024-03-12')
  }
];

export const mockDashboardStats: DashboardStats = {
  totalCustomers: 5,
  totalDeals: 5,
  totalValue: 195000,
  activeDeals: 4,
  thisMonthRevenue: 15000,
  conversionRate: 25
};
