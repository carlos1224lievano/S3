import { ProductRepository } from '../domain/ports/product-repository';

class DeleteProductUseCase {
  constructor(private poductRepository: ProductRepository) {}

  async execute(productId: string): Promise<boolean> {
    const result = await this.poductRepository.delete(productId);

    if (!result) {
      throw new Error(`No se pudo eliminar el producto con id: ${productId}`);
    }

    console.log(`Alsa de producto con id: ${productId} ha sido eliminado`);
    return result; // Devuelve un booleano
  }
}

export default DeleteProductUseCase;
