import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  barcode: string;
  category: Types.ObjectId;
  discountedPrice?: number;
  discountPercentage?: number;
  minQuantity?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  images?: string[];
}

export interface ICategory extends Document {
  name: string;
  description?: string;
}
