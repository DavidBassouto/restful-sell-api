import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/http/data-source';
import { User } from '../../users/typeorm/entities/user.entities';
import { Product } from '../typeorm/entities/products.entitites';

interface IRequest {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
}
export class UpdateProductService {
  public async execute(
    user_id: string,
    { id, name, price, quantity }: IRequest,
  ) {
    const productRepository = AppDataSource.getRepository(Product);
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ id: user_id });
    if (!findUser) {
      throw new AppError('User not found');
    }

    const findProduct = await productRepository.findOneBy({ id });
    if (!findProduct) {
      throw new AppError('Product not found');
    }

    if (findUser.id != findProduct.user.id) {
      throw new AppError('You dont have permission', 401);
    }

    const productExists = await productRepository.findOneBy({ name });

    if (productExists) {
      throw new AppError(
        'There is already one product with this name',
      );
    }

    findProduct.name = name
      ? (findProduct.name = name)
      : findProduct.name;
    findProduct.price = price
      ? (findProduct.price = price)
      : findProduct.price;
    findProduct.quantity = quantity
      ? (findProduct.quantity = quantity)
      : findProduct.quantity;

    await productRepository.save(findProduct);

    return findProduct;
  }
}
