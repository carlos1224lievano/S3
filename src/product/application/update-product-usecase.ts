import { ProductRepository } from '../domain/ports/product-repository';
import { Product } from '../domain/product';

class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string, productPayload: Partial<Product>): Promise<Product> {
    const result = await this.productRepository.update(productId, productPayload);

    if (!result) {
      throw new Error(`Id: ${productId} producto no encontrado`);
    }

    return result;
  }
}

export default UpdateProductUseCase;
