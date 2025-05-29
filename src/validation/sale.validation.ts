import { z, number, string, object, array } from "zod";

export const saleItemSchema = object({
  product: string({ required_error: "Product ID is required" }),
  name: string().min(1, "Product name is required"),
  quantity: number().positive("Quantity must be greater than 0"),
  unitPrice: number().positive("Unit price must be greater than 0"),
  totalPrice: number().positive("Total price must be greater than 0"),
});

export const createSaleSchema = object({
  body: object({
    items: array(saleItemSchema)
      .min(1, "At least one sale item is required")
      .nonempty("Sale items cannot be empty"),
    totalAmount: number().positive("Total amount must be greater than 0"),
    paymentMethod: z.enum(["cash", "card", "transfer"], {
      required_error: "Payment method is required",
    }),
    paidAmount: number().nonnegative("Paid amount must be >= 0"),
    changeGiven: number().nonnegative("Change must be >= 0"),
    storeId: string({ required_error: "Store ID is required" }).optional(),
    cashierId: string({ required_error: "Cashier ID is required" }).optional(),
  }),
  params: object({
    id: string({ required_error: "Store ID is required" }),
  }),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>["body"];
export type SaleParamInput = z.infer<typeof createSaleSchema>["params"];
