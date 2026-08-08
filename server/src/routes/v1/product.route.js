import { Router } from "express";
import {
  getAllProductController,
  createProductController,
  getAllProductsController,
} from "../../controllers/product/index.js";
import getProductController from "../../controllers/product/getProduct.controller.js";

const productRouter = Router();

// get all products
productRouter.get("/", getAllProductsController);

// get single product
productRouter.get("/:productId", getProductController);

// create product
productRouter.post("/", createProductController);

export default productRouter;
