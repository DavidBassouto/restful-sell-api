import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UsersController } from '../controllers/users.controller';
import { isAuthenticatedMiddleware } from '../../../shared/middlewares/isAuthenticated.middleware';

export const userRouter = Router();
const usersController = new UsersController();

userRouter.get('/', isAuthenticatedMiddleware, usersController.index);
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.createUser,
);
