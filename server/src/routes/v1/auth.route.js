import { Router } from 'express';
import { registerUser } from '../../controllers/auth/index.js';

const authRouter = Router();

authRouter.post('/register', registerUser);

export default authRouter;
