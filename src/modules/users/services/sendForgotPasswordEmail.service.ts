import { getCustomRepository } from 'typeorm';
import { EtherealMail } from '../../../config/mail/etherealMail';
import { AppError } from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/user.repository';
import { UserTokensRepository } from '../typeorm/repositories/userTokens.repository';
import path from 'path';

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgotPassword.hbs',
    );

    const linkToPreviewEmail = await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] - Recuperação de senhas ',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${tokenGenerated.token}`,
        },
      },
    });
    return linkToPreviewEmail;
  }
}
