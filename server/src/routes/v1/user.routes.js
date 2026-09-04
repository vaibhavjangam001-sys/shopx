import { Router } from 'express';
import {
  deleteUserController,
  getAllUsersController,
  getMyProfileController,
  getUserByIdController,
  getUserByPhoneController,
} from '../../controllers/user/index.js';
import {
  deleteUserValidator,
  getUserByIdValidator,
  getUserByPhoneValidator,
  userQueryValidator,
} from '../../validators/user/index.js';
import {
  authenticationMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';

const userRouter = Router();

// Get all users :-
userRouter.get(
  '/',
  userQueryValidator,
  validationMiddleware,
  getAllUsersController
);

// Get User by Id :-
userRouter.get(
  '/id/:userId',
  getUserByIdValidator,
  validationMiddleware,
  getUserByIdController
);

// Get my profile :-
userRouter.get('/get-me', authenticationMiddleware, getMyProfileController);

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
