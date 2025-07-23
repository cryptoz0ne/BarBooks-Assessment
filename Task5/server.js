// Convert to CommonJS syntax for compatibility with Jest

const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

let db;

async function initDb() {
  db = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });
  await db.exec(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `);
}

app.post("/api/orders", async (req, res) => {
  const { product, qty, price } = req.body;
  if (
    typeof product !== "string" ||
    !product.trim() ||
    typeof qty !== "number" ||
    qty < 1 ||
    typeof price !== "number" ||
    price < 0
  ) {
    return res.status(400).json({ error: "Invalid order data" });
  }
  const result = await db.run(
    "INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)",
    product,
    qty,
    price
  );
  const order = await db.get(
    "SELECT * FROM orders WHERE id = ?",
    result.lastID
  );
  res.status(201).json(order);
});

app.get("/api/orders", async (req, res) => {
  const orders = await db.all("SELECT * FROM orders ORDER BY id DESC");
  res.json(orders);
});

async function startServer(port = 3000) {
  await initDb();
  return new Promise((resolve) => {
    const server = app.listen(port, () => resolve(server));
  });
}

if (process.env.NODE_ENV !== "test") {
  startServer().then((server) => {
    console.log("Server running on http://localhost:3000");
  });
}

module.exports = { default: app, startServer };
