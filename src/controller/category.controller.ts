import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../services/category.service";
import { NextFunction, Request, Response } from "express";
import {
  PaginatedResponse,
  ResponseType,
} from "../interfaces/paginationType.interface";
import {
  CategoryType,
  UpdateCategoryType,
  createCategorySchema,
  updateCategorySchema,
  CategoryTypeParams,
  CategoryTypeBody,
} from "../validation/category.validation";
import {
  getPaginationParams,
  PaginationParams,
} from "../utils/pagination.util";
import { successResponse } from "../utils/successResponse.util";
import { ICategory as Category } from "../interfaces/product.interface";

export const getCategoriesHandler = async (
  req: Request<{}, {}, {}, PaginationParams>,
  res: Response<ResponseType<PaginatedResponse<Category[]>>>,
  next: NextFunction
) => {
  try {
    const { page, limit, sortBy, order } = req.query;
    const paginationParams = getPaginationParams({
      page,
      limit,
      sortBy,
      order,
    });

    const categories = await getCategories(paginationParams, page);

    successResponse(res, categories);
  } catch (error: any) {
    next(error);
  }
};

export const getCategoryByIdHandler = async (
  req: Request<CategoryTypeParams, {}, {}>,
  res: Response<ResponseType<Category>>,
  next: NextFunction
) => {
  const {
    params: { id },
  } = createCategorySchema.pick({ params: true }).parse({ params: req.params });
  try {
    const category = await getCategoryById(id);

    successResponse(res, category);
  } catch (error: any) {
    next(error);
  }
};

export const createCategoryHandler = async (
  req: Request<{}, {}, CategoryTypeBody>,
  res: Response<ResponseType<Category>>,
  next: NextFunction
) => {
  try {
    const { body } = createCategorySchema
      .omit({ params: true })
      .parse({ body: req.body });
    const category = await createCategory(body);

    successResponse(res, category);
  } catch (error: any) {
    next(error);
  }
};

export const updateCategoryHandler = async (
  req: Request<CategoryTypeParams, {}, UpdateCategoryType>,
  res: Response<ResponseType<Category>>,
  next: NextFunction
) => {
  try {
    const {
      body,
      params: { id },
    } = createCategorySchema.parse({ body: req.body, params: req.params });
    const category = await updateCategory(id, body);

    successResponse(res, category);
  } catch (error: any) {
    next(error);
  }
};

// export const deleteCategoryHandler = async (
//   req: Request<CategoryTypeParams["id"], {}, {}>,
//   res: Response<ResponseType<Category>>,
//   next: NextFunction
// ) => {
//   try {
//     const { params } = createCategorySchema
//       .pick({ params: true })
//       .parse({ params: req.params });
//     const category = await deleteCategory(params.id);

//     successResponse(res, category);
//   } catch (error: any) {
//     next(error);
//   }
// };

export const deleteCategoryHandler = async (
  req: Request<CategoryTypeParams, {}, {}>,
  res: Response<ResponseType<Category>>,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = createCategorySchema
      .pick({ params: true })
      .parse({ params: req.params });
    const category = await deleteCategory(id);

    successResponse(res, category);
  } catch (error: any) {
    next(error);
  }
};
