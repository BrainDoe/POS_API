import { Schema, model, Document } from "mongoose";
import { ICategory } from "../interfaces/product.interface";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default model<ICategory>("Category", CategorySchema);
