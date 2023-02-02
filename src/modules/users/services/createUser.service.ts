import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/user.repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
export class CreateUsersService {
  public async execute({ name, email, password }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const emailExists = await userRepository.findByName(email);

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
