# Annotex Backend

Production-ready backend for the Annotex data labeling platform built with Node.js, TypeScript, Express, and PostgreSQL.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 📊 **Database** - PostgreSQL with Prisma ORM for robust data management
- 🔄 **Real-time Validation** - Automated majority voting and consensus algorithms
- ⛓️ **Blockchain Integration** - Solana devnet wallet connection and payment processing
- 📈 **Analytics Dashboard** - Comprehensive metrics and performance tracking
- 📝 **API Documentation** - Interactive Swagger/OpenAPI documentation
- 🛡️ **Security** - Helmet, rate limiting, CORS, input validation
- 📦 **File Upload** - Multer integration for dataset uploads
- 🔍 **Logging** - Winston for structured logging
- ✅ **Testing** - Jest for unit and integration tests

## Tech Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Blockchain**: Solana Pay + @solana/web3.js for Solana devnet integration
- **File Upload**: Multer
- **Validation**: Express-validator
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Testing**: Jest & Supertest

## Project Structure

```
backend/
├── src/
│   ├── __tests__/       # Test files with fixtures
│   ├── config/          # Configuration (database, logging, etc.)
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Custom middleware (auth, validation, etc.)
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic (Prisma queries)
│   ├── types/           # TypeScript types & interfaces
│   ├── utils/           # Utility functions
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
│   └── prisma/          # Prisma schema & migrations
├── logs/                # Application logs
├── uploads/             # Uploaded files
├── .env.example         # Environment variables template
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js >= 20.19.0
- PostgreSQL >= 13
- Redis (optional, for queue management)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env
```

3. Configure your `.env` file with your database credentials and other settings.

4. Run database migrations:

```bash
npm run prisma:deploy
```

5. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Build for Production

```bash
npm run build
npm start
```

## API Documentation

Once the server is running, visit:

- Swagger UI: `http://localhost:5000/api-docs`
- Health Check: `http://localhost:5000/health`

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user profile

### Users

- `GET /api/v1/users` - Get all users (Admin)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user profile
- `GET /api/v1/users/:id/stats` - Get user statistics

### Tasks

- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/tasks` - Create task (Admin)
- `GET /api/v1/tasks/:id` - Get task by ID
- `POST /api/v1/tasks/:id/assign` - Assign task

### Datasets

- `GET /api/v1/datasets` - Get all datasets
- `POST /api/v1/datasets` - Upload dataset (Admin)
- `GET /api/v1/datasets/:id` - Get dataset by ID
- `DELETE /api/v1/datasets/:id` - Delete dataset (Admin)

### Labels

- `POST /api/v1/labels` - Submit label
- `GET /api/v1/labels/:id` - Get label by ID
- `GET /api/v1/labels/task/:taskId` - Get task labels

### Analytics

- `GET /api/v1/analytics/dashboard` - Dashboard stats (Admin)
- `GET /api/v1/analytics/user-performance` - User performance
- `GET /api/v1/analytics/quality-metrics` - Quality metrics (Admin)

### Blockchain

- `POST /api/v1/blockchain/connect-wallet` - Connect wallet
- `POST /api/v1/blockchain/payout` - Process payout (Admin)
- `GET /api/v1/blockchain/transactions` - Get transactions
- `GET /api/v1/blockchain/transactions/:id` - Get transaction by ID

## Environment Variables

See `.env.example` for all available configuration options.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

## Security

- Helmet for security headers
- CORS configuration
- Rate limiting
- JWT authentication
- Bcrypt password hashing
- Input validation
- SQL injection protection through Prisma's parameterized queries

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
