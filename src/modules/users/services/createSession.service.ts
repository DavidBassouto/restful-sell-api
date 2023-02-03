import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import '../../../config/authConfig';
import authConfig from '../../../config/authConfig';
import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/http/data-source';
import { User } from '../typeorm/entities/user.entities';

interface IRequest {
  email: string;
  password: string;
}
export class CreateSessionService {
  public async execute({ email, password }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email });

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
