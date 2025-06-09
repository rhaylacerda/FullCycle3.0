import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("ListProduct UseCase Integration Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const repository = new ProductRepository();
    const createUseCase = new CreateProductUseCase(repository);
    const listUseCase = new ListProductUseCase(repository);

    await createUseCase.execute({ name: "Product 1", price: 50 });
    await createUseCase.execute({ name: "Product 2", price: 75 });

    const output = await listUseCase.execute();

    expect(output.products.length).toBe(2);

    expect(output.products[0]).toEqual(
      expect.objectContaining({ name: "Product 1", price: 50 })
    );
    expect(output.products[1]).toEqual(
      expect.objectContaining({ name: "Product 2", price: 75 })
    );
  });
});
