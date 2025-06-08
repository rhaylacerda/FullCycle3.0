import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product(uuid(), "Product 1", 10);
const product2 = new Product(uuid(), "Product 2", 11);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        update: jest.fn(),
    };
};

describe("Unit Test for list product use case", () => {
    it("Should list a product", async () => {
        const repository = MockRepository();
        const usecase = new ListProductUseCase(repository);
        const output = await usecase.execute();

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);

    });
});