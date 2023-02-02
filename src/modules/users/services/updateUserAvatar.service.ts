import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/user.repository';
import uploadConfig from '../../../config/upload';
interface IRequest {
  avatarFileName: string;
  user_id: string;
}
export class UpdateUserAvatarService {
  public async execute({ avatarFileName, user_id }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);

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
