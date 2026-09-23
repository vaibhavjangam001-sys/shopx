import { Router } from 'express';
import {
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  getOrdersController,
  updateOrderController,
} from '../../controllers/order/index.js';
import { createOrderValidator } from '../../validators/order/index.js';
import {
  authenticationMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';

const orderRouter = Router();

// get order by id :-
orderRouter.get('/:orderId', getOrderByIdController);

// get orders :-
orderRouter.get('/', getOrdersController);

// create new order :-
orderRouter.post(
  '/',
  authenticationMiddleware,
  createOrderValidator,
  validationMiddleware,
  createOrderController
);

// update order :-
orderRouter.patch('/:orderId', updateOrderController);

// delete order :-
orderRouter.delete('/:orderId', deleteOrderController);

export default orderRouter;
