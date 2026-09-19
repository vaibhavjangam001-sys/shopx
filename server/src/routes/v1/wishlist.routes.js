import { Router } from 'express';
import {
  authenticationMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import {
  addProductToWishlistController,
  clearWishlistController,
  getWishlistByUserIdController,
  removeProductFromWishlistController,
} from '../../controllers/wishlist/index.js';
import { wishlistValidator } from '../../validators/wishlist/index.js';

const wishlistRouter = Router();

// get wishlist :-
wishlistRouter.get(
  '/',
  authenticationMiddleware,
  getWishlistByUserIdController
);

// add product to wishlist :-
wishlistRouter.post(
  '/:productId',
  authenticationMiddleware,
  wishlistValidator,
  validationMiddleware,
  addProductToWishlistController
);

// remove product from wishlist
wishlistRouter.delete(
  '/:productId',
  authenticationMiddleware,
  wishlistValidator,
  validationMiddleware,
  removeProductFromWishlistController
);

// clear all wishlist :-
wishlistRouter.delete('/', authenticationMiddleware, clearWishlistController);

export default wishlistRouter;
