import AppError from "../utils/AppError.util";
import { ParamsResponse } from "../utils/pagination.util";
import mongoose from "mongoose";
import CartModel from "../models/cart.model";
import { CreateCartType } from "../validation/cart.validation";

export async function createCart(payload: CreateCartType) {
  try {
    const cart = await CartModel.create(payload);
    const { __v, ...rest } = cart.toObject();
    return rest;
  } catch (error: any) {
    throw error;
  }
}

export async function getCarts(
  paginationParams: ParamsResponse,
  page?: number
) {
  try {
    const search = paginationParams.search?.trim();

    const searchQuery = search
      ? { "items.productId": { $regex: search, $options: "i" } }
      : {};

    const [carts, total] = await Promise.all([
      CartModel.find(searchQuery)
        .skip(paginationParams.skip)
        .limit(paginationParams.take)
        .sort({
          createdAt: paginationParams.orderBy.createdAt === "asc" ? 1 : -1,
        })
        .populate({
          path: "items.productId",
          select: "name price category",
          populate: {
            path: "category",
            select: "name",
          },
        })
        .select("-__v"),
      CartModel.countDocuments(searchQuery),
    ]);

    return {
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(total / paginationParams.take),
      totalItems: total,
      items: carts,
    };
  } catch (error: any) {
    throw error;
  }
}

export async function getCartById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid cart ID", 400);
    }

    const cart = await CartModel.findById(id)
      .populate({
        path: "items.productId",
        select: "name price category",
      })
      .select("-__v");

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    return cart;
  } catch (error: any) {
    throw error;
  }
}

export async function getUserCart(user: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(user)) {
      throw new AppError("Invalid cart ID", 400);
    }

    const cart = await CartModel.findOne({
      where: { userId: user },
    })
      .populate({
        path: "items.productId",
        select: "name price category",
      })
      .select("-__v");

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    return cart;
  } catch (error: any) {
    throw error;
  }
}

export async function addItemToCart(user: string, cartId: string, item: any) {
  try {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      throw new AppError("Invalid cart ID", 400);
    }

    const cart = await CartModel.findOne({
      where: { _id: cartId, userId: user },
    });
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    const existingItemIndex = cart.items.findIndex(
      (i) => i.productId.toString() === item.productId
    );

    if (existingItemIndex >= 0) {
      // Update quantity and subtotal
      cart.items[existingItemIndex].quantity += item.quantity;
      cart.items[existingItemIndex].subtotal += item.subtotal;
    } else {
      cart.items.push(item);
    }

    // Recalculate total
    cart.total = cart.items.reduce((acc, cur) => acc + cur.subtotal, 0);

    await cart.save();
    return cart;
  } catch (error: any) {
    throw error;
  }
}

export async function updateCartItem(
  cartId: string,
  productId: string,
  quantity: number
) {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(cartId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      throw new AppError("Invalid cart or product ID", 400);
    }

    const cart = await CartModel.findById(cartId);
    if (!cart) throw new AppError("Cart not found", 404);

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) throw new AppError("Item not found in cart", 404);

    item.quantity = quantity;
    item.subtotal = item.price * quantity;
    cart.total = cart.items.reduce((acc, cur) => acc + cur.subtotal, 0);

    await cart.save();
    return cart;
  } catch (error: any) {
    throw error;
  }
}

// Remove item from cart
export async function removeCartItem(cartId: string, productId: string) {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(cartId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      throw new AppError("Invalid ID(s)", 400);
    }

    const cart = await CartModel.findById(cartId);
    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.total = cart.items.reduce((acc, cur) => acc + cur.subtotal, 0);

    await cart.save();
    return cart;
  } catch (error: any) {
    throw error;
  }
}

// Checkout
export async function checkoutCart(cartId: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      throw new AppError("Invalid cart ID", 400);
    }

    const cart = await CartModel.findById(cartId);
    if (!cart) throw new AppError("Cart not found", 404);

    if (cart.items.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    cart.status = "checked_out";
    await cart.save();

    return cart;
  } catch (error: any) {
    throw error;
  }
}
