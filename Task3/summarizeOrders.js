function summarizeOrders(orders) {
  if (!orders.length) {
    return {
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: "",
      uniqueProductCount: 0,
    };
  }

  const orderTotals = orders.map((o) => o.qty * o.price);
  const totalRevenue = orderTotals.reduce((sum, val) => sum + val, 0);

  const sortedTotals = [...orderTotals].sort((a, b) => a - b);
  const mid = Math.floor(sortedTotals.length / 2);
  let medianOrderPrice;
  if (sortedTotals.length % 2 === 0) {
    medianOrderPrice = (sortedTotals[mid - 1] + sortedTotals[mid]) / 2;
  } else {
    medianOrderPrice = sortedTotals[mid];
  }

  const qtyByProduct = {};
  for (const o of orders) {
    qtyByProduct[o.product] = (qtyByProduct[o.product] || 0) + o.qty;
  }
  let topProductByQty = "";
  let maxQty = -Infinity;
  for (const [product, qty] of Object.entries(qtyByProduct)) {
    if (qty > maxQty) {
      maxQty = qty;
      topProductByQty = product;
    }
  }

  const uniqueProductCount = Object.keys(qtyByProduct).length;

  return {
    totalRevenue,
    medianOrderPrice,
    topProductByQty,
    uniqueProductCount,
  };
}

module.exports = { summarizeOrders };
