import { Router } from 'express';
import {
  loginUserController,
  registerUserController,
} from '../../controllers/auth/index.js';
import {
  loginUserAuthValidator,
  registerUserAuthValidator,
} from '../../validators/auth/index.js';
import { validationMiddleware } from '../../middlewares/index.js';

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

export default authRouter;
