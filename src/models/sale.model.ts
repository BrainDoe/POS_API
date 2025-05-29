import mongoose, { Schema, Document } from "mongoose";
import { ISale, ISaleItem } from "../interfaces/sale.interface";

const SaleItemSchema = new Schema<ISaleItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { _id: false }
);

const SaleSchema = new Schema<ISale>(
  {
    items: { type: [SaleItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "transfer"],
      required: true,
    },
    paidAmount: { type: Number, required: true },
    changeGiven: { type: Number, required: true, default: 0 },
    storeId: { type: Schema.Types.ObjectId, ref: "Store" }, // To be activated later when multi-store support is implemented
    cashierId: {
      type: Schema.Types.ObjectId,
      ref: "User" /*required: true */, // To be activated later when autthentication is implemented
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<ISale>("Sale", SaleSchema);
