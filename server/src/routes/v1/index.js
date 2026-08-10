import { Router } from 'express';

import authRouter from './auth.route.js';
import productRouter from './product.route.js';
import categoryRouter from './category.routes.js';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/products', productRouter);
v1Router.use('/categories', categoryRouter);

export default v1Router;
