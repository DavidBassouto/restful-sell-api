import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/products.repositories';

interface IRequest {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
}
export class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest) {
    const productRepository = getCustomRepository(ProductRepository);
    const findProduct = await productRepository.findOne(id);
    if (!findProduct) {
      throw new AppError('Product not found');
    }

    const productExists = await productRepository.findByName(name);

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
