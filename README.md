# Modern CRM System

A comprehensive Customer Relationship Management system built with React, TypeScript, and Node.js. Features a modern, responsive design with smooth animations and a secure backend API.

## ✨ Features

### Frontend (React + TypeScript)
- 🎨 **Modern UI/UX** - Beautiful design with smooth animations and transitions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔐 **Authentication** - Secure login system with JWT tokens
- 📊 **Dashboard** - Real-time statistics and analytics
- 👥 **Customer Management** - Complete customer lifecycle management
- 💼 **Deal Pipeline** - Sales pipeline with stage tracking
- ✅ **Task Management** - Task tracking and assignment
- 📈 **Analytics** - Business insights and reporting
- 🎯 **Search & Filter** - Advanced search and filtering capabilities

### Backend (Node.js + Express)
- 🔐 **JWT Authentication** - Secure login and registration
- 🛡️ **Security** - Helmet, CORS, Rate limiting
- 📊 **RESTful APIs** - Complete CRM data management
- 🚀 **Performance** - Optimized with proper middleware
- 📝 **Logging** - Request logging and monitoring
- 🔄 **Hot Reload** - Nodemon for development

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env file with your configuration
   ```

4. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

The backend will run on `http://localhost:5000`

## 🔐 Authentication

### Demo Credentials
- **Email:** `demo@moderncrm.com`
- **Password:** `demo123`

### Features
- Secure JWT-based authentication
- Password hashing with bcrypt
- Session persistence
- Protected routes
- User profile management

## 🎨 Design Features

### Modern UI Elements
- **Glass Morphism** - Backdrop blur effects
- **Gradient Backgrounds** - Beautiful color transitions
- **Smooth Animations** - Staggered slide-up animations
- **Hover Effects** - Interactive scale transforms
- **Modern Typography** - Inter font with gradient text
- **Soft Shadows** - Contemporary shadow system

### Color Scheme
- **Primary:** Modern blue gradient (#0ea5e9 to #0284c7)
- **Secondary:** Purple gradient (#d946ef to #c026d3)
- **Success:** Green gradient (#22c55e to #16a34a)
- **Warning:** Orange gradient (#f59e0b to #d97706)
- **Danger:** Red gradient (#ef4444 to #dc2626)

## 📊 CRM Features

### Dashboard
- Real-time statistics
- Recent deals overview
- Quick action buttons
- Activity progress tracking
- Performance metrics

### Customer Management
- Customer profiles and details
- Contact information
- Status tracking (Active, Inactive, Prospect)
- Source attribution
- Last contact tracking

### Deal Pipeline
- Deal creation and management
- Stage progression tracking
- Value and probability tracking
- Customer association
- Close date management

### Task Management
- Task creation and assignment
- Priority levels (High, Medium, Low)
- Status tracking (Pending, In-Progress, Completed)
- Due date management
- Overdue task highlighting

## 🔧 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **date-fns** - Date manipulation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
modern-crm/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── Auth/          # Authentication components
│   │   ├── Dashboard/     # Dashboard components
│   │   ├── Customers/     # Customer management
│   │   ├── Deals/         # Deal management
│   │   ├── Tasks/         # Task management
│   │   ├── Analytics/     # Analytics components
│   │   └── Layout/        # Layout components
│   ├── contexts/          # React contexts
│   ├── data/              # Mock data
│   ├── types/             # TypeScript interfaces
│   └── App.tsx            # Main app component
├── server/                 # Backend server
│   ├── server.js          # Main server file
│   ├── package.json       # Server dependencies
│   ├── env.example        # Environment template
│   └── README.md          # Server documentation
├── public/                 # Static assets
├── package.json            # Frontend dependencies
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/profile` - Get user profile

### CRM Data
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `GET /api/deals` - Get all deals
- `POST /api/deals` - Create new deal
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for password security
- **CORS Protection** - Cross-origin request handling
- **Rate Limiting** - Prevent API abuse
- **Security Headers** - Helmet for security headers
- **Input Validation** - Request validation
- **Error Handling** - Proper error responses

## 🚀 Deployment

### Frontend
1. Build the project: `npm run build`
2. Deploy to your hosting service (Netlify, Vercel, etc.)

### Backend
1. Set environment variables
2. Install dependencies: `npm install`
3. Start production server: `npm start`
4. Use PM2 or similar for process management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

**Modern CRM System** - Built with ❤️ using modern web technologies
