import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ForgotPasswordController } from '../controllers/sendForgotPassword.contoller';
import { ResetPasswordController } from '../controllers/resetPassword.ontroller';

export const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.createSendForgotPasswordEmailService,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
    },
  }),
  resetPasswordController.createResetPassowrd,
);
