import CreateProductUseCase from "../application/create-product-usecase";
import DeleteProductUseCase from "../application/delete-product-usecase";
import { GetProductByID } from "../application/get-productById-usecase";
import GetProductListUseCase from "../application/get-product-usecase";
import UpdateProductUseCase from "../application/update-product-usecase";
import ProductController from "./controllers/publication-controller";

import { RepositoryFactory } from "./adapters/repositories/repository-factory";

const productRepository = RepositoryFactory.createProductRepository();

export const getProductListUseCase = new GetProductListUseCase(
  productRepository
);

export const createProductUseCase = new CreateProductUseCase(
  productRepository
);

export const getProductById = new GetProductByID(
  productRepository
);

export const updateProduct = new UpdateProductUseCase(
  productRepository
);

export const deleteProduct = new DeleteProductUseCase(
  productRepository
);

export const productController = new ProductController(
  getProductListUseCase, 
  createProductUseCase, 
  getProductById, 
  updateProduct, 
  deleteProduct
);
