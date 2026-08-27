import { Router } from 'express';
import { registerUserController } from '../../controllers/auth/index.js';

const authRouter = Router();

// Register User :-

authRouter.post('/register', registerUserController);

export default authRouter;
