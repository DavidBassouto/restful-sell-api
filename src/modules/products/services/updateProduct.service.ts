import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { Product } from '../typeorm/entities/products.entitites';

interface IRequest {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
}
export class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest) {
    const productRepository = AppDataSource.getRepository(Product);

    const findProduct = await productRepository.findOneBy({ id });
    if (!findProduct) {
      throw new AppError('Product not found');
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
