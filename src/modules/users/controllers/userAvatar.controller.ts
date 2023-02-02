import { Request, Response } from 'express';

import { UpdateUserAvatarService } from '../services/updateUserAvatar.service';

export class UserAvatarController {
  public async updateAvatar(req: Request, res: Response) {
    const createUser = new UpdateUserAvatarService();
    const userAvatar = await createUser.execute({
      user_id: req.user.id,
      avatarFileName: req.file?.filename as string,
    });

    return res.status(201).json({
      message: 'Avatar updated with success',
      user: userAvatar,
    });
  }
}
