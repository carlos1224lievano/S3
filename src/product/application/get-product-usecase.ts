import { Product } from '../domain/product';
import {ProductRepository} from '../domain/ports/product-repository';

class GetProductListUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}

export default GetProductListUseCase;
