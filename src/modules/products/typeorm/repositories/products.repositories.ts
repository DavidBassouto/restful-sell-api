import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/products.entitites';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string | undefined) {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}
