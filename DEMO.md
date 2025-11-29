# 🎬 Demo Guide - 10-15 Minute Walkthrough

## Overview
This guide helps you deliver a compelling 10-15 minute demo of the Reimbursement Intelligence Module.

---

## 📐 Architecture Overview (2 minutes)

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Code Explorer│  │  Simulator   │  │ Code Detail  │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                  │                  │         │
│         └──────────────────┼──────────────────┘         │
│                            │                            │
│                    ┌───────▼────────┐                   │
│                    │  API Services  │                   │
│                    └───────┬────────┘                   │
└────────────────────────────┼────────────────────────────┘
                             │
                    HTTP/REST API
                             │
┌────────────────────────────┼────────────────────────────┐
│                    Backend (Express)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Routes     │  │   Services   │  │    Models    │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                  │                  │         │
│         └──────────────────┼──────────────────┘         │
│                            │                            │
│                    ┌───────▼────────┐                   │
│                    │   MongoDB      │                   │
│                    │   (Atlas)      │                   │
│                    └────────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

### Key Architecture Decisions

1. **Separation of Concerns**
   - Routes handle HTTP only
   - Services contain business logic
   - Models define data structure

2. **Type Safety**
   - TypeScript throughout
   - Zod validation for API inputs
   - Type-safe request/response handling

3. **Scalability**
   - MongoDB schema supports future expansion
   - Service layer allows easy business logic changes
   - Component-based UI for reusability

---

## 🗄️ Data Model (1 minute)

### Code Schema
```typescript
{
  code: string (unique, indexed)
  description: string (text indexed for search)
  category: string
  payments: {
    IPPS: number    // Inpatient
    HOPD: number    // Hospital Outpatient
    ASC: number     // Ambulatory Surgery Center
    OBL: number     // Office-Based Lab
  }
  drg?: string      // Optional DRG code
  apc?: string      // Optional APC code
  createdAt: Date
  updatedAt: Date
}
```

### Why This Structure?
- **Extensible**: Easy to add more payment sites
- **Searchable**: Text indexes for fast search
- **Flexible**: Optional fields for future CMS data integration

---

## 🚀 Live Demo Walkthrough (8-10 minutes)

### Part 1: Code Explorer (3 minutes)

**Step 1: Show Code Listing**
1. Navigate to Code Explorer tab
2. Point out:
   - Clean table layout
   - All codes loaded from MongoDB
   - Professional black/white design

**Step 2: Demonstrate Search**
1. Type "stent" in search box
2. Show real-time filtering
3. Explain: "Search hits both code numbers and descriptions via MongoDB regex"

**Step 3: Show Code Detail**
1. Click "View Details" on any code
2. Highlight:
   - Modal with full code information
   - **Bar chart** comparing payments across sites
   - Payment breakdown table
   - DRG/APC codes if available

**Key Talking Points:**
- "All data comes from MongoDB, not hardcoded"
- "Search is server-side for scalability"
- "Chart visualizes payment differences across sites"

---

### Part 2: Reimbursement Simulator (5 minutes)

**Step 1: Fill Out Form**
1. Select a procedure code (e.g., "36903")
2. Choose site of service (e.g., "HOPD")
3. Enter device cost (e.g., "5800")
4. Optionally add NTAP add-on (e.g., "3770")

**Step 2: Calculate Scenario**
1. Click "Calculate" button
2. Show loading state
3. Display results

**Step 3: Explain Results**
1. **Base Payment**: From code/site lookup
2. **Add-On Payment**: NTAP amount
3. **Total Payment**: Base + Add-on
4. **Margin**: Total - Device Cost
5. **Classification**: 
   - Profitable (≥ $1,000)
   - Break-Even (-$500 to $1,000)
   - Loss (< -$500)

**Step 4: Show Charts**
1. Point out **mini charts** in results:
   - Total Payment bar
   - Device Cost bar
   - Margin bar
2. Explain visual comparison

**Key Talking Points:**
- "Business logic is in the service layer, not routes"
- "Classification thresholds are configurable"
- "All calculations are tested with unit tests"

---

### Part 3: API Walkthrough (2 minutes)

**Show Backend Running:**
```bash
cd backend
npm run dev
```

**Demonstrate API Endpoints:**

1. **List Codes**
   ```bash
   curl http://localhost:3001/api/codes
   ```
   - Show JSON response
   - Explain: "Returns all codes with code, description, category"

2. **Get Code Detail**
   ```bash
   curl http://localhost:3001/api/codes/36903
   ```
   - Show full code object with payments
   - Explain: "Includes all payment sites and optional fields"

3. **Search Codes**
   ```bash
   curl "http://localhost:3001/api/codes/search?q=stent"
   ```
   - Show filtered results
   - Explain: "Server-side search for scalability"

4. **Calculate Scenario**
   ```bash
   curl -X POST http://localhost:3001/api/reimbursement/scenario \
     -H "Content-Type: application/json" \
     -d '{
       "code": "36903",
       "siteOfService": "HOPD",
       "deviceCost": 5800,
       "ntapAddOn": 3770
     }'
   ```
   - Show calculation result
   - Explain: "Business logic calculates margin and classification"

**Key Talking Points:**
- "RESTful API design"
- "Zod validation ensures data integrity"
- "Error handling returns appropriate HTTP status codes"

---

## 💡 Key Decisions & Trade-offs (2 minutes)

### 1. MongoDB vs PostgreSQL
**Decision**: MongoDB
**Why**: 
- Flexible schema for healthcare codes
- Easy cloud deployment (Atlas)
- JSON-like structure matches data format
- Fast to prototype and iterate

**Trade-off**: Less relational integrity, but acceptable for this use case

### 2. Service Layer Pattern
**Decision**: Separate services from routes
**Why**:
- Business logic reusable
- Easy to test
- Routes stay thin

**Trade-off**: Slightly more files, but much cleaner architecture

### 3. TypeScript Throughout
**Decision**: Full TypeScript
**Why**:
- Type safety catches errors early
- Better IDE support
- Self-documenting code

**Trade-off**: Slightly more verbose, but worth it for maintainability

### 4. Black/White Color Scheme
**Decision**: Minimal monochrome design
**Why**:
- Professional appearance
- Not distracting
- Works for healthcare domain

**Trade-off**: Less colorful, but more professional

---

## 🔮 What I'd Improve Next (1-2 minutes)

### If Given Another 48 Hours:

1. **Authentication & Authorization** (4 hours)
   - JWT tokens
   - User roles
   - Protected routes

2. **More Comprehensive Testing** (3 hours)
   - Integration tests for API
   - Frontend component tests
   - E2E tests with Playwright

3. **Enhanced Search** (2 hours)
   - Full-text search with MongoDB Atlas Search
   - Advanced filtering (by category, payment range)
   - Sorting options

4. **Data Export** (2 hours)
   - Export results to CSV/PDF
   - Print-friendly views
   - Shareable scenario links

5. **Performance Optimizations** (2 hours)
   - Caching layer (Redis)
   - API response pagination
   - Lazy loading for large datasets

6. **Deployment** (1 hour)
   - Deploy to Vercel (frontend)
   - Deploy to Railway/Render (backend)
   - CI/CD pipeline

**Total**: ~14 hours of improvements

---

## 🎯 Demo Tips

### Do's ✅
- **Start with architecture** - Shows you think about design
- **Demonstrate search** - Shows real functionality
- **Show error handling** - Enter invalid data, show error messages
- **Explain decisions** - Shows thought process
- **Be confident** - You built something impressive!

### Don'ts ❌
- Don't rush through features
- Don't skip the architecture explanation
- Don't ignore error states
- Don't forget to mention tests

### Time Breakdown
- Architecture: 2 min
- Data Model: 1 min
- Code Explorer: 3 min
- Simulator: 5 min
- API Demo: 2 min
- Decisions: 2 min
- Improvements: 1-2 min
- **Total**: ~15 minutes

---

## 📝 Quick Reference

### Key URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- API Base: http://localhost:3001/api

### Key Endpoints
- `GET /api/codes` - List codes
- `GET /api/codes/:code` - Code detail
- `GET /api/codes/search?q=query` - Search
- `POST /api/reimbursement/scenario` - Calculate

### Test Commands
```bash
# Backend tests
cd backend && npm test

# Frontend tests
npm test
```

---

## ✅ You're Ready!

This project demonstrates:
- ✅ Full-stack capability
- ✅ Clean architecture
- ✅ Professional code quality
- ✅ Problem-solving skills
- ✅ Modern tech stack knowledge

**Be confident and show your work!** 🚀

