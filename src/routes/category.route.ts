import { Router } from "express";
import {
  getCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controller/category.controller";

const categoryRouter = Router();

categoryRouter.get("/", getCategoriesHandler);
categoryRouter.post("/create", createCategoryHandler);

categoryRouter.put("/update/:id", updateCategoryHandler);
categoryRouter.get("/:id", getCategoryByIdHandler);
categoryRouter.delete("/delete/:id", deleteCategoryHandler);

export default categoryRouter;
