// infrastructure/publication-router.ts
import express from "express";
import { productController } from "../dependencies-product";
import { upload } from "../adapters/storages/local-file-storage";

const productRouter = express.Router();

productRouter.get("/getAll", productController.getAll.bind(productController));
productRouter.post("/create", upload.single('image'), productController.create.bind(productController));
productRouter.get("/:id", productController.getById.bind(productController));
productRouter.put('/:id', upload.single('image'), productController.update.bind(productController));
productRouter.delete('/:id', productController.delete.bind(productController));

export { productRouter };
