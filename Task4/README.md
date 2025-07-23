# Task 4 - Front-End Application

This folder contains a React application for the BarBooks Assessment Task 4.

## Features

- Fetches and displays summary data from `/api/summary`
- Lists recent orders from `/api/orders`
- Allows adding a new order (POST to `/api/orders`)
- Supports filtering orders by product name
- Supports pagination of orders

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:

   ```
   npm run dev
   ```

3. The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

- `src/` - React source code
- `src/hooks/` - Custom React hooks for data fetching
- `src/components/` - UI components

---

**Note:** Make sure the backend API is running and accessible at `/api`.
