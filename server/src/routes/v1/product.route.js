import { Router } from 'express';
import {
  getAllProductsController,
  createProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  findProductBySlugController,
} from '../../controllers/product/index.js';
import {
  createProductValidator,
  updateProductValidator,
} from '../../validators/product/index.js';
import { validationMiddleware } from '../../middlewares/index.js';

const productRouter = Router();

// find product by slug
productRouter.get('/slug/:slug', findProductBySlugController);

// get all products
productRouter.get('/', getAllProductsController);

// get single product
productRouter.get('/:productId', getProductByIdController);

// create product
productRouter.post(
  '/',
  createProductValidator,
  validationMiddleware,
  createProductController
);

// update product
productRouter.patch(
  '/:productId',
  updateProductValidator,
  validationMiddleware,
  updateProductController
);

// delete product
productRouter.delete('/:productId', deleteProductController);

export default productRouter;
