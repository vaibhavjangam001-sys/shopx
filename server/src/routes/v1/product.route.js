import { Router } from "express";
import {
  getAllProductsController,
  createProductController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../../controllers/product/index.js";
import { createProductValidator } from "../../validators/index.js";
import { validationMiddleware } from "../../middlewares/index.js";

const productRouter = Router();

// get all products
productRouter.get("/", getAllProductsController);

// get single product
productRouter.get("/:productId", getProductController);

// create product
productRouter.post(
  "/",
  createProductValidator,
  validationMiddleware,
  createProductController,
);

// update product
productRouter.patch("/:productId", updateProductController);

// delete product
productRouter.delete("/:productId", deleteProductController);

export default productRouter;
