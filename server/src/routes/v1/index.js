import { Router } from 'express';

import authRouter from './auth.routes.js';
import productRouter from './product.routes.js';
import categoryRouter from './category.routes.js';
import userRouter from './user.routes.js';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/products', productRouter);
v1Router.use('/categories', categoryRouter);
v1Router.use('/users', userRouter);

export default v1Router;
