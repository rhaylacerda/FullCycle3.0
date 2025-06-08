import CreateProductUseCase from "./create.product.usecase";

const input =  {
    type: "a",
    name: "Product 1",
    price: 10,
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {

    it("Should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        const input = {
            name: "Product 1",
            price: 10,
        };

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 10,
          };

        await expect(() => productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });
});


