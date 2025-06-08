import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductInterface from "../../../domain/product/entity/product.interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}
