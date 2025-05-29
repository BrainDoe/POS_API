import mongoose, { Document } from "mongoose";

export interface ISaleItem {
  product: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ISale extends Document {
  items: ISaleItem[];
  totalAmount: number;
  paymentMethod: "cash" | "card" | "transfer";
  paidAmount: number;
  changeGiven: number;
  storeId?: mongoose.Types.ObjectId;
  cashierId?: mongoose.Types.ObjectId;
  createdAt: Date;
}
