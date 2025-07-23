import React, { useState } from "react";

export default function NewOrderForm({ onSuccess }) {
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, qty: Number(qty), price: Number(price) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add order");
        return res.json();
      })
      .then(() => {
        setProduct("");
        setQty("");
        setPrice("");
        onSuccess();
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24, marginBottom: 24 }}>
      <h2>Add New Order</h2>
      <div>
        <input
          placeholder="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <input
          placeholder="Qty"
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          required
          min={1}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min={0}
          step="0.01"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
