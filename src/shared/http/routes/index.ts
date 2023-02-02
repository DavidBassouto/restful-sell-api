import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/products.routes';
import { sessionsRouter } from '../../../modules/users/routes/session.routes';
import { userRouter } from '../../../modules/users/routes/users.routes';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/login', sessionsRouter);
