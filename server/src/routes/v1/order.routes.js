import { Router } from 'express';
import {
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  getOrdersController,
  updateOrderController,
} from '../../controllers/order/index.js';
import {
  createOrderValidator,
  deleteOrderValidator,
  getOrderByIdValidator,
  updateOrderValidator,
  orderQueryValidator,
} from '../../validators/order/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';

const orderRouter = Router();

// get order by id :-
orderRouter.get(
  '/:orderId',
  authenticationMiddleware,
  getOrderByIdValidator,
  validationMiddleware,
  getOrderByIdController
);

// get orders :-
orderRouter.get(
  '/',
  authenticationMiddleware,
  orderQueryValidator,
  validationMiddleware,
  getOrdersController
);

// create new order :-
orderRouter.post(
  '/',
  authenticationMiddleware,
  createOrderValidator,
  validationMiddleware,
  createOrderController
);

// update order :-
orderRouter.patch(
  '/:orderId',
  authenticationMiddleware,
  updateOrderValidator,
  validationMiddleware,
  updateOrderController
);

// delete order :-
orderRouter.delete(
  '/:orderId',
  authenticationMiddleware,
  authorizeMiddleware('user', 'admin'),
  deleteOrderValidator,
  validationMiddleware,
  deleteOrderController
);

export default orderRouter;
