import { AppDataSource } from '../../../shared/http/data-source';
import { Product } from '../typeorm/entities/products.entitites';

export class ListProductsService {
  public async execute() {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    return products;
  }
}
