import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/products.repositories';

interface IRequest {
  id: string;
}

export class DeleteProductsService {
  public async execute({ id }: IRequest): Promise<boolean> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await productRepository.remove(product);

    return true;
  }
}
