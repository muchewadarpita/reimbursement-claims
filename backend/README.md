# Reimbursement Intelligence Backend API

Backend API for the Reimbursement Intelligence Module built with Node.js, Express, TypeScript, and MongoDB.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Testing**: Vitest

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB models
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic layer
│   ├── scripts/         # Utility scripts (seed, etc.)
│   └── server.ts        # Application entry point
├── dist/                # Compiled JavaScript (generated)
└── package.json
```

## Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)
- Access to the MongoDB connection string

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (or copy from `.env.example`):
```bash
PORT=3001
MONGODB_URI=mongodb+srv://muchewadarpita123_db_user:9ZvQiZnfqs9b9kmS@cluster0.tpgdpwo.mongodb.net/reimbursement_db?retryWrites=true&w=majority
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Seed the database with initial data:
```bash
npm run seed
```

## Running the Server

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3001` (or the port specified in `.env`).

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Health Check

- **GET** `/health`
  - Returns server status

### Codes

- **GET** `/api/codes`
  - List all procedure codes
  - Returns: `[{ code, description, category }]`

- **GET** `/api/codes/:code`
  - Get detailed information for a specific code
  - Returns: `{ code, description, category, payments: { IPPS, HOPD, ASC, OBL }, drg?, apc? }`

- **GET** `/api/codes/search?q=query`
  - Search codes by code or description
  - Query parameter: `q` (search term)
  - Returns: `[{ code, description, category }]`

### Reimbursement

- **POST** `/api/reimbursement/scenario`
  - Calculate reimbursement scenario
  - Request body:
    ```json
    {
      "code": "36903",
      "siteOfService": "HOPD",
      "deviceCost": 5800,
      "ntapAddOn": 3770
    }
    ```
  - Response:
    ```json
    {
      "basePayment": 11639,
      "addOnPayment": 3770,
      "totalPayment": 15409,
      "margin": 9609,
      "classification": "profitable"
    }
    ```

## Classification Thresholds

The reimbursement classification uses the following thresholds:

- **Profitable**: Margin ≥ $1,000
- **Break-Even**: Margin between -$500 and $1,000
- **Loss**: Margin < -$500

These thresholds are defined in `src/services/reimbursementService.ts` and can be adjusted as needed.

## Database Schema

### Code Model

```typescript
{
  code: string (unique, indexed)
  description: string (text indexed)
  category: string
  payments: {
    IPPS: number
    HOPD: number
    ASC: number
    OBL: number
  }
  drg?: string (optional)
  apc?: string (optional)
  createdAt: Date
  updatedAt: Date
}
```

## Testing

Run tests with:

```bash
npm test
```

Tests are located in `src/services/__tests__/` and cover core business logic like margin calculation and classification.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `NODE_ENV` | Environment (development/production) | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Architecture Decisions

### Separation of Concerns

- **Routes**: Handle HTTP requests/responses and validation
- **Services**: Contain business logic (calculations, data transformations)
- **Models**: Define data structure and database interactions

### Error Handling

- All routes use try-catch blocks
- Validation errors return 400 with details
- Not found errors return 404
- Server errors return 500 with generic message (detailed errors logged)

### Data Validation

- Request validation using Zod schemas
- Type-safe request/response handling with TypeScript

## Next Steps (Future Improvements)

1. **Authentication & Authorization**: Add user authentication and role-based access
2. **Rate Limiting**: Implement API rate limiting
3. **Caching**: Add Redis for frequently accessed codes
4. **Pagination**: Add pagination for code listings
5. **Advanced Search**: Implement full-text search with MongoDB Atlas Search
6. **Audit Logging**: Track all reimbursement calculations
7. **API Documentation**: Add Swagger/OpenAPI documentation
8. **Unit Tests**: Expand test coverage for routes and services
9. **Integration Tests**: Add end-to-end API tests
10. **Monitoring**: Add logging and monitoring (e.g., Winston, Sentry)

