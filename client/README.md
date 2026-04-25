# E-Commerce Client (React + Vite)

Frontend for the e-commerce API with authentication, shop page, and analytics dashboard.

## Setup

1) Install dependencies:
```bash
npm install
```

2) Start dev server:
```bash
npm run dev
```

Server runs on `http://localhost:3000` with proxy to backend at `http://localhost:4000`.

## Pages
- `/login` — Login page
- `/register` — Registration page
- `/shop` — Shop (browse products, add to cart, checkout) [Protected]
- `/analytics` — Analytics dashboard (top products, revenue, sales) [Protected]

## Authentication Flow
1. User visits app → redirected to login
2. Can register new account or use demo account
3. Demo credentials:
   - Email: `demo@example.com`
   - Password: `demo123`
4. After login → access shop & analytics
5. Logout clears token from localStorage

## Build
```bash
npm run build
```
