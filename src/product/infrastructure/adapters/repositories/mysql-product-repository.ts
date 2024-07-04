// infrastructure/mysql-publication-repository.ts
import { query } from '../../databases/mysql';
import { Product } from "../../../domain/product";
import { ProductRepository } from "../../../domain/ports/product-repository";

export class MySQLProductRepository implements ProductRepository {
  
  async getAll(): Promise<Product[]> {
    const sql = 'SELECT * FROM publications';
    const rows = await query(sql, []) as any[]; // Ajuste de tipo aquí
    
    return rows.map((row: any) => new Product(
      row.id,
      row.title,
      row.especific,
      row.price,
      row.image,
      row.image_s3
    ));
  }

  async getById(id: string): Promise<Product | null> {
    const sql = 'SELECT * FROM product WHERE id = ?';
    const params = [id];
    const [rows]: any[] = await query(sql, params);
    
    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return new Product(
      row.id,
      row.title,
      row.especific,
      row.price,
      row.image,
      row.image_s3
    );
  }

  async create(product: Product): Promise<Product> {
    const sql = 'INSERT INTO product (title, especific, price, image, image_s3) VALUES (?, ?, ?, ?, ?)';
    const params = [product.title, product.especific, product.price, product.image, product.image_s3];
    const result: any = await query(sql, params);

    return new Product(result.insertId, product.title, product.especific, product.price, product.image, product.image_s3);
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const sql = `UPDATE publications SET 
                 title = COALESCE(?, title), 
                 especific = COALESCE(?, especific), 
                 price = COALESCE(?, price), 
                 image = COALESCE(?, image), 
                 image_s3 = COALESCE(?, image_s3) 
                 WHERE id = ?`;
    const params = [
      product.title,
      product.especific,
      product.price,
      product.image,
      product.image_s3,
      id
    ];
    const result: any = await query(sql, params);

    if (result.affectedRows === 0) {
      return null;
    }

    return await this.getById(id); // Obtener la producto actualizado para devolverlo
  }

  async delete(id: string): Promise<boolean> {
    const sql = "DELETE FROM product WHERE id = ?";
    const params = [id];
    const result: any = await query(sql, params);

    return result.affectedRows > 0;
  }
}
