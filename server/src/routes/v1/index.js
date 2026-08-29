import { Router } from 'express';

import authRouter from './auth.route.js';
import productRouter from './product.route.js';
import categoryRouter from './category.routes.js';
import userRouter from './user.routes.js';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/products', productRouter);
v1Router.use('/categories', categoryRouter);
v1Router.use('/user', userRouter);

export default v1Router;
