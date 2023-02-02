import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/user.repository';
import '../../../config/authConfig';
import authConfig from '../../../config/authConfig';

interface IRequest {
  email: string;
  password: string;
}
export class CreateSessionService {
  public async execute({ email, password }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect credencials', 401);
    }

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw new AppError('Incorrect credencials', 401);
    }
    const token = sign(
      {
        id: user.id,
        email: user.email,
      },
      authConfig.jwt.secret as string,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn as string,
      },
    );

    return { id: user.id, token };
  }
}
