# Quick Start Guide

This guide will help you get the full-stack application up and running quickly.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- MongoDB Atlas account (connection string provided)

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The .env file is already configured with MongoDB connection string
# If you need to modify it, edit backend/.env

# Seed the database with initial data
npm run seed

# Start the backend server (runs on port 3001)
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3001
```

### 2. Frontend Setup

Open a new terminal window:

```bash
# Navigate back to project root
cd ..

# Install dependencies (if not already done)
npm install

# Create .env file for frontend (if not exists)
echo "VITE_API_BASE_URL=http://localhost:3001/api" > .env

# Start the frontend development server (runs on port 5173)
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 3. Verify Everything Works

1. Open http://localhost:5173 in your browser
2. You should see the Code Explorer tab with a list of procedure codes
3. Try searching for a code (e.g., "stent")
4. Click "View Details" on any code to see payment information
5. Switch to the "Reimbursement Simulator" tab
6. Fill in the form and calculate a scenario

### 4. Test the API Directly

You can test the backend API directly:

```bash
# List all codes
curl http://localhost:3001/api/codes

# Get specific code
curl http://localhost:3001/api/codes/36903

# Search codes
curl "http://localhost:3001/api/codes/search?q=stent"

# Calculate scenario
curl -X POST http://localhost:3001/api/reimbursement/scenario \
  -H "Content-Type: application/json" \
  -d '{
    "code": "36903",
    "siteOfService": "HOPD",
    "deviceCost": 5800,
    "ntapAddOn": 3770
  }'
```

## Troubleshooting

### Backend won't start
- Check that MongoDB connection string is correct in `backend/.env`
- Ensure port 3001 is not already in use
- Check Node.js version: `node --version` (should be 18+)

### Frontend can't connect to backend
- Verify backend is running on port 3001
- Check `VITE_API_BASE_URL` in `.env` file
- Check browser console for CORS errors (backend CORS is configured for localhost:5173)

### Database connection issues
- Verify MongoDB connection string is correct
- Check internet connection (MongoDB Atlas requires internet)
- Try running seed script again: `cd backend && npm run seed`

### No codes showing in frontend
- Run the seed script: `cd backend && npm run seed`
- Check backend logs for errors
- Verify database connection in backend logs

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
# From project root
npm test
```

Note: Frontend tests may need updates to work with async API calls.

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
npm run build
# Output will be in dist/ directory
```

## Architecture Overview

```
┌─────────────┐         HTTP/REST          ┌─────────────┐
│   Frontend  │ ──────────────────────────> │   Backend   │
│  (React)    │ <────────────────────────── │  (Express)  │
│ Port 5173   │                             │  Port 3001  │
└─────────────┘                             └──────┬──────┘
                                                   │
                                                   │ MongoDB
                                                   │ (Atlas)
                                                   ▼
                                            ┌─────────────┐
                                            │  Database   │
                                            └─────────────┘
```

## Next Steps

- Review the main [README.md](./README.md) for detailed documentation
- Check [backend/README.md](./backend/README.md) for API documentation
- Explore the codebase to understand the architecture
- Add more procedure codes via the seed script or API

