import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import { UsersController } from '../controllers/users.controller';
import { isAuthenticatedMiddleware } from '../../../shared/middlewares/isAuthenticated.middleware';
import { UserAvatarController } from '../controllers/userAvatar.controller';

export const userRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

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

userRouter.patch(
  '/avatar',
  isAuthenticatedMiddleware,
  upload.single('avatar'),
  userAvatarController.updateAvatar,
);
