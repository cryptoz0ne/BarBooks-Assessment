const request = require("supertest");
const { startServer } = require("./server.js");
const app = require("./server.js").default;

let server;

beforeAll(async () => {
  server = await startServer(0); // random available port
});

afterAll((done) => {
  server.close(done);
});

describe("POST /api/orders", () => {
  it("inserts and returns a valid order", async () => {
    const order = { product: "Test Product", qty: 2, price: 9.99 };
    const res = await request(app).post("/api/orders").send(order).expect(201);

    expect(res.body).toMatchObject(order);
    expect(res.body.id).toBeDefined();

    // Verify it is in the list
    const listRes = await request(app).get("/api/orders").expect(200);
    expect(listRes.body.some((o) => o.id === res.body.id)).toBe(true);
  });

  it("rejects invalid order", async () => {
    await request(app)
      .post("/api/orders")
      .send({ product: "", qty: 0, price: -1 })
      .expect(400);
  });
});
