import { Router } from 'express';
import ProductsController from '../controllers/ProductController';

import { celebrate, Joi, Segments } from 'celebrate';
import { isAuthenticatedMiddleware } from '../../../shared/middlewares/isAuthenticated.middleware';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.listProductById,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  isAuthenticatedMiddleware,
  productsController.createProduct,
);
productsRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number().precision(2),
      quantity: Joi.number(),
    },
  }),
  isAuthenticatedMiddleware,
  productsController.updateProduct,
);
productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.deleteProduct,
);

export default productsRouter;
