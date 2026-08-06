import { Router } from "express";
import { getProducts, getProduct } from "../../controllers/product/index.js";

const productRouter = Router();

// get all products route
productRouter.get("/", getProducts);

// get single product route
productRouter.get("/:product_Id", getProduct);

export default productRouter;
