import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/products.repositories';

export class ListProductsService {
  public async execute() {
    const productRepository = getCustomRepository(
      ProductRepository,
    );

    const products = await productRepository.find();

    return products;
  }
}
