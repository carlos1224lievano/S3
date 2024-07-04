import mongoose, { Schema, Document } from 'mongoose';
import { Product } from '../domain/product';

export interface ProductDocument extends Product, Document {
  id: number | null;
  title: string;
  especific: string;
  price: number;
  image: string;
  image_s3: string;
}

const UserSchema: Schema = new Schema({
  title: { type: String, required: true },
  especific: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  image_s3: { type: String, required: true },
});

export const ProductModel = mongoose.model<ProductDocument>('products', UserSchema);