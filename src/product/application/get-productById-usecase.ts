import { ProductRepository } from "../domain/ports/product-repository";

export class GetProductByID {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(productId: string) {
    const product = await this.productRepository.getById(productId);

    if (!product) {
      throw new Error(`Id: ${productId} de publicacion no encontrada`); //Lanza el error
    }
    console.log(product);
    
    return product;
  }
  
}
