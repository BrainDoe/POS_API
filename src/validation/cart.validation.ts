import { z, object, string, number, array } from "zod";

export const cartItemSchema = object({
  productId: string({ required_error: "Product ID is required" }),
  quantity: number({ required_error: "Quantity is required" }).min(
    1,
    "Quantity must be at least 1"
  ),
  price: number({ required_error: "Price is required" }).min(
    0,
    "Price must be zero or more"
  ),
  subtotal: number({ required_error: "Subtotal is required" }).min(
    0,
    "Subtotal must be zero or more"
  ),
});

// Create/Update Cart Schema
export const createCartSchema = object({
  body: object({
    items: array(cartItemSchema).min(1, "At least one item is required"),
    userId: string().optional(),
    customerId: string().optional(),
    total: number({ required_error: "Total is required" }).min(
      0,
      "Total must be zero or more"
    ),
  }),
});

export type CreateCartType = z.infer<typeof createCartSchema>["body"];

// Add Single Item to Existing Cart
export const addItemToCartSchema = object({
  body: cartItemSchema,
  params: object({
    cartId: string({ required_error: "Cart ID is required" }),
  }),
});

export type AddItemToCartType = z.infer<typeof addItemToCartSchema>;

// Update Quantity of a Cart Item
export const updateCartItemSchema = object({
  body: object({
    quantity: number({ required_error: "Quantity is required" }).min(1),
  }),
  params: object({
    cartId: string({ required_error: "Cart ID is required" }),
    productId: string({ required_error: "Product ID is required" }),
  }),
});

export type UpdateCartItemType = z.infer<typeof updateCartItemSchema>;

// Remove Cart Item
export const removeCartItemSchema = object({
  params: object({
    cartId: string({ required_error: "Cart ID is required" }),
    productId: string({ required_error: "Product ID is required" }),
  }),
});

export type RemoveCartItemType = z.infer<typeof removeCartItemSchema>;

// Checkout Cart
export const checkoutCartSchema = object({
  params: object({
    cartId: string({ required_error: "Cart ID is required" }),
  }),
});

export type CheckoutCartType = z.infer<typeof checkoutCartSchema>;
