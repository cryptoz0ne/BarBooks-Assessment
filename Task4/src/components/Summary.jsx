import React from "react";

export default function Summary({ data, loading, error }) {
  if (loading) return <div>Loading summary...</div>;
  if (error) return <div>Error loading summary.</div>;
  if (!data) return null;
  return (
    <div style={{ marginBottom: 24 }}>
      <h2>Summary</h2>
      <div>Total Revenue: ${data.totalRevenue}</div>
      <div>Median Order Price: ${data.medianOrderPrice}</div>
      <div>Top Product By Qty: {data.topProductByQty}</div>
    </div>
  );
}
