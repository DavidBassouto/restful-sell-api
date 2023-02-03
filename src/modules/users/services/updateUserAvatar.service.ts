import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../config/upload';
import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { User } from '../typeorm/entities/user.entities';
interface IRequest {
  avatarFileName: string;
  user_id: string;
}
export class UpdateUserAvatarService {
  public async execute({ avatarFileName, user_id }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: user_id });

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatar,
      );
      const userAvatarExists = await fs.promises.stat(
        userAvatarFilePath,
      );
      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await userRepository.save(user);

    return user;
  }
}
