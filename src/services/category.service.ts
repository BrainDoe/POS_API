import AppError from "../utils/AppError.util";
import { ParamsResponse } from "../utils/pagination.util";
import { CategoryTypeBody } from "../validation/category.validation";
import CategoryModel from "../models/category.model";

export async function createCategory(data: CategoryTypeBody) {
  try {
    const category = await CategoryModel.create({
      name: data.name,
      description: data.description,
    });

    return category;
  } catch (error: any) {
    throw error;
  }
}

export async function getCategories(
  paginationParams: ParamsResponse,
  page?: number
) {
  try {
    const [categories, total] = await Promise.all([
      CategoryModel.find({
        skip: paginationParams.skip,
        take: paginationParams.take,
        orderBy: { name: paginationParams.orderBy.name },
      }),
      CategoryModel.countDocuments({
        name: { $regex: paginationParams.search || "", $options: "i" },
      }),
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
    const category = await CategoryModel.findByIdAndDelete(id);

    return category;
  } catch (error: any) {
    throw error;
  }
}

export async function updateCategory(id: string, data: CategoryTypeBody) {
  try {
    const category = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return category;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteCategory(id: string) {
  try {
    const category = await CategoryModel.findByIdAndDelete(id);

    return category;
  } catch (error: any) {
    throw error;
  }
}
