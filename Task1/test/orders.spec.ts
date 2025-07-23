import { expect } from "chai";
import { Order, Summary, summarizeOrders } from "../src/orders";

describe("summarizeOrders", () => {
  it("should return correct summary for typical case", () => {
    const orders: Order[] = [
      { id: 1, product: "A", qty: 3, price: 100 },
      { id: 2, product: "B", qty: 5, price: 200 },
      { id: 3, product: "A", qty: 2, price: 100 },
    ];

    const expectedSummary: Summary = {
      totalRevenue: 1500,
      medianOrderPrice: 300,
      topProductByQty: "A",
      uniqueProductCount: 2,
    };

    expect(summarizeOrders(orders)).to.deep.equal(expectedSummary);
  });

  it("should handle edge case of empty orders array", () => {
    const orders: Order[] = [];

    const expectedSummary: Summary = {
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: "",
      uniqueProductCount: 0,
    };

    expect(summarizeOrders(orders)).to.deep.equal(expectedSummary);
  });
});
