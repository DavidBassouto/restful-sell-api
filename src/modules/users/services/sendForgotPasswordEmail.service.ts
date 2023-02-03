import { getCustomRepository } from 'typeorm';
import { EtherealMail } from '../../../config/mail/etherealMail';
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
      throw new AppError('This user does not exists');
    }

    const tokenGenerated = await userTokenRepository.generateToken(
      user.id,
    );

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${tokenGenerated.token}`,
    });
    return tokenGenerated.token;
  }
}
