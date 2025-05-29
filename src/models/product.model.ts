import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    discountedPrice: { type: Number, default: 0 },
    minQuantity: { type: Number, default: 5 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: true },
    images: [{ type: String }],
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    barcode: {
      type: String,
      unique: true,
      default: new Date().getTime().toString(),
    },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
