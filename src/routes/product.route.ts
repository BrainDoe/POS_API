import { Router } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controller/product.controller";
import upload from "../middleware/multer.middleware";

const router = Router();

router.get("/", getProductsHandler);
router.post("/create", upload.array("images", 2), createProductHandler);
router.get("/:id", getProductByIdHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
