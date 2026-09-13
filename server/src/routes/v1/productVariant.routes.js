import { Router } from 'express';
import { createProductVariantValidator } from '../../validators/productVariant/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
} from '../../middlewares/index.js';
import { createProductVariantController } from '../../controllers/productVariant/index.js';
import { ROLES } from '../../constants/index.js';

const productVariantRouter = Router();

// create product variant :-
productVariantRouter.post(
  '/:productId/variants',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  createProductVariantValidator,
  createProductVariantController
);

export default productVariantRouter;
