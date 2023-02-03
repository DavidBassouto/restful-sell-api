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
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] - Recuperação de senhas ',
      templateData: {
        template: `Olá {{name}}. Sua Solicitação de redefinição de senha foi recebida. Seu token de redefinição de senha é {{token}}`,
        variables: {
          name: user.name,
          token: tokenGenerated.token,
        },
      },
    });
    return tokenGenerated.token;
  }
}
