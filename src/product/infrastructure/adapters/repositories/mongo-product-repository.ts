// infrastructure/mongo-publication-repository.ts
import { ProductRepository } from '../../../domain/ports/product-repository';
import { Product } from '../../../domain/product';
import { ProductModel } from '../../product-schema';

export class MongoProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const product = await ProductModel.find();
    return product.map(pub => new Product(pub.id, pub.title, pub.especific, pub.price, pub.image, pub.image_s3));
  }

  async getById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    return product ? new Product(product.id, product.title, product.especific, product.price, product.image, product.image_s3) : null;
  }

  async create(product : Product): Promise<Product> {
    const newProduct = new ProductModel(product);
    const savedProduct = await newProduct.save();
    return new Product(savedProduct.id, savedProduct.title, savedProduct.especific, savedProduct.price, savedProduct.image, savedProduct.image_s3);
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, { new: true });
    return updatedProduct ? new Product(updatedProduct.id, updatedProduct.title, updatedProduct.especific, updatedProduct.price, updatedProduct.image, updatedProduct.image_s3) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return result !== null;
  }
}
