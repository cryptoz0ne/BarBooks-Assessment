# BarBooks Assessment

JS Full-Stack Developer Take-Home Test  
Date: Jan 6, 2025

## Tech Stack

- **Backend:** Node.js, Express, SQLite
- **Frontend:** React (Vite) with JavaScript or TypeScript
- **Testing:** Jest, Supertest
- **Config:** `.env` for settings

---

## Tasks Overview

### Task 1: Logic & Unit Testing

- Implement `summarizeOrders(orders: Order[]): Summary`
- Computes:
  - `totalRevenue`: sum of qty \* price
  - `medianOrderPrice`: median of all qty \* price values
  - `topProductByQty`: product with highest total qty
  - `uniqueProductCount`: number of distinct products
- Includes at least two unit tests (typical and edge cases)

### Task 2: Database Schema & Mock Data

- SQLite schema: `orders` table
- Seed script to insert at least 5 diverse orders

### Task 3: API Endpoints

- Loads config from `.env`
- Middleware: request logging, CORS
- Endpoints:
  - `GET /api/summary`: returns summary
  - `GET /api/orders`: supports filtering and pagination
  - `POST /api/orders`: validates and inserts new order
- Error handling for invalid input and DB errors

### Task 4: Front-End Application

- React app with:
  - Summary display
  - Orders list (with filter and pagination)
  - Form to add new order
- Uses custom hooks for data fetching

### Task 5: Integration Test

- Integration test for `POST /api/orders` using Supertest and in-memory SQLite

---

## How to Run

See each task's folder for specific instructions:

- **Task1:** Logic and unit tests (`Task1/README.md`)
- **Task2:** Database schema and seed script
- **Task3:** API server (`Task3/README.md`)
- **Task4:** React front-end (`Task4/README.md`)
- **Task5:** Integration test (`Task5/README.md`)

---

## Repository

https://github.com/cryptoz0ne/BarBooks-Assessment
