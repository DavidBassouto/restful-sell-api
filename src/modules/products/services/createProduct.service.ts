import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { User } from '../../users/typeorm/entities/user.entities';
import { Product } from '../typeorm/entities/products.entitites';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  public async execute(
    user_id: string,
    { name, price, quantity }: IRequest,
  ) {
    const productRepository = AppDataSource.getRepository(Product);
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ id: user_id });
    if (!findUser) {
      throw new AppError('User Not Found');
    }

    const productExists = await productRepository.findOneBy({ name });

    if (productExists) {
      throw new AppError(
        'There is already one product with this name',
      );
    }
    const product = productRepository.create({
      name,
      price,
      quantity,
      user: findUser,
    });

    await productRepository.save(product);
    return product;
  }
}
