import { Router } from "express";
import {
  getProduct,
  createProductController,
  getAllProductsController,
} from "../../controllers/product/index.js";

const productRouter = Router();

// get all products
productRouter.get("/", getAllProductsController);

// get single product
productRouter.get("/:product_Id", getProduct);

// create product
productRouter.post("/", createProductController);

export default productRouter;
