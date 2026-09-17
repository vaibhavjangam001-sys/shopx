import { Router } from 'express';
import {
  addCartItemController,
  getMyCartController,
  updateCartItemController,
  removeCartItemController,
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

export default cartRouter;
