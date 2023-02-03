import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { Product } from '../typeorm/entities/products.entitites';

interface IRequest {
  id: string;
}

export class ListProductsByIdService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({
      id,
    });

    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}
