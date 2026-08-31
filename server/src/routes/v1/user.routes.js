import { Router } from 'express';
import {
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  getUserByPhoneController,
} from '../../controllers/user/index.js';
import {
  deleteUserValidator,
  getUserByIdValidator,
  getUserByPhoneValidator,
} from '../../validators/user/index.js';
import { validationMiddleware } from '../../middlewares/index.js';

const userRouter = Router();

// Get all users :-
userRouter.get('/', getAllUsersController);

// Get User by Id :-
userRouter.get(
  '/id/:userId',
  getUserByIdValidator,
  validationMiddleware,
  getUserByIdController
);

// Get user by Phone NO :-
userRouter.get(
  '/phone/:phoneNumber',
  getUserByPhoneValidator,
  validationMiddleware,
  getUserByPhoneController
);

// Delete User by id :-
userRouter.delete(
  '/:userId',
  deleteUserValidator,
  validationMiddleware,
  deleteUserController
);

export default userRouter;
