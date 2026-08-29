import { Router } from 'express';
import { deleteUserController } from '../../controllers/user/index.js';

const userRouter = Router();

userRouter.delete('/:userId', deleteUserController);

export default userRouter;
