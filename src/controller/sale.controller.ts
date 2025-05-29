import {
  createSale,
  deleteSale,
  getSaleById,
  getSales,
} from "../services/sale.service";
import { NextFunction, Request, Response } from "express";
import {
  PaginatedResponse,
  ResponseType,
} from "../interfaces/paginationType.interface";
import {
  CreateSaleInput,
  createSaleSchema,
  saleItemSchema,
  SaleParamInput,
} from "../validation/sale.validation";
import {
  getPaginationParams,
  PaginationParams,
} from "../utils/pagination.util";
import { successResponse } from "../utils/successResponse.util";
import { ISale as Sale } from "../interfaces/sale.interface";

export const getSalesHandler = async (
  req: Request<{}, {}, {}, PaginationParams>,
  res: Response<ResponseType<PaginatedResponse<Sale[]>>>,
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

    const sales = await getSales(paginationParams, page);

    successResponse(res, sales);
  } catch (error: any) {
    next(error);
  }
};

export const getSaleByIdHandler = async (
  req: Request<SaleParamInput, {}, {}>,
  res: Response<ResponseType<Sale>>,
  next: NextFunction
) => {
  const {
    params: { id },
  } = createSaleSchema.pick({ params: true }).parse({ params: req.params });
  try {
    const sale = await getSaleById(id);

    successResponse(res, sale);
  } catch (error: any) {
    next(error);
  }
};

export const createSaleHandler = async (
  req: Request<{}, {}, CreateSaleInput>,
  res: Response<ResponseType<Sale>>,
  next: NextFunction
) => {
  try {
    const { body } = createSaleSchema
      .omit({ params: true })
      .parse({ body: req.body });
    const sale = await createSale(body);

    successResponse(res, sale);
  } catch (error: any) {
    next(error);
  }
};

export const deleteSaleHandler = async (
  req: Request<CreateSaleInput, {}, {}>,
  res: Response<ResponseType<Sale>>,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = createSaleSchema.pick({ params: true }).parse({ params: req.params });
    const sale = await deleteSale(id);

    successResponse(res, sale);
  } catch (error: any) {
    next(error);
  }
};
