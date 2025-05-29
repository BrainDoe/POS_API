import mongoose, { Schema, model } from "mongoose";
import { CartDocument } from "../interfaces/cart.interface";

const cartItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const cartSchema = new Schema<CartDocument>(
  {
    items: [cartItemSchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "checked_out"],
      default: "active",
    },
  },
  { timestamps: true }
);

const CartModel = model<CartDocument>("Cart", cartSchema);
export default CartModel;
