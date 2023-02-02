import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/products.repositories';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IRequest) {
    const productRepository = getCustomRepository(
      ProductRepository,
    );

    const productExists =
      await productRepository.findByName(name);

    if (productExists) {
      throw new AppError(
        'There is already one product with this name',
      );
    }
    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);
    return product;
  }
}
