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
  authorizeMiddleware,
  authorizeOwnerAndAdminMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import { ROLES } from '../../constants/index.js';

const userRouter = Router();

// Get all users :-
userRouter.get(
  '/',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  userQueryValidator,
  validationMiddleware,
  getAllUsersController
);

// Get User by Id :-
userRouter.get(
  '/id/:userId',
  authenticationMiddleware,
  authorizeOwnerAndAdminMiddleware,
  getUserByIdValidator,
  validationMiddleware,
  getUserByIdController
);

// Get my profile :-
userRouter.get('/get-me', authenticationMiddleware, getMyProfileController);

// Get user by Phone NO :-
userRouter.get(
  '/phone/:phoneNumber',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  getUserByPhoneValidator,
  validationMiddleware,
  getUserByPhoneController
);

// Delete User by id :-
userRouter.delete(
  '/:userId',
  authenticationMiddleware,
  authorizeOwnerAndAdminMiddleware,
  deleteUserValidator,
  validationMiddleware,
  deleteUserController
);

export default userRouter;
