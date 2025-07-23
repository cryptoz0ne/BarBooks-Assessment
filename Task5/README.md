# Task 5 - API Integration Test

This folder contains an Express API with an in-memory SQLite database and integration tests for the BarBooks Assessment Task 5.

## Features

- Express API with endpoints:
  - `POST /api/orders` - Add a new order
  - `GET /api/orders` - List all orders
- Uses in-memory SQLite for fast, isolated testing
- Integration tests using Jest and Supertest

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Run the integration tests:

   ```
   npm test
   ```

3. To start the API server:

   ```
   npm start
   ```

   The server will run at [http://localhost:3000](http://localhost:3000).

---

**Note:** The integration test verifies that a valid order can be inserted and retrieved, and that invalid orders are rejected.
