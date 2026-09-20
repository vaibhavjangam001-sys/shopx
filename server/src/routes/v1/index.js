import { Router } from 'express';

import authRouter from './auth.routes.js';
import productRouter from './product.routes.js';
import categoryRouter from './category.routes.js';
import userRouter from './user.routes.js';
import productVariantRouter from './productVariant.routes.js';
import cartRouter from './cart.routes.js';
import wishlistRouter from './wishlist.routes.js';
import addressRouter from './address.routes.js';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/products', productRouter);
v1Router.use('/categories', categoryRouter);
v1Router.use('/users', userRouter);
v1Router.use('/product-variants', productVariantRouter);
v1Router.use('/cart', cartRouter);
v1Router.use('/wishlist', wishlistRouter);
v1Router.use('/address', addressRouter);

export default v1Router;
