import { Request, Response } from 'express';
import { ResetPasswordService } from '../services/resetPassword.service';

export class ResetPasswordController {
  public async createResetPassowrd(req: Request, res: Response) {
    const { token, password } = req.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ token, password });

    return res
      .json({
        message: 'The password has been chenaged',
      })
      .status(200);
  }
}
