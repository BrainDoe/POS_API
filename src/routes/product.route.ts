import { Router } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controller/product.controller";

const router = Router();

router.get("/", getProductsHandler);
router.post("/create", createProductHandler);
router.get("/:id", getProductByIdHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
