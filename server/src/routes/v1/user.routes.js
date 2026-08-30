import { Router } from 'express';
import { deleteUserController } from '../../controllers/user/index.js';
import { deleteUserValidator } from '../../validators/user/index.js';
import { validationMiddleware } from '../../middlewares/index.js';

const userRouter = Router();

userRouter.delete(
  '/:userId',
  deleteUserValidator,
  validationMiddleware,
  deleteUserController
);

export default userRouter;
