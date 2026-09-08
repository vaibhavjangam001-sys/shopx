import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
} from '../../controllers/auth/index.js';
import {
  loginUserAuthValidator,
  logoutUserAuthValidator,
  refreshTokenAuthValidator,
  registerUserAuthValidator,
} from '../../validators/auth/index.js';
import {
  authenticationMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';

const authRouter = Router();

// Register User :-
authRouter.post(
  '/register',
  registerUserAuthValidator,
  validationMiddleware,
  registerUserController
);

// Login User :-
authRouter.post(
  '/login',
  loginUserAuthValidator,
  validationMiddleware,
  loginUserController
);

// Logout user :-
authRouter.post(
  '/logout',
  logoutUserAuthValidator,
  validationMiddleware,
  logoutUserController
);

// Refresh token
authRouter.post(
  '/refresh',
  refreshTokenAuthValidator,
  validationMiddleware,
  refreshTokenController
);

export default authRouter;
