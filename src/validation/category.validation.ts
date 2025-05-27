import { z, string, object } from "zod";

export const createCategorySchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).min(
      3,
      "Category name must be a minimum of 3 characters length"
    ),
    description: z
      .string()
      .min(3, "Category description must be a minimum of 3 characters length")
      .optional(),
  }),
  params: object({
    id: string({ required_error: "Id is required" }).uuid(
      "Id must be valid UUID type"
    ),
  }),
});

export type CategoryType = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).optional(),
    description: z
      .string()
      .min(3, "Category description must be a minimum of 3 characters length")
      .optional(),
  }),
  params: object({
    id: string({ required_error: "Id is required" }).uuid(
      "Id must be valid UUID type"
    ),
  }),
});

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
export type CategoryTypeParams = z.infer<typeof createCategorySchema>["params"];
export type CategoryTypeBody = z.infer<typeof createCategorySchema>["body"];
