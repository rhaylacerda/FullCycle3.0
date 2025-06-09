import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("UpdateProduct UseCase Integration Test", () => {
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

  it("should update a product", async () => {
    const repository = new ProductRepository();
    const createUseCase = new CreateProductUseCase(repository);
    const updateUseCase = new UpdateProductUseCase(repository);

    const created = await createUseCase.execute({
      name: "Old Product",
      price: 100,
    });

    const output = await updateUseCase.execute({
      id: created.id,
      name: "Updated Product",
      price: 150,
    });

    expect(output.id).toBe(created.id);
    expect(output.name).toBe("Updated Product");
    expect(output.price).toBe(150);
  });
});
