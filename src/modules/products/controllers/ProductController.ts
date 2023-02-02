import { Request, Response } from 'express';
import { CreateProductService } from '../services/createProduct.service';
import { DeleteProductsService } from '../services/deleteProduct.service';
import { ListProductsByIdService } from '../services/listProductById.service';
import { ListProductsService } from '../services/listProducts.service';
import { UpdateProductService } from '../services/updateProduct.service';

export default class ProductsController {
  public async index(req: Request, res: Response) {
    const listProducts = new ListProductsService();
    const products = await listProducts.execute();

    return res.json({
      message: 'Products listed with success',
      products: products,
    });
  }

  public async listProductById(req: Request, res: Response) {
    const { id } = req.params;

    const productById = new ListProductsByIdService();

    const product = await productById.execute({ id });

    return res.json({
      message: 'Product listed with success',
      products: product,
    });
  }

  public async createProduct(req: Request, res: Response) {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });
    return res.status(201).json({
      message: 'Product created with success',
      products: product,
    });
  }

  public async updateProduct(req: Request, res: Response) {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });
    return res.status(201).json({
      message: 'Product updated with success',
      products: product,
    });
  }
  public async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    const productById = new DeleteProductsService();

    await productById.execute({ id });

    return res.json({
      message: 'Product deleted with success',
    });
  }
}
