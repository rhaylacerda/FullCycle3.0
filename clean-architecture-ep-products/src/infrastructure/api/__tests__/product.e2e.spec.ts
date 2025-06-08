import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product 1",
        price: 100,
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
    expect(response.body.id).toBeDefined();
  });

  it("should not create a product with invalid name", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "",
        price: 100,
      });

    expect(response.status).toBe(500);
  });

  it("should not create a product with invalid price", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product 1",
        price: -50,
      });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    await request(app).post("/product").send({
      type: "a",
      name: "Product 1",
      price: 100,
    });

    await request(app).post("/product").send({
      type: "a",
      name: "Product 2",
      price: 200,
    });

    const listResponse = await request(app).get("/product");

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product1 = listResponse.body.products[0];
    const product2 = listResponse.body.products[1];

    expect(product1.name).toBe("Product 1");
    expect(product1.price).toBe(100);

    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(200);
  });
});
