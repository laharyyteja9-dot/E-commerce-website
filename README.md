# E-Commerce Order & Recommendation System

Backend demo for MongoDB data modeling, aggregations, indexing, and basic APIs.

## Requirements
- Node.js 18+
- MongoDB (local or Atlas)

## Setup
1) Install dependencies:

```bash
npm install
```

2) Create `.env` from `.env.example` and update the connection string if needed.

3) Seed sample data:

```bash
npm run seed
```

4) Create indexes:

```bash
npm run indexes
```

5) Start both backend + frontend (single terminal):

```bash
npm run dev
```

- Backend API runs on `http://localhost:4000`
- Frontend runs on `http://localhost:3000`

Or, start them separately:

```bash
npm run dev:server  # Backend only on :4000
npm run dev:client  # Frontend only on :3000
```

## API Endpoints
- `GET /health`
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user returns JWT token
- `GET /api/auth/me` — Get current user (protected)
- `GET /api/users`
- `GET /api/products`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/recommendations/:userId`
- `GET /api/analytics/top-products`
- `GET /api/analytics/sales-by-day`
- `GET /api/analytics/revenue-by-category`

## Test Credentials
Demo account (already seeded):
- Email: `demo@example.com`
- Password: `demo123`

Test account:
- Email: `test@example.com`
- Password: `test123`

## Sample Request
```bash
curl http://localhost:4000/api/analytics/top-products
```

## Notes
- Aggregation pipelines are defined in the analytics controller.
- Orders embed items but reference users and products (hybrid model).
