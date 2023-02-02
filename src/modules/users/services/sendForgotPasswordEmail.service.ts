import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/user.repository';
import { UserTokensRepository } from '../typeorm/repositories/userTokens.repository';

interface IRequest {
  email: string;
}
export class sendForgotPasswordEmailService {
  public async execute({ email }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(
      UserTokensRepository,
    );

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('This user dows not exists');
    }

    const token = await userTokenRepository.generateToken(user.id);

    console.log(token);
  }
}
