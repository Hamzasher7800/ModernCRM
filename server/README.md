# Modern CRM Server

A Node.js backend server for the Modern CRM system with authentication, API endpoints, and real-time data management.

## Features

- 🔐 **JWT Authentication** - Secure login and registration
- 🛡️ **Security** - Helmet, CORS, Rate limiting
- 📊 **CRM APIs** - Customers, Deals, Tasks, Dashboard stats
- 🚀 **Performance** - Optimized with proper middleware
- 📝 **Logging** - Morgan for request logging
- 🔄 **Hot Reload** - Nodemon for development

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env file with your configuration
   ```

3. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/profile` - Get user profile (protected)

### CRM Data

- `GET /api/dashboard/stats` - Dashboard statistics (protected)
- `GET /api/customers` - Get all customers (protected)
- `POST /api/customers` - Create new customer (protected)
- `GET /api/deals` - Get all deals (protected)
- `POST /api/deals` - Create new deal (protected)
- `GET /api/tasks` - Get all tasks (protected)
- `POST /api/tasks` - Create new task (protected)

### Health Check

- `GET /api/health` - Server health status

## Demo Credentials

- **Email:** `demo@moderncrm.com`
- **Password:** `demo123`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key-change-in-production` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` |

## Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **JWT Tokens** - Secure authentication
- **Password Hashing** - bcrypt for passwords

## Development

### Scripts

- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

### File Structure

```
server/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
├── env.example       # Environment template
└── README.md         # This file
```

## API Usage Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@moderncrm.com","password":"demo123"}'
```

### Get Dashboard Stats
```bash
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Customer
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","company":"Example Corp"}'
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper CORS origins
4. Set up a reverse proxy (nginx)
5. Use PM2 or similar for process management
6. Set up proper logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
