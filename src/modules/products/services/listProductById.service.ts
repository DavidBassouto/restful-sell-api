import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { Product } from '../typeorm/entities/products.entitites';
import { ProductRepository } from '../typeorm/repositories/products.repositories';

interface IRequest {
  id: string;
}

export class ListProductsByIdService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}
