import { Request, Response } from 'express';
import { CreateSessionService } from '../services/createSession.service';

export class SessionsController {
  public async createSession(req: Request, res: Response) {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();
    const session = await createSession.execute({ email, password });

    return res.status(201).json({
      message: 'User logged with success',
      user: session,
    });
  }
}
