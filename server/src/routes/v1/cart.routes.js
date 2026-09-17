import { Router } from 'express';
import {
  addCartItemController,
  getMyCartController,
  updateCartItemController,
  removeCartItemController,
  clearCartController,
  getCartSummaryController,
} from '../../controllers/cart/index.js';
import {
  authenticationMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import {
  addCartItemValidator,
  removeCartItemValidator,
  updateCartItemValidator,
} from '../../validators/cart/index.js';

const cartRouter = Router();

// get cart summary
cartRouter.get('/summary', authenticationMiddleware, getCartSummaryController);

// get my cart :-
cartRouter.get('/', authenticationMiddleware, getMyCartController);

// add item to cart :-
cartRouter.post(
  '/',
  authenticationMiddleware,
  addCartItemValidator,
  validationMiddleware,
  addCartItemController
);

// update cart item :-
cartRouter.patch(
  '/',
  authenticationMiddleware,
  updateCartItemValidator,
  validationMiddleware,
  updateCartItemController
);

// remove cart item :-
cartRouter.delete(
  '/',
  authenticationMiddleware,
  removeCartItemValidator,
  validationMiddleware,
  removeCartItemController
);

// clear cart item :-
cartRouter.delete('/clear', authenticationMiddleware, clearCartController);

export default cartRouter;
