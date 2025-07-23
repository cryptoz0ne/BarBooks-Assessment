# Task3: API Endpoints

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Seed the database:

   ```
   node seed.js
   ```

3. Start the server:
   ```
   npm start
   ```

## API

- `GET /api/summary` — Returns summary of all orders.
- `GET /api/orders?product=Pen&limit=2&offset=0` — List orders, filter by product (partial match), with pagination.
- `POST /api/orders` — Add new order. Body: `{ "product": "Marker", "qty": 5, "price": 2.5 }`
