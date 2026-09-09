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
  productQueryValidator,
  deleteProductValidator,
  findProductByIdValidator,
  findProductBySlugValidator,
} from '../../validators/product/index.js';
import {
  validationMiddleware,
  upload,
  authenticationMiddleware,
  authorizeMiddleware,
} from '../../middlewares/index.js';
import { ROLES } from '../../constants/index.js';

const productRouter = Router();

// find product by slug
productRouter.get(
  '/slug/:slug',
  findProductBySlugValidator,
  validationMiddleware,
  findProductBySlugController
);

// get all products
productRouter.get(
  '/',
  productQueryValidator,
  validationMiddleware,
  getAllProductsController
);

// get single product
productRouter.get(
  '/:productId',
  findProductByIdValidator,
  validationMiddleware,
  getProductByIdController
);

// create product
productRouter.post(
  '/',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  upload.array('images', 5),
  createProductValidator,
  validationMiddleware,
  createProductController
);

// update product
productRouter.patch(
  '/:productId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  upload.array('images', 5),
  updateProductValidator,
  validationMiddleware,
  updateProductController
);

// delete product
productRouter.delete(
  '/:productId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  deleteProductValidator,
  validationMiddleware,
  deleteProductController
);

export default productRouter;
