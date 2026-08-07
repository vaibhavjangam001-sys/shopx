import { Router } from "express";
import { getProducts, getProduct, createProductController } from "../../controllers/product/index.js";

const productRouter = Router();

// get all products
productRouter.get("/", getProducts);

// get single product 
productRouter.get("/:product_Id", getProduct);

// create product 
productRouter.post("/",createProductController);

export default productRouter;
