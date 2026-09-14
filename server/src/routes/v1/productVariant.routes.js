import { Router } from 'express';
import {
  createProductVariantValidator,
  deleteProductVariantValidator,
  getAllProductVariantsValidator,
  getProductVariantByIdValidator,
  updateProductVariantValidator,
} from '../../validators/productVariant/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import {
  createProductVariantController,
  deleteProdutVariantController,
  getAllProductVariantsController,
  getPorductVariantByIdController,
  updateProductVariantController,
} from '../../controllers/productVariant/index.js';
import { ROLES } from '../../constants/index.js';

const productVariantRouter = Router();

// get product variant by id :-
productVariantRouter.get(
  '/:productVariantId',
  getProductVariantByIdValidator,
  validationMiddleware,
  getPorductVariantByIdController
);

// get all product variants
productVariantRouter.get(
  '/:productId/variants',
  getAllProductVariantsValidator,
  validationMiddleware,
  getAllProductVariantsController
);

// create product variant :-
productVariantRouter.post(
  '/:productId/variants',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  createProductVariantValidator,
  validationMiddleware,
  createProductVariantController
);

// update prodcut variant :-
productVariantRouter.patch(
  '/:productVariantId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  updateProductVariantValidator,
  validationMiddleware,
  updateProductVariantController
);

// delete product variant :-
productVariantRouter.delete(
  '/:productVariantId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  deleteProductVariantValidator,
  validationMiddleware,
  deleteProdutVariantController
);

export default productVariantRouter;
