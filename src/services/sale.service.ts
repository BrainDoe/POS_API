import SaleModel from "../models/sale.model";
import ProductModel from "../models/product.model";
import AppError from "../utils/AppError.util";
import mongoose from "mongoose";
import { CreateSaleInput } from "../validation/sale.validation";
import { ParamsResponse } from "../utils/pagination.util";

// Create a new sale (invoice)
export async function createSale(saleData: CreateSaleInput) {
  try {
    // Optional: Validate sales data against db
    const validatedData = await validateSalesData(saleData);

    const sale = await SaleModel.create(validatedData);

    // @ts-ignore
    const { __v, ...rest } = sale._doc;
    return rest;
  } catch (error: any) {
    throw error;
  }
}

export async function getSales(
  paginationParams: ParamsResponse,
  page?: number
) {
  try {
    const searchQuery = paginationParams.search
      ? { "items.name": { $regex: paginationParams.search, $options: "i" } }
      : {};

    const [sales, total] = await Promise.all([
      SaleModel.find(searchQuery)
        .sort({
          createdAt: paginationParams.orderBy.createdAt === "asc" ? 1 : -1,
        })
        .skip(paginationParams.skip)
        .limit(paginationParams.take)
        .select("-__v")
        .populate("items.product", "_id name price description image barcode"),
      SaleModel.countDocuments(searchQuery),
    ]);

    return {
      currentPage: Number(page) || 1,
      totalItems: total,
      totalPages: Math.ceil(total / paginationParams.take),
      items: sales,
    };
  } catch (error: any) {
    throw error;
  }
}

export async function getSaleById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid sale ID", 400);
    }

    const sale = await SaleModel.findById(id)
      .select("-__v")
      .populate("items.product", "_id name price description image barcode");

    if (!sale) throw new AppError("Sale not found", 404);

    return sale;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteSale(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid sale ID", 400);
    }

    const deleted = await SaleModel.findByIdAndDelete(id).select("-__v");
    if (!deleted) throw new AppError("Sale not found", 404);

    return deleted;
  } catch (error: any) {
    throw error;
  }
}

const validateSalesData = async (saleData: CreateSaleInput) => {
  const validatedItems = [];

  for (const item of saleData.items) {
    const product = await ProductModel.findById(item.product);

    if (!product) {
      throw new AppError(`Product with ID ${item.product} not found.`, 404);
    }

    const unitPrice = product.price;
    const name = product.name;
    const totalPrice = unitPrice * item.quantity;

    validatedItems.push({
      product: product._id,
      name,
      quantity: item.quantity,
      unitPrice,
      totalPrice,
    });
  }

  const totalAmount = validatedItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const saleToSave = {
    items: validatedItems,
    totalAmount,
    paymentMethod: saleData.paymentMethod,
    paidAmount: saleData.paidAmount,
    changeGiven: saleData.paidAmount - totalAmount,
  };

  return saleToSave;
};
