import { Router } from "express";
import {
  createSaleHandler,
  deleteSaleHandler,
  getSalesHandler,
  getSaleByIdHandler,
} from "../controller/sale.controller";

const saleRouter = Router();

saleRouter.get("/", getSalesHandler);
saleRouter.post("/create", createSaleHandler);
saleRouter.delete("/:id", deleteSaleHandler);
saleRouter.get("/:id", getSaleByIdHandler);

export default saleRouter;
