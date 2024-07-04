// infrastructure/repository-factory.ts
import { ProductRepository } from "../../../domain/ports/product-repository";
import { MongoProductRepository } from "./mongo-product-repository";
import { MySQLProductRepository } from "./mysql-product-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE; // memoria

export class RepositoryFactory {
  static createProductRepository(): ProductRepository {
    if (db_type === 'mysql') {
      console.log("Estamos en mysql")
      return new MySQLProductRepository();
    } else if (db_type === 'mongo') {
      console.log("Estamos en mongo")
      return new MongoProductRepository();
    }
    throw new Error('Unsupported database type');
  }
}

