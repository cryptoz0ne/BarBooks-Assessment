const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    )
  `);

  const stmt = db.prepare(
    "INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)"
  );

  const mockOrders = [
    ["Book", 3, 12.99],
    ["Pen", 10, 1.5],
    ["Notebook", 5, 4.25],
    ["Pencil", 20, 0.99],
    ["Eraser", 7, 0.75],
    // Add more if desired
  ];

  for (const [product, qty, price] of mockOrders) {
    stmt.run(product, qty, price);
  }

  stmt.finalize();
});

db.close();
