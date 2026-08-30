import { Router } from 'express';
import { registerUserController } from '../../controllers/auth/index.js';
import { registerUserAuthValidator } from '../../validators/auth/index.js';
import { validationMiddleware } from '../../middlewares/index.js';

const authRouter = Router();

// Register User :-

authRouter.post(
  '/register',
  registerUserAuthValidator,
  validationMiddleware,
  registerUserController
);

export default authRouter;
