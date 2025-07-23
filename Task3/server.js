require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { summarizeOrders } = require("./summarizeOrders");

const app = express();
const DB_PATH = process.env.DB_PATH || "./data.db";
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database(DB_PATH);

// Middleware: logging, CORS, JSON body parsing
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.use(express.json());

// GET /api/summary
app.get("/api/summary", (req, res) => {
  db.all("SELECT * FROM orders", (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(summarizeOrders(rows));
  });
});

// GET /api/orders
app.get("/api/orders", (req, res) => {
  let { product, limit, offset } = req.query;
  let params = [];
  let where = "";
  if (product) {
    where = "WHERE product LIKE ?";
    params.push(`%${product}%`);
  }
  let sql = `SELECT * FROM orders ${where} ORDER BY id DESC`;
  if (limit) {
    sql += " LIMIT ?";
    params.push(Number(limit));
  }
  if (offset) {
    sql += " OFFSET ?";
    params.push(Number(offset));
  }
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});

// POST /api/orders
app.post("/api/orders", (req, res) => {
  const { product, qty, price } = req.body;
  if (
    typeof product !== "string" ||
    !product.trim() ||
    typeof qty !== "number" ||
    qty <= 0 ||
    !Number.isInteger(qty) ||
    typeof price !== "number" ||
    price <= 0
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const sql = "INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)";
  db.run(sql, [product.trim(), qty, price], function (err) {
    if (err) return res.status(500).json({ error: "DB error" });
    db.get("SELECT * FROM orders WHERE id = ?", [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: "DB error" });
      res.status(201).json(row);
    });
  });
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Unexpected error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
