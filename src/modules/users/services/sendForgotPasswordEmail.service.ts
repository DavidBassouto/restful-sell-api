import path from 'path';
import { EtherealMail } from '../../../config/mail/etherealMail';
import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { User } from '../typeorm/entities/user.entities';
import { UserTokens } from '../typeorm/entities/userTokens.entities';

interface IRequest {
  email: string;
}
export class sendForgotPasswordEmailService {
  public async execute({ email }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);
    const userTokenRepository =
      AppDataSource.getRepository(UserTokens);

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new AppError('This user does not exists');
    }

    const tokenGenerated = userTokenRepository.create({
      user_id: user.id,
    });
    await userTokenRepository.save(tokenGenerated);

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
