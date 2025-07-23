// Export Order and Summary types
export type Order = { id: number; product: string; qty: number; price: number };
export type Summary = {
  totalRevenue: number;
  medianOrderPrice: number;
  topProductByQty: string;
  uniqueProductCount: number;
};

// Function to summarize orders
export function summarizeOrders(orders: Order[]): Summary {
  if (orders.length === 0) {
    return {
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: "",
      uniqueProductCount: 0,
    };
  }

  // Compute totalRevenue and gather order totals for median computation
  const orderTotals = orders.map((o) => o.qty * o.price);
  const totalRevenue = orderTotals.reduce((sum, val) => sum + val, 0);

  // Compute medianOrderPrice
  const sortedTotals = [...orderTotals].sort((a, b) => a - b);
  const mid = Math.floor(sortedTotals.length / 2);
  const medianOrderPrice =
    sortedTotals.length % 2 === 0
      ? (sortedTotals[mid - 1] + sortedTotals[mid]) / 2
      : sortedTotals[mid];

  // Compute topProductByQty using quantities from orders
  const qtyByProduct: Record<string, number> = {};
  for (const o of orders) {
    qtyByProduct[o.product] = (qtyByProduct[o.product] || 0) + o.qty;
  }
  let topProductByQty = "";
  let maxQty = 0;
  for (const [product, qty] of Object.entries(qtyByProduct)) {
    if (qty > maxQty) {
      maxQty = qty;
      topProductByQty = product;
    }
  }

  // Compute uniqueProductCount as the number of different products
  const uniqueProductCount = Object.keys(qtyByProduct).length;

  return {
    totalRevenue,
    medianOrderPrice,
    topProductByQty,
    uniqueProductCount,
  };
}
