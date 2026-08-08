import { Router } from "express";
import {
  getAllProductController,
  createProductController,
  getAllProductsController,
  updateProductController,
  deletedProductController,
} from "../../controllers/product/index.js";
import getProductController from "../../controllers/product/getProduct.controller.js";

const productRouter = Router();

// get all products
productRouter.get("/", getAllProductsController);

// get single product
productRouter.get("/:productId", getProductController);

// create product
productRouter.post("/", createProductController);

// update product
productRouter.patch("/:productId", updateProductController);

// delete product
productRouter.delete("/:productId", deletedProductController);

export default productRouter;
