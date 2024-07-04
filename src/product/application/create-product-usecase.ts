import { ProductRepository } from '../domain/ports/product-repository';
import { Product } from '../domain/product';

class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(userPayload: Omit<Product, 'id' >): Promise<Product> {
    const publication = new Product(
      null, // En MongoDB, el ID se genera automáticamente
      userPayload.title,
      userPayload.especific,
      userPayload.price,
      userPayload.image,
      userPayload.image_s3
    );

    return this.productRepository.create(publication);
  }
}

export default CreateProductUseCase;
