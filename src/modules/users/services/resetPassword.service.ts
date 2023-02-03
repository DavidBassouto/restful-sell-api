import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { User } from '../typeorm/entities/user.entities';
import { UserTokens } from '../typeorm/entities/userTokens.entities';

interface IRequest {
  token: string;
  password: string;
}
export class ResetPasswordService {
  public async execute({ token, password }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);
    const userTokenRepository =
      AppDataSource.getRepository(UserTokens);

    const userToken = await userTokenRepository.findOneBy({ token });
    if (!userToken) {
      throw new AppError('This user token does not exists');
    }

    const user = await userRepository.findOneBy({
      id: userToken.user_id,
    });
    if (!user) {
      throw new AppError('This user does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);
    await userRepository.save(user);
    return true;
  }
}
