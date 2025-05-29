import { z, string, object, number, boolean, array } from "zod";

export const createProductSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).min(
      3,
      "Product name must be a minimum of 3 characters length"
    ),
    description: string({
      required_error: "Product description is reqired",
    }).min(3, "Product description must be a minimum of 3 characters length"),
    price: number({ required_error: "Price is required" }).positive(
      "Price must be a positive a number"
    ),
    discountedPrice: number({ required_error: "Discounted price is required" })
      .positive("discounted price must be a positive a number")
      .optional(),
    discountPercentage: number({
      required_error: "Discounted Percentage is required",
    })
      .positive("Discount percentage must be a positive a number")
      .optional(),
    stock: number({ required_error: "Stock is required" }).positive(
      "Stock must be a positive a number"
    ),
    minQuantity: number({ required_error: "MinQuantity is required" }).positive(
      "MinQuantity must be a positive a number"
    ),
    isActive: boolean().optional(),
    isFeatured: boolean().optional(),
    images: array(string({ required_error: "Images is required" })).optional(),
    category: string({ required_error: "Category Id is required" }),
  }),
  params: object({
    id: string({ required_error: "Id is required" }),
  }),
});

export const updateProductSchema = object({
  body: object({
    name: string({ required_error: "Name is required" })
      .min(3, "Product name must be a minimum of 3 characters length")
      .optional(),
    description: string({ required_error: "Product description is reqired" })
      .min(3, "Product description must be a minimum of 3 characters length")
      .optional(),
    price: number({ required_error: "Price is required" })
      .positive("Price must be a positive a number")
      .optional(),
    discountedPrice: number({ required_error: "Discounted price is required" })
      .positive("discounted price must be a positive a number")
      .optional(),
    discountPercentage: number({
      required_error: "Discounted Percentage is required",
    })
      .positive("Discount percentage must be a positive a number")
      .optional(),
    stock: number({ required_error: "Stock is required" })
      .positive("Stock must be a positive a number")
      .optional(),
    minQuantity: number({ required_error: "MinQuantity is required" })
      .positive("MinQuantity must be a positive a number")
      .optional(),
    isActive: boolean().optional(),
    isFeatured: boolean().optional(),
    images: array(string({ required_error: "Images is required" })).optional(),
    category: string({
      required_error: "Category Id is required",
    }).optional(),
  }),
  params: object({
    id: string({ required_error: "Id is required" }),
  }),
});

export type ProductType = z.infer<typeof createProductSchema>;
export type ProductUpdateTypeBody = z.infer<typeof updateProductSchema>["body"];
export type ProductTypeParams = z.infer<typeof createProductSchema>["params"];
export type ProductCreateTypeBody = z.infer<typeof createProductSchema>["body"];
