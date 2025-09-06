const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Mock database (in production, use a real database)
let users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@moderncrm.com',
    password: bcrypt.hashSync('demo123', 10),
    role: 'Administrator',
    avatar: 'D',
    createdAt: new Date()
  }
];

let customers = [
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
  }
];

let deals = [
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
  }
];

let tasks = [
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
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Modern CRM Server is running',
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: 'User',
      avatar: name.charAt(0).toUpperCase(),
      createdAt: new Date()
    };

    users.push(newUser);

    // Generate token
    const token = jwt.sign(
      { 
        id: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      user: userWithoutPassword,
      token,
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected routes
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// CRM Data routes
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  const stats = {
    totalCustomers: customers.length,
    totalDeals: deals.length,
    totalValue: deals.reduce((sum, deal) => sum + deal.value, 0),
    activeDeals: deals.filter(deal => deal.stage !== 'closed').length,
    thisMonthRevenue: 15000,
    conversionRate: 25
  };
  
  res.json(stats);
});

app.get('/api/customers', authenticateToken, (req, res) => {
  res.json(customers);
});

app.post('/api/customers', authenticateToken, (req, res) => {
  const newCustomer = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date(),
    lastContact: new Date()
  };
  
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.get('/api/deals', authenticateToken, (req, res) => {
  res.json(deals);
});

app.post('/api/deals', authenticateToken, (req, res) => {
  const newDeal = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  
  deals.push(newDeal);
  res.status(201).json(newDeal);
});

app.get('/api/tasks', authenticateToken, (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', authenticateToken, (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Modern CRM Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Demo credentials: demo@moderncrm.com / demo123`);
});
