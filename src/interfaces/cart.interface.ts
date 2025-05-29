import { Types, Document } from "mongoose";

export interface CartItemInput {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CartInput {
  items: CartItemInput[];
  userId?: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  status?: "active" | "checked_out";
}

export interface CartItemDocument extends CartItemInput, Document {}

export interface CartDocument extends Document {
  items: CartItemDocument[];
  userId?: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  status: "active" | "checked_out";
  createdAt: Date;
  updatedAt: Date;
}
