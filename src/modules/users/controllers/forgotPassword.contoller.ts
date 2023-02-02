import { Request, Response } from 'express';
import { sendForgotPasswordEmailService } from '../services/sendForgotPasswordEmail.service';

export class ForgotPasswordController {
  public async createSendForgotPasswordEmailService(
    req: Request,
    res: Response,
  ) {
    const { email } = req.body;

    const sendForgotPasswordEmail =
      new sendForgotPasswordEmailService();

    const tokenToRedefinePassword =
      await sendForgotPasswordEmail.execute({ email });

    return res
      .json({
        message: 'Link to redefine password sended to email address',
        token_generated: tokenToRedefinePassword,
      })
      .status(200);
  }
}
