import { EntityRepository, Repository } from 'typeorm';
import { UserTokens } from '../entities/userTokens.entities';

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
  public async findByToken(token: string) {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  public async generateToken(user_id: string) {
    const userToken = this.create({
      user_id,
    });
    await this.save(userToken);

    return userToken;
  }
}
