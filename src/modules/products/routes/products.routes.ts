import { Router } from 'express';
import ProductsController from '../controllers/ProductController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.listProductById);
productsRouter.post('/', productsController.createProduct);
productsRouter.patch('/:id', productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

export default productsRouter;
