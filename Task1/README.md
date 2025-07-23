# Task 1 - Logic & Unit Testing

This folder contains the implementation and unit tests for the `summarizeOrders` function.

## How to Run

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open a terminal in this directory.
3. Install dependencies (if a `package.json` is present):

   ```
   npm install
   ```

4. Run the tests:

   ```
   npm test
   ```

> Adjust the filename above if your test file is named differently.

## What is Implemented

- `summarizeOrders(orders: Order[]): Summary` computes:
  - `totalRevenue`: sum of qty \* price for all orders
  - `medianOrderPrice`: median of all qty \* price values
  - `topProductByQty`: product with highest total qty
  - `uniqueProductCount`: number of distinct products
- Includes at least two unit tests for typical and edge cases.
