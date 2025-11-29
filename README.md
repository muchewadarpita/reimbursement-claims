# Reimbursement Intelligence Module - Full Stack MVP

A production-ready full-stack application for healthcare reimbursement code intelligence and financial analysis.

## Features

### Code Intelligence Engine
- Browse and search procedure codes (CPT)
- View detailed payment information by site of service
- Visual comparison charts for reimbursement rates
- Support for IPPS, HOPD, ASC, and OBL payment sites

### Reimbursement Scenario Simulator
- Calculate financial outcomes for medical procedures
- Factor in device costs and NTAP add-on payments
- Visual breakdown of payments, costs, and margins
- Automatic classification: Profitable / Break-Even / Loss

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Testing**: Vitest

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── TabNav.tsx       # Navigation tabs
│   ├── CodeExplorer.tsx # Code listing and search
│   ├── CodeDetail.tsx   # Modal with code details
│   ├── PaymentChart.tsx # Bar chart visualization
│   ├── ReimbursementSimulator.tsx  # Scenario form
│   └── ScenarioResults.tsx         # Results display
├── services/            # Business logic
│   ├── codeService.ts   # API client for codes
│   └── reimbursementService.ts  # API client for scenarios
├── types/               # TypeScript definitions
└── App.tsx              # Root component
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Installation

#### Frontend

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

3. Run development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

5. Build for production:
```bash
npm run build
```

#### Backend

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

4. Seed the database:
```bash
npm run seed
```

5. Run the backend server:
```bash
npm run dev
```

The backend will start on `http://localhost:3001` and the frontend on `http://localhost:5173`.

For detailed backend documentation, see [backend/README.md](./backend/README.md).

## Classification Thresholds

The system uses the following thresholds for financial classification:

- **Profitable**: Margin ≥ $1,000
- **Break-Even**: Margin between -$500 and $1,000
- **Loss**: Margin < -$500

These thresholds are configurable in `src/services/reimbursementService.ts`.

## Database

The application uses MongoDB to store procedure codes and their payment information. The database is seeded with 6 sample procedure codes covering:

- Vascular Access (CPT 36903)
- Vascular Interventions (CPT 37236)
- Cardiac Procedures (CPT 33361)
- Cardiac Interventions (CPT 92928)
- Endoscopy (CPT 43235)
- Orthopedic (CPT 27447)

Payment values are illustrative and based on typical CMS reimbursement patterns.

To reseed the database, run:
```bash
cd backend
npm run seed
```

## Architecture Decisions

### Service Layer Pattern
Business logic is isolated in service modules. The frontend services make API calls to the backend, which handles all data operations and business logic.

### API Integration
The frontend communicates with the backend through RESTful APIs:
- `GET /api/codes` - List all codes
- `GET /api/codes/:code` - Get code details
- `GET /api/codes/search?q=query` - Search codes
- `POST /api/reimbursement/scenario` - Calculate reimbursement scenario

### Component Separation
UI components are kept small and focused. Complex components like charts and forms are separated for reusability.

### Type Safety
Comprehensive TypeScript types ensure data consistency and catch errors at compile time.

### State Management
Uses React's built-in state management. For larger applications, this architecture easily supports Redux or Zustand.

## Testing

The test suite covers:
- Reimbursement calculation logic (11 tests)
- Code service operations (7 tests)
- Classification threshold validation

Run tests with:
```bash
npm test
```

## API Endpoints

### Codes
- **GET** `/api/codes` - List all procedure codes
- **GET** `/api/codes/:code` - Get detailed information for a specific code
- **GET** `/api/codes/search?q=query` - Search codes by code or description

### Reimbursement
- **POST** `/api/reimbursement/scenario` - Calculate reimbursement scenario

See [backend/README.md](./backend/README.md) for detailed API documentation.

## Next Steps

### Additional Features
- Export results to PDF/Excel
- Historical scenario comparison
- Multi-code batch analysis
- Real-time CMS data integration
- Advanced filtering and sorting
- User authentication and authorization
- Audit logging for all calculations
- API rate limiting
- Caching layer (Redis)

## Code Quality

- ESLint configured for React and TypeScript
- Tailwind CSS for consistent styling
- Modular architecture with clear separation of concerns
- Comprehensive unit test coverage
- Production-ready build process

## Design Principles

- Clean, professional UI suitable for healthcare professionals
- Responsive design for desktop and tablet use
- Clear visual hierarchy and intuitive navigation
- Accessible color-coded status indicators
- Loading and error states handled gracefully
