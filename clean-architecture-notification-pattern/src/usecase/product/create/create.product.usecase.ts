import { v4 as uuid } from "uuid";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { inputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(input: inputCreateProductDto): Promise<OutputCreateProductDto>{
        const product = new Product(uuid(), input.name, input.price);

        await this.productRepository.create(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}