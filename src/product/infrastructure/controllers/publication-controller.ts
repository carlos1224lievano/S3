// publication-controller.ts
import { Request, Response, NextFunction } from 'express';
import CreateProductUseCase from '../../application/create-product-usecase';
import GetProductListUseCase from '../../application/get-product-usecase';
import { GetProductByID } from '../../application/get-productById-usecase';
import UpdateProductUseCase from '../../application/update-product-usecase';
import DeleteProductUseCase from '../../application/delete-product-usecase';
import { LocalFileStorage } from '../adapters/storages/local-file-storage';
import { S3FileStorage } from '../adapters/storages/s3-file-storage';


const localFileStorage = new LocalFileStorage();
const s3FileStorage = new S3FileStorage();


class ProductController {
  constructor(
    private getProductListUseCase: GetProductListUseCase,
    private createProductUseCase: CreateProductUseCase,
    private getProductByID: GetProductByID,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const productPayload = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).send('No file uploaded');
      }

      // Guardar archivo localmente
      const localFilePath = await localFileStorage.uploadFile(file);

      // Subir imagen a S3
      const s3FilePath = await s3FileStorage.uploadFile(file);

      const productData = { ...productPayload, image: localFilePath, image_s3: s3FilePath };
      const product = await this.createProductUseCase.execute(productData);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Producto creado :)")
      }
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await this.getProductListUseCase.execute();
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await this.getProductByID.run(req.params.id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const productId = req.params.id;
      const productPayload = req.body;
      const file = req.file;

      // Obtener la publicación existente
      const existingProduct = await this.getProductByID.run(productId);
      if (!existingProduct) {
        return res.status(404).send('Prduct don´t wanted');
      }

      // Eliminar imagen antigua si existe una nueva
      if (file) {
        await localFileStorage.deleteFile(existingProduct.image);
        await s3FileStorage.deleteFile(existingProduct.image_s3);

        // Guardar archivo localmente
        const localFilePath = await localFileStorage.uploadFile(file);

        // Subir imagen a S3
        const s3FilePath = await s3FileStorage.uploadFile(file);

        productPayload.image = localFilePath;
        productPayload.image_s3 = s3FilePath;
      }

      const updatedProduct = await this.updateProductUseCase.execute(productId, productPayload);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("producto creada :)");
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const productId = req.params.id;

      // Obtener la publicación existente
      const existingProduct = await this.getProductByID.run(productId);
      if (!existingProduct) {
        return res.status(404).send('product not found');
      }

      // Eliminar imagen de S3
      await s3FileStorage.deleteFile(existingProduct.image_s3);

      // Eliminar imagen del almacenamiento local
      await localFileStorage.deleteFile(existingProduct.image);

      const result = await this.deleteProductUseCase.execute(productId);
      res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("producto creado :)");
      }
    }
  }

}

export default ProductController;
