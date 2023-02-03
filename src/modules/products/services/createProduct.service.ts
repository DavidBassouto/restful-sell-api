import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { Product } from '../typeorm/entities/products.entitites';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest) {
    const productRepository = AppDataSource.getRepository(Product);

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
    });

    await productRepository.save(product);
    return product;
  }
}
