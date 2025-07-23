import React from "react";

export default function OrderList({
  orders,
  loading,
  error,
  filter,
  setFilter,
  page,
  setPage,
  total,
  pageSize,
}) {
  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders.</div>;
  return (
    <div>
      <h2>Recent Orders</h2>
      <input
        placeholder="Filter by product name"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        style={{ marginBottom: 8 }}
      />
      <table border="1" cellPadding="6" style={{ width: "100%", marginTop: 8 }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={3}>No orders found.</td>
            </tr>
          ) : (
            orders.map((o, i) => (
              <tr key={i}>
                <td>{o.product}</td>
                <td>{o.qty}</td>
                <td>${o.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={{ marginTop: 8 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span style={{ margin: "0 8px" }}>
          Page {page} of {Math.ceil(total / pageSize) || 1}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * pageSize >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
}
