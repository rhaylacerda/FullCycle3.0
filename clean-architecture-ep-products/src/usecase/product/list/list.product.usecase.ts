import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }
    

    async execute(): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return outputMapper.toOutput(products);
    }

}

class outputMapper {
    static toOutput(products: ProductInterface[]): OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        };
    }
}