import AppError from "../utils/AppError.util";
import { ParamsResponse } from "../utils/pagination.util";
import { CategoryTypeBody } from "../validation/category.validation";
import CategoryModel from "../models/category.model";
import mongoose from "mongoose";

export async function createCategory({ name, description }: CategoryTypeBody) {
  try {
    const category = await CategoryModel.create({
      name,
      description,
    });

    // @ts-ignore
    const { __v, ...rest } = category._doc;
    return rest;
  } catch (error: any) {
    throw error;
  }
}

export async function getCategories(
  paginationParams: ParamsResponse,
  page?: number
) {
  try {
    const searchQuery = paginationParams.search
      ? { name: { $regex: paginationParams.search, $options: "i" } }
      : {};

    const [categories, total] = await Promise.all([
      CategoryModel.find(searchQuery)
        .skip(paginationParams.skip)
        .limit(paginationParams.take)
        .sort({ name: paginationParams.orderBy.name === "asc" ? 1 : -1 })
        .select("-__v"),
      CategoryModel.countDocuments(searchQuery),
    ]);

    return {
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(total / paginationParams.take),
      totalItems: total,
      items: categories,
    };
  } catch (error: any) {
    throw error;
  }
}

export async function getCategoryById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    const category = await CategoryModel.findById(id)
      .select("-__v")
      .populate("category", "_id name description");

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  } catch (error: any) {
    throw error;
  }
}

export async function updateCategory(id: string, data: CategoryTypeBody) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    const category = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-__v");

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteCategory(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    const category = await CategoryModel.findByIdAndDelete(id).select("-__v");

    return category;
  } catch (error: any) {
    throw error;
  }
}
