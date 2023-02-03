import { hash } from 'bcryptjs';
import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { User } from '../typeorm/entities/user.entities';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
export class CreateUsersService {
  public async execute({ name, email, password }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const emailExists = await userRepository.findOneBy({ email });

    if (emailExists) {
      throw new AppError('This email have been in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }
}
