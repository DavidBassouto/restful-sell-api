import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/user.repository';
import { UserTokensRepository } from '../typeorm/repositories/userTokens.repository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}
export class ResetPasswordService {
  public async execute({ token, password }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(
      UserTokensRepository,
    );

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('This user token does not exists');
    }

    const user = await userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('This user does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);
  }
}
