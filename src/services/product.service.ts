import AppError from "../utils/AppError.util";
import { ParamsResponse } from "../utils/pagination.util";
import {
  ProductCreateTypeBody,
  ProductUpdateTypeBody,
} from "../validation/product.validation";
import ProductModel from "../models/product.model";
import mongoose from "mongoose";

export async function getProducts(
  paginationParams: ParamsResponse,
  page?: number
) {
  try {
    const searchQuery = paginationParams.search
      ? { name: { $regex: paginationParams.search, $options: "i" } }
      : {};

    const [products, total] = await Promise.all([
      ProductModel.find(searchQuery)
        .skip(paginationParams.skip)
        .limit(paginationParams.take)
        .sort({
          createdAt: paginationParams.orderBy.createdAt === "asc" ? 1 : -1,
        })
        .select(["-__v"])
        .populate("category", "_id name description"),

      ProductModel.countDocuments(searchQuery),
    ]);

    return {
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(total / paginationParams.take),
      totalItems: total,
      items: products,
    };
  } catch (error: any) {
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid product ID", 400);
    }

    const product = await ProductModel.findById(id)
      .select("-__v")
      .populate("category", "_id name description");

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  } catch (error: any) {
    throw error;
  }
}

export async function createProduct(data: ProductCreateTypeBody) {
  try {
    const product = await ProductModel.create(data);

    // @ts-ignore
    const { __v, ...rest } = product._doc;
    return rest;
  } catch (error: any) {
    throw error;
  }
}

export async function updateProduct(id: string, data: ProductUpdateTypeBody) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid product ID", 400);
    }

    const product = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-__v");

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid product ID", 400);
    }

    const product = await ProductModel.findByIdAndDelete(id).select("-__v");

    return product;
  } catch (error: any) {
    throw error;
  }
}
