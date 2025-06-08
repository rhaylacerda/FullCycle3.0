import { v4 as uuid } from "uuid";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product(uuid(), "Product 1", 10);

const input = {
    id: product.id,
    name: "Product updated",
    price: 11,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test for product update use case", () =>{
    it ("Should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    })
});
