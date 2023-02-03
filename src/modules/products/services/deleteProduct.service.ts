import { AppError } from '../../../shared/errors/AppError';
import { AppDataSource } from '../../../shared/typeorm/data-source';
import { Product } from '../typeorm/entities/products.entitites';

interface IRequest {
  id: string;
}

export class DeleteProductsService {
  public async execute({ id }: IRequest): Promise<boolean> {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found');
    }

    await productRepository.remove(product);

    return true;
  }
}
