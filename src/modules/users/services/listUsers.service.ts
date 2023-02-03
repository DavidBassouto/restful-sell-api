import { AppDataSource } from '../../../shared/http/data-source';
import { User } from '../typeorm/entities/user.entities';

export class ListUsersService {
  public async execute() {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    return users;
  }
}
